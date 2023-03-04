import { FC, memo } from 'react';
import { Blank, Loader } from 'library/components/common';
import { useNotificationsList } from 'library/hooks/notifications';
import { NotificationCard } from 'library/components/notifications';
import { default as InfiniteScroll } from 'react-infinite-scroller';

import st from './List.module.scss';

const List: FC = () => {
	const { status, hasMore, list, getNotifications } = useNotificationsList();

	return (
		<div className={st.list}>
			<InfiniteScroll
				className={st.scroller}
				pageStart={0}
				hasMore={hasMore}
				loadMore={getNotifications}
				useWindow={false}
				loader={list.length === 0 ? <Loader key={0} /> : undefined}
			>
				{list.map((notification) => (
					<NotificationCard notification={notification} key={notification.id} />
				))}

				{status === 'idle' && !list.length && <Blank text={'Нет уведомлений'}></Blank>}
			</InfiniteScroll>
		</div>
	);
};

export default memo(List);
