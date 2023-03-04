import { FC, memo } from 'react';
import { Blank, ModalLarge } from 'library/components/common';
import { useAddressForm } from 'library/hooks/schedules';
import { FormProvider } from 'react-hook-form';
import { Address, AddressCard } from './frames';
import { ButtonAddBlock } from 'library/components/events';

import cn from 'classnames';
import st from './ModalAddress.module.scss';

interface Props {
	close: () => void;
}

const ModalAddress: FC<Props> = ({ close }) => {
	const {
		onSubmit,
		list,
		deleteAddress,
		methods,
		isDisabled,
		resetFields,
		openFormAddress,
		openForm,
	} = useAddressForm();
	return (
		<ModalLarge title={'Настройка адреса'} isOpen close={close}>
			<div className={st.wrapper}>
				{openForm && (
					<section className={st.wrapper__form}>
						<FormProvider {...methods}>
							<form onSubmit={methods.handleSubmit(onSubmit)}>
								<div className={st.title}>
									<h3>Добавить адрес</h3>
									<div className={st.btn}>
										<button type="submit" disabled={isDisabled}>
											Готово
										</button>
									</div>
								</div>
								<div className={st.form}>
									<Address isDisabled={isDisabled} handler={resetFields} />
								</div>
							</form>
						</FormProvider>
					</section>
				)}

				<section className={st.wrapper__list}>
					<div className={st.title}>
						<h3>Текущие адреса</h3>
						<div className={cn(openForm && st.rotate)}>
							<ButtonAddBlock onClick={openFormAddress} />
						</div>
					</div>

					<div className={st.list}>
						{!list.length ? (
							<div className={st.helper}>
								<Blank text={'Нет адресов'} />
							</div>
						) : (
							list.map((item, index) => (
								<AddressCard
									address={item}
									index={index}
									handler={deleteAddress}
									key={item.id}
									isDisabled={isDisabled}
								/>
							))
						)}
					</div>
				</section>
			</div>
		</ModalLarge>
	);
};

export default memo(ModalAddress);
