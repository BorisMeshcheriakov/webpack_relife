import useDialog from './useDialog';

/**
 * В связи с проблемами истечения сертификатов, Сбербанк требует установить в системе сертификаты Минцифры,
 * либо использовать официальные браузеры с уже предустановленными сертификатами. На 23.01.2023 это -
 * Яндекс.Браузер и Atom от mail.ru
 *
 * Relife может использовать самые разные платежные системы. Данный хук проверяет, подключен ли
 * платежный шлюз сбербанка, и использует ли клиент разрешенные браузеры
 */

const useCertificateMessage = () => {
	const { dialog } = useDialog();

	const redirect = (url: string) => {
		window.location.href = url;
	};

	const openInstallPage = () => window.open('https://www.sberbank.com/ru/certificates');

	const isOfficialBrowser = () => {
		// Ищем браузер клиента в списке разрешенных

		// TODO добавить проверку для Atom browser
		const officialBrowsers = ['yabrowser'];
		const userAgent = window.navigator.userAgent.toLowerCase();

		for (const browser of officialBrowsers) {
			const regexp = new RegExp(browser);
			if (regexp.test(userAgent)) {
				return true;
			}
		}

		return false;
	};

	const isSber = (url: string) => {
		const regexp = new RegExp('sber*');
		return regexp.test(url);
	};

	const onRedirect = (url: string) => {
		if (isSber(url) && !isOfficialBrowser()) {
			dialog({
				title: 'Внимание',
				text: 'Для стабильной работы оплаты в платежной системе Сбербанк требуются сертификаты минцифры. Открыть инструкцию для установки? \n Если в Вашей системе уже установлены необходимые сертификаты, Вы можете продолжить оплату',
				confirm: () => openInstallPage(),
				decline: () => redirect(url),
				confirmText: 'Открыть инструкцию',
				declineText: 'Продолжить оплату',
			});
		} else {
			redirect(url);
		}
	};

	return {
		onRedirect,
	};
};

export default useCertificateMessage;
