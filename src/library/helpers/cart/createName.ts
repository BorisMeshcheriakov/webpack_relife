import { Client } from 'library/types/cart';

const createName = (client: Client, field: string, value: string) => {
	client = { ...client, [field]: value };
	const name = [client.last_name, client.first_name, client.middle_name].join(' ');
	return name;
};

export default createName;
