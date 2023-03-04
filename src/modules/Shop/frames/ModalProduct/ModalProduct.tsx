import { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useProduct } from 'library/hooks/shop';

import { ModalLarge } from 'library/components/common';

import Tabs from './frames/Tabs';
import Description from './frames/Description';
import Presentation from './frames/Presentation';
import ButtonAddToCart from './frames/ButtonAddToCart';

import Price from './frames/Price';
import Storage from './frames/Storage';
import Specs from './frames/Specs';

import { Table, Spinner } from 'library/components/shop';

import { QuantityInput } from 'library/components/common';

import st from './ModalProduct.module.scss';
import PreView from './frames/PreView';

const ModalProduct: FC = () => {
	const { push } = useHistory();
	const product = useProduct();
	const [tab, setTab] = useState<string>('description');

	const closeModal = () => push('/store/products');

	return (
		<ModalLarge isOpen close={closeModal} title={product.info.title}>
			{product.status === 'loading' && (
				<div className={st.spinner}>
					<Spinner />
				</div>
			)}
			{product.status === 'loaded' && (
				<>
					<div className={st.product}>
						<section className={st.card}>
							<div className={st.card__image}>
								<PreView
									promoImage={product.media.image}
									images={product.media.images}
									video={product.media.video?.code}
								/>
							</div>
							<div className={st.card__data}>
								<div className={st.card__specs}>
									<Specs
										attributes={product.attributes}
										showSelectNote={product.showSelectNote}
										storage={product.storage}
									/>
								</div>
								<div className={st.card__quantity}>
									<div>Количество</div>
									<QuantityInput
										value={product.quantity}
										setValue={product.setQuantity}
										maxQuantity={product.attributesSelected ? product.selectedQuantity : Infinity}
										defaultValue="1"
									/>
									<Storage
										quantity={product.selectedQuantity}
										attributesSelected={product.attributesSelected}
									/>
								</div>
								<div className={st.card__buy}>
									<Price
										quantity={product.quantity}
										price={product.price.amount}
										partnerPrice={product.price.partner_amount}
									/>
									<ButtonAddToCart
										onClick={product.sendToCart}
										storage={product.filterdStorage}
										setShowSelectNote={product.setShowSelectNote}
										showSelectNote={product.showSelectNote}
										attributesSelected={product.attributesSelected}
									/>
								</div>
							</div>
							<div className={st.cart__table}>
								{product.tables.length > 0 && <Table tables={product.tables} />}
							</div>
						</section>
						<section className={st.buttons}>
							<Tabs tabs={['description', 'specifications']} selected={tab} setTab={setTab} />
							{product.media.presentation && product.media.presentation !== 'null' && (
								<Presentation presentation={product.media.presentation} />
							)}
						</section>
						<section className={st.data}>
							{tab === 'description' && <Description text={product.info.description} />}
							{tab === 'specifications' && <Description text={product.info.secondaryDescription} />}
						</section>
					</div>
				</>
			)}
		</ModalLarge>
	);
};

export default ModalProduct;
