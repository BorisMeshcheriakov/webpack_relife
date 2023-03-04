import * as yup from 'yup';

const schema = yup.object().shape({
	video: yup.object().shape({}).noUnknown(),
});

export default schema;
