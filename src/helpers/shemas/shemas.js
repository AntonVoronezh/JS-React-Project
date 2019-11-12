import * as Yup from 'yup';

const getShemaForModels = (minLength, maxLength, requiredText) =>
	Yup.object().shape({
		name: Yup.string()
			.min(2, minLength)
			.max(20, maxLength)
			.required(requiredText),
		title: Yup.string()
			.min(2, minLength)
			.max(20, maxLength)
			.required(requiredText),
	});

const getShemaForFieldls = (minLength, maxLength, requiredText) =>
	Yup.object().shape({
		name: Yup.string()
			.min(2, minLength)
			.max(20, maxLength)
			.required(requiredText),
		title: Yup.string()
			.min(2, minLength)
			.max(20, maxLength)
			.required(requiredText),
		type: Yup.string()
			.required(requiredText),
		is_array: Yup.boolean(),
		model: Yup.number().nullable(),
	});

export { getShemaForModels, getShemaForFieldls };
