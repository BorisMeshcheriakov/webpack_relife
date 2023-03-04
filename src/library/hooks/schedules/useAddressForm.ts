import { yupResolver } from '@hookform/resolvers/yup';
import { defaultAddressValue, normalizeScheduleAddress, schema } from 'library/helpers/schedules';
import {
	addAddress,
	removeAddress,
	selectAddressesStatus,
	selectSortAddress,
} from 'library/redux/schedules';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../common';

const useAddressForm = () => {
	const dispatch = useAppDispatch();
	const list = useAppSelector(selectSortAddress);
	const status = useAppSelector(selectAddressesStatus);
	const [openForm, setOpenForm] = useState<boolean>(false);

	const isDisabled = status === 'loading' ? true : false;

	const methods = useForm({
		resolver: yupResolver(schema),
		reValidateMode: 'onSubmit',
		defaultValues: {
			address: defaultAddressValue,
		},
	});

	const resetFields = () => {
		methods.resetField('address');
	};

	const openFormAddress = () => {
		setOpenForm((previousValue) => !previousValue);
	};

	const onSubmit = (data: any) => {
		dispatch(addAddress(normalizeScheduleAddress(data, list)));
		resetFields();
		openFormAddress();
	};

	const deleteAddress = (id: number) => {
		dispatch(removeAddress(id));
	};

	return {
		methods,
		onSubmit,
		list,
		deleteAddress,
		isDisabled,
		resetFields,
		openFormAddress,
		openForm,
	};
};

export default useAddressForm;
