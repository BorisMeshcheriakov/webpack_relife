import cn from 'classnames';

import st from './index.module.scss';

interface IProps {
	tabs: string[];
	selected: string;
	setTab: (tab: string) => void;
}

const Tabs = ({ tabs, selected, setTab }: IProps): JSX.Element => {
	const getTabName = (tab: string) => {
		let name = '';
		switch (tab) {
			case 'description':
				name = 'Описание';
				break;
			case 'specifications':
				name = 'Характеристики';
				break;
			default:
				break;
		}
		return name;
	};

	return (
		<div className={st.tabs}>
			{tabs.map((tab) => (
				<button key={tab} className={cn(st.tab, selected === tab && st.active)} onClick={() => setTab(tab)}>
					{getTabName(tab)}
				</button>
			))}
		</div>
	);
};

export default Tabs;
