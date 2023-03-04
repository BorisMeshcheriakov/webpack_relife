import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import cn from 'classnames';

import { useClientList, useClientCard } from 'library/hooks/clients';

import { Card, ModalCreate } from 'library/components/clients';
import { ClientItem, Toolbar } from './frames';

import st from './List.module.scss';
import { Blank } from 'library/components/common';

const List: React.FC = () => {
	const { hasMore, getClients, clients, status } = useClientList();
	const { isActive, onCardClick } = useClientCard();

	const [isOpen, setIsOpen] = React.useState(false);
	const [isCreateOpen, setIsCreateOpen] = React.useState(false);

	const handleOpen = (open: boolean) => {
		setIsOpen(open);
	};

	const handleCreateOpen = (open: boolean) => {
		setIsCreateOpen(open);
	};

	React.useLayoutEffect(() => {
		function updateSize() {
			// console.log(window.innerWidth);
			if (window.innerWidth <= 1024) {
				setIsOpen(false);
			} else {
				setIsOpen(true);
			}
		}

		window.addEventListener('resize', updateSize);
		updateSize();
		return () => window.removeEventListener('resize', updateSize);
	}, []);

	return (
		<section className={cn(st.list, window.innerWidth <= 1024 && isOpen && st.list_open)}>
			<div className={st.wrapper}>
				<section className={st.toolbar}>
					<Toolbar isOpen={isOpen} handleOpen={handleOpen} handleCreateOpen={handleCreateOpen} />
				</section>
				<section className={st.toolbar}></section>

				<div className={st.scroll}>
					{status === 'idle' && clients.length === 0 && <Blank text="Список клиентов пуст" />}

					{
						<ul className={st.cards}>
							<InfiniteScroll
								className={st.scroller}
								hasMore={hasMore}
								loadMore={getClients}
								useWindow={false}
							>
								{clients.length > 0 &&
									clients.map((client) => (
										<li key={client.id} onClick={() => onCardClick(client)}>
											<Card className={st.cards__card}>
												<ClientItem
													client={client}
													isActive={isActive(client.id)}
													isOpen={isOpen}
												/>
											</Card>
										</li>
									))}
							</InfiniteScroll>
						</ul>
					}
				</div>
				{isCreateOpen && <ModalCreate onClose={() => handleCreateOpen(false)} />}
			</div>
		</section>
	);
};

export default List;
