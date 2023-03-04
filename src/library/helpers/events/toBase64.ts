const toBase64 = (file: File | null) =>
	new Promise((resolve, reject) => {
		if (file instanceof File) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		}
	});

export default toBase64;
