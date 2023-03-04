import { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import Modal from 'react-modal';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import cn from 'classnames';

import { usePromocode } from 'library/hooks/shop';

import { IconButton, useMediaQuery } from '@mui/material';
import { Spinner } from 'library/components/shop';
import CloseIcon from '@mui/icons-material/Close';
import logo from 'resources/icons/Logo.svg';

import st from './ModalPromo.module.scss';

const ModalPromo = () => {
	const [copied, setCopied] = useState(false);
	const { push } = useHistory();
	const { code, status } = usePromocode();
	const params = useParams<{ tab: string }>();
	const matches = useMediaQuery('(min-width:600px)');

	const onClose = () => {
		push(`/store/${params.tab}`);
	};

	const onCopy = () => {
		setCopied(true);
		setTimeout(() => {
			setCopied(false);
		}, 1000);
	};

	return (
		<Modal
			className={st.promoModal}
			isOpen
			overlayClassName={st.promoModal__overlay}
			ariaHideApp={false}
		>
			<IconButton
				onClick={onClose}
				sx={{
					position: 'absolute',
					right: !matches ? '0px' : '-40px',
					top: !matches ? '5px' : '-10px',
					backgroundColor: 'transparent',
					color: matches ? '#FFF' : '#616f82',
					':hover': {
						backgroundColor: !matches ? '#f1f2f4' : 'transparent',
						color: matches ? '#FFF' : '#616f82',
					},
				}}
			>
				<CloseIcon />
			</IconButton>

			{status === 'loading' && (
				<div className={st.loader}>
					<Spinner />
				</div>
			)}
			{status === 'loaded' && (
				<>
					<div className={st.promoModal__header}>
						<Link className={st.logo} to="/">
							<img src={logo} alt="logo" />
						</Link>
						<p>Поделитесь промокодом с Вашим клиентом</p>
					</div>

					<div className={st.promoModal__body}>
						<section className={st.promoModal__data}>
							<div className={st.promoModal__title}>Сообщение</div>
							<div className={st.promoModal__wrapper}>
								<p>
									При покупке товара в магазине
									<a
										href={`${window.location.origin}/store`}
									>{` ${window.location.origin}/store`}</a>
								</p>

								<p>Вы можете воспользоваться моей персональной скидкой 👇</p>
								<p>
									При оформлении товара введите промокод: <span>{code}</span>
								</p>
							</div>
						</section>

						<section className={st.promoModal__submit}>
							<CopyToClipboard
								text={`При покупке товара в магазине ${window.location.origin}/store \n Вы можете воспользоваться моей персональной скидкой 👇 \n При оформлении товара введите промокод: ${code}`}
								onCopy={onCopy}
							>
								<button className={st.promoModal__body__copy}>Скопировать</button>
							</CopyToClipboard>
						</section>
					</div>

					<div className={cn(st.message, copied && st.visible)}>Скопировано в буфер обмена</div>
				</>
			)}
		</Modal>
	);
};

export default ModalPromo;
