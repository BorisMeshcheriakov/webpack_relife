import React from 'react';
import qs from 'query-string';
import { eventService } from 'library/api/eventService';
import { useHistory } from 'react-router-dom';
import { TicketDetail } from 'library/models/events';
import { debounce } from 'lodash';
import useWindowDimensions from '../common/useWindowDimensions';

const useVisitors = (id?: string) => {
	const { push } = useHistory();
	const [status, setStatus] = React.useState<string>('idle');
	const [totalVisitors, setTotalVisitors] = React.useState<number>(0);
	const [tickets, setTickets] = React.useState<TicketDetail[]>([]);
	const [used, setUsed] = React.useState<number>(0);
	const [search, setSearch] = React.useState<string>('');
	const [page, setPage] = React.useState<number>(1);

	const [showScanner, setShowScanner] = React.useState<boolean>(false);
	const [qr, setQr] = React.useState<string>('');

	const lastElement = React.useRef<HTMLDivElement>(null);
	const observer = React.useRef<IntersectionObserver>();

	const { width } = useWindowDimensions();
	const showCloseBtn = width <= 1024;

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const getTickets = React.useCallback(
		debounce(async (id: string, search: string, page: number, qr: string) => {
			setStatus('loading');
			try {
				const query = qs.stringify({ event: id, last_name: search, page: page, id: qr });
				const response = await eventService.getTickets(query);
				let tickets = response.data.results;
				let prev = response.data.previous;
				let next = response.data.next;
				if (prev) {
					setTickets((prevTickets) => [...prevTickets, ...tickets]);
				} else {
					setTickets(tickets);
				}

				if (next) {
					setPage((page) => (page += 1));
					setStatus('idle');
				} else {
					setStatus('loaded');
				}
			} catch (error) {
				setStatus('error');
			}
		}, 300),
		[]
	);

	const getInitial = React.useCallback(async (id: string) => {
		setStatus('loading');
		try {
			let query = qs.stringify({ event: id });
			try {
				const response = await eventService.getTickets(query);
				setTickets(response.data.results);
				setTotalVisitors(response.data.count);

				if (response.data.next) setPage(2);

				query = qs.stringify({ event: id, used: 1 });
				const used = await eventService.getTickets(query);
				setUsed(used.data.count);
			} catch (error) {}
		} catch (error) {
			// console.log(error);
		}
		setStatus('idle');
	}, []);

	const resetResults = debounce(() => {
		setStatus('idle');
		setTickets([]);
		setPage(1);
	}, 100);

	const onClose = () => {
		push(`/events/${id}`);
	};

	const handleSearch = (e: any) => {
		resetResults();
		setSearch(e.target.value);
	};

	const isLastVisible = React.useCallback(
		(entries: IntersectionObserverEntry[]) => {
			if (id && entries[0].isIntersecting && status !== 'loaded' && status !== 'loading') {
				getTickets(id, search, page, qr);
			}
		},
		[page, search, id, status, getTickets, qr]
	);

	React.useEffect(() => {
		if (id) {
			getInitial(id);
		}
	}, [id, getInitial]);

	React.useEffect(() => {
		if (observer.current) observer.current.disconnect();
		observer.current = new IntersectionObserver(isLastVisible);
		lastElement.current && observer.current.observe(lastElement.current);
	}, [isLastVisible]);

	const toggleScan = () => {
		setShowScanner(!showScanner);
	};

	const handleScan = async (data: any) => {
		resetResults();
		if (data !== null) {
			setQr(data.data);
			toggleScan();
		}
	};

	const toggleTicket = (e: React.ChangeEvent<HTMLInputElement>, checked: boolean, id: string) => {
		let allTickets = [...tickets];
		let idx = allTickets.findIndex((ticket) => ticket.id === id);
		allTickets[idx].used = checked;
		setTickets(allTickets);
		setUsed((used) => (checked ? (used += 1) : (used -= 1)));

		eventService.checkTicket(id, { used: checked }).catch(() => {
			allTickets[idx].used = !checked;
			setTickets(allTickets);
			setUsed((used) => (checked ? (used -= 1) : (used += 1)));
		});
	};

	const getTicketList = (id: string | number) => {
		let query = qs.stringify({ event: id });
		return eventService.getTickets(query);
	};

	return {
		totalVisitors,
		tickets,
		used,
		onClose,
		search,
		handleSearch,
		lastElement,
		toggleScan,
		showScanner,
		handleScan,
		toggleTicket,
		status,
		getTicketList,
		showCloseBtn,
	};
};

export default useVisitors;
