import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Formik, Field, Form} from 'formik';
import {size as _size} from 'lodash';
import {toast} from 'react-toastify';

import './ModelEditPage.css';
import {getShemaForModels} from '../../../../helpers/shemas';
import {InputText} from '../../../elements';
import {FieldsSelect} from '../../../../containers/elements';
import {bl} from '../../../../helpers/libs/bl';
import {partsOfWords} from '../../../../helpers/constants';

const ModelEditPage = ({model: {id, title, name, fields, ...rest}, editModel, t}) => {
	const modelInputs = (
		<Formik
			enableReinitialize
			initialValues={{
				id,
				title,
				name,
				fields,
				...rest,
			}}
			validationSchema={getShemaForModels(
				t('validation.maxLen'),
				t('validation.minLen'),
				t('validation.requiredText')
			)}
			onSubmit={(values, {setSubmitting}) => {
				editModel(values);

				bl.addInObjectForSync({
					action: partsOfWords.EDIT,
					part: partsOfWords.MODELS,
					values,
				});

				toast(t('toast.text', {type: t('toast.model'), action: t('toast.edit')}));

				setTimeout(() => {
					setSubmitting(false);
				}, 300);
			}}
			render={({setFieldValue, isSubmitting, errors, values, touched}) => (
				<Form className="form-container  model-inputs">
					<Field component={InputText} name="title" id="title" label={t('fields.edit.title')}/>
					<Field component={InputText} name="name" id="name" label={t('fields.edit.name')}/>
					<FieldsSelect
						value={values.fields}
						onChange={setFieldValue}
						label={t('fields.edit.type')}
						error={errors.type}
					/>
					<button
						type="submit"
						className="btn  btn-success  pt-20"
						disabled={isSubmitting || !_size(touched)}
					>
						{isSubmitting ? t('buttons.wait') : t('buttons.save')}
					</button>
				</Form>
			)}
		/>
	);

	return (
		<Fragment>
			<h1 className="display-4">
				{t('models.edit.pageTitle')} "{title}"
			</h1>
			{modelInputs}
		</Fragment>
	);
};

ModelEditPage.propTypes = {
	model: PropTypes.object.isRequired,
	editModel: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
};

export {ModelEditPage};
