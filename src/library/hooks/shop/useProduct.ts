import { useEffect, useState } from 'react';
import qs from 'query-string';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { DetailStorageItem, SelectableOption, DetailAttribute } from 'library/models/shop';
import { Media, Price, Info } from 'library/types/shop';

import { useAppDispatch } from 'library/hooks/common';
import { useUser } from 'library/hooks/user';

import { openNotifyModal, openAuthModal } from 'library/redux/modal';
import { addToCart } from 'library/redux/cart';

import { shopService } from 'library/api/shopService';

const useProduct = () => {
	const dispatch = useAppDispatch();
	const { search } = useLocation();
	const { id } = useParams<{ id: string }>();
	const { isAuth } = useUser();
	const { push } = useHistory();

	const [status, setStatus] = useState<string>('idle');
	const [initialComplete, setInitialComplete] = useState<boolean>(false);

	const [attributes, setAttributes] = useState<DetailAttribute[]>([]);
	const [storage, setStorage] = useState<DetailStorageItem[]>([]);
	const [media, setMedia] = useState<Media>({} as Media);
	const [price, setPrice] = useState<Price>({} as Price);
	const [info, setInfo] = useState<Info>({} as Info);

	const [quantity, setQuantity] = useState<string>('1');
	const [selectedQuantity, setSelectedQuantity] = useState<number>(0);
	const [attributesSelected, setAttributesSelected] = useState<boolean>(false);
	const [filterdStorage, setFilterdStorage] = useState([] as DetailStorageItem[]);
	const [showSelectNote, setShowSelectNote] = useState<boolean>(false);

	const [tables, setTables] = useState<any>([]);

	const sendToCart = async () => {
		// отправляем товар в корзину
		if (isAuth) {
			const item = { ...filterdStorage[0] };
			const quantityNumber: number = parseInt(quantity);
			if (quantity === '' || quantity === '0') {
				dispatch(
					openNotifyModal({
						title: 'Ошибка',
						text: 'Выбрано несоответствующее количество товара',
						confirmText: 'Ок',
					})
				);
				setQuantity('1');
				return;
			}
			const data = {
				count: quantityNumber > item.count ? item.count : quantityNumber,
				storageitem: item.id,
			};
			dispatch(addToCart(data));

			// сбрасываем количество товара после отправки
			setQuantity('1');
		} else {
			dispatch(openAuthModal());
		}
	};

	useEffect(() => {
		/** Основной атрибут (у которого required: true), всегда должен быть выбран
		 	проверяем, какие параметры пришли из строки браузера */
		if (status === 'loaded' && attributes.length > 0 && !initialComplete) {
			let params = qs.parse(search);
			const paramArray = Object.keys(params);

			if (paramArray.length === 0) {
				// пользователь не указал в ссылке ни одного атрибута - выбираем один главный
				for (const attr of attributes) {
					const options = [...attr.storage_variations] as SelectableOption[];
					if (
						attr.required &&
						(attr.type === 'color' || attr.type === 'size' || attr.type === 'option')
					) {
						let id = attr.id;
						params = { [id]: options[0]?.id.toString() };
						break;
					}
				}
				push({ search: qs.stringify(params) });
			}

			setInitialComplete(true);
		}
	}, [search, status, initialComplete, push, attributes]);

	useEffect(() => {
		// подсчитываем количество товара, отфильтрованного по характеристикам
		if (storage.length === 0 && !initialComplete && status !== 'loaded') {
			return;
		}

		// отключаем подсказку, если включена
		setShowSelectNote(false);

		let params = qs.parse(search);
		// проверяем, все ли переключаемые атрибуты выбраны и если да, включаем кнопку "отправить в корзину"
		const isAllAtributesSelected = (storage: DetailStorageItem[]) => {
			if (!storage[0]) {
				return false;
			}

			setAttributesSelected(
				Object.keys(params).length ===
					storage[0].attributevalue.filter(
						(attr) =>
							attr.attribute.type === 'color' ||
							attr.attribute.type === 'size' ||
							attr.attribute.type === 'option'
					).length
			);
		};

		const calculateQuantity = (storage: DetailStorageItem[]) => {
			/** Подсчитываем количество товара. TODO Уточнить, может ли в storage лежать 
				несколько пачек товара с одинаковыми характеристиками
				Пока что все указывает  на то, что не может
 			*/
			let quantity = 0;
			for (let i = 0; i < storage.length; i++) {
				quantity += storage[i].count;
			}
			setSelectedQuantity(quantity);
		};

		const filterProducts = (params: any) => {
			// фильтруем товары по выбранным характеристикам и сохраняем отдельно
			let storageItems = [...storage];
			for (const param in params) {
				storageItems = storageItems.filter((item) => {
					return (
						item.attributevalue.filter((value) => {
							return (
								value.attribute.id.toString() === param &&
								params[param] === value.value.id.toString()
							);
						}).length > 0
					);
				});
			}

			if (storageItems.length > 0) {
				setFilterdStorage(storageItems);
			}
			calculateQuantity(storageItems);
			isAllAtributesSelected(storage);
		};

		filterProducts(params);
	}, [search, storage, push, initialComplete, status]);

	// const sortAttributes = (attributes: DetailAttribute[]) => {
	// 	// сортируем свойства товара, сначала required
	// 	let attr = [...attributes];
	// 	attr = attr.sort((x, y) => (x.required === y.required ? 0 : x.required ? -1 : 1));
	// 	return attr;
	// };

	useEffect(() => {
		// получаем свойства товара
		const getProduct = async (id: string) => {
			setStatus('loading');
			try {
				const { data } = await shopService.getProduct(id);
				let attributes = [...data.attributes];

				if (attributes.length > 0) {
					attributes[0] = { ...attributes[0], required: true };
				}

				setAttributes(attributes);
				setStorage(data.storageitem);
				setMedia({
					image: data.promo_image,
					images: data.images,
					video: data.product_video,
					presentation: data.presentation,
				});
				setPrice({
					amount: data.product_price[0].amount,
					partner_amount: data.product_price[0].partner_amount,
				});
				setInfo({
					title: data.title,
					description: data.description,
					secondaryDescription: data.secondary_description,
				});

				setTables(data.product_group.tables);
			} catch (error) {}
			setStatus('loaded');
		};

		getProduct(id);
	}, [id]);

	return {
		status,
		filterdStorage,
		quantity,
		setQuantity,
		sendToCart,
		showSelectNote,
		setShowSelectNote,
		selectedQuantity,
		attributesSelected,
		attributes,
		storage,
		media,
		price,
		info,
		tables,
	};
};

export default useProduct;
