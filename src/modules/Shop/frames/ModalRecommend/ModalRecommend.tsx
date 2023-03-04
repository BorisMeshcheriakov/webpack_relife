import { useState } from 'react';
import cn from 'classnames';
import Modal from 'react-modal';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useHistory } from 'react-router-dom';

import useWindowDimensions from 'library/hooks/common/useWindowDimensions';
import usePromocode from 'library/hooks/shop/usePromocode';

import { ButtonCross } from 'library/components/common';
import { Spinner } from 'library/components/shop';

import st from './ModalRecommend.module.scss';

const ModalRecommend = () => {
	const [copied, setCopied] = useState(false);
	const { push } = useHistory();
	const { code, product, status } = usePromocode();
	const { width } = useWindowDimensions();

	const handleClose = () => {
		push('/store/products');
	};

	const onCopy = () => {
		setCopied(true);
		setTimeout(() => {
			setCopied(false);
		}, 1000);
	};

	return (
		<Modal className={st.promoModal} isOpen overlayClassName={st.overlay} ariaHideApp={false}>
			<div className={st.close}>
				<ButtonCross handler={handleClose} theme={width > 1024 ? 'white' : 'grey'} />
			</div>
			{status === 'loading' && (
				<div className={st.loader}>
					<Spinner />
				</div>
			)}
			{status === 'loaded' && (
				<div className={st.content}>
					<section className={st.content__header}>
						<h3>Рекомендация товара</h3>
					</section>
					<h3 className={st.content__note}>
						При покупке товаров в нашем интернет - магазине с использованием Вашего промокода
						покупатель получает скидку, а Вы вознаграждение.
					</h3>

					<section className={st.content__data}>
						<div className={st.content__title}>Сообщение</div>
						<div className={st.content__wrapper}>
							<p>
								Рекомендую Вам для приобретения <span>{product.title}</span>
							</p>
							<p>
								Ссылка на товар 👉
								<a
									href={`${window.location.origin}/store/products/product/${product.id}`}
								>{`${window.location.origin}/store/products/product/${product.id}`}</a>
							</p>
							<p>Также Вы можете воспользоваться моей персональной скидкой 👇</p>
							<p>
								При оформлении товара введите промокод: <span>{code}</span>
							</p>
						</div>
					</section>

					<section className={st.submit}>
						<CopyToClipboard
							text={`Рекомендую вам для приобретения ${product.title} \n 
Ссылка на товар 👉 ${window.location.origin}/store/products/product/${product.id} \n 
Также вы можете воспользоваться моей персональной скидкой 👇 \n 
При оформлении товара введите промокод: ${code}`}
							onCopy={onCopy}
						>
							<button>Скопировать сообщение</button>
						</CopyToClipboard>
					</section>
				</div>
			)}

			<div className={cn(st.message, copied && st.visible)}>Скопировано в буфер обмена</div>
		</Modal>
	);
};

export default ModalRecommend;
