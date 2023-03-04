import { FC, memo } from 'react';
import { Notification } from 'library/models/notifications';
import { format, parseISO } from 'date-fns';
import { useChangeNotification } from 'library/hooks/notifications';
import { getIcon, getTitle } from 'library/helpers/notification/textNotification';
import SVG from 'react-inlinesvg';

import cn from 'classnames';
import st from './NotificationCard.module.scss';

interface Props {
	notification: Notification;
}

const NotificationCard: FC<Props> = ({ notification }) => {
	const { pathcNotification } = useChangeNotification();

	const handleClick = (id: number) => {
		!notification.is_readed && pathcNotification(id);
	};

	return (
		<div
			className={cn(st.card, !notification.is_readed && st.new)}
			onClick={() => handleClick(notification.id)}
		>
			<div className={st.icon}>
				<SVG src={getIcon(notification)} />
			</div>

			<div className={st.main}>
				<p className={st.title}>{getTitle(notification)}</p>
				<p className={st.text}>{notification.text_body}</p>
			</div>

			<div className={st.info}>
				{!notification.is_readed && <p className={st.notify}>{'Новое уведомление'}</p>}
				<p className={st.date}>{format(parseISO(notification.created), 'dd.MM.yyyy')}</p>
			</div>
		</div>
	);
};

export default memo(NotificationCard);
