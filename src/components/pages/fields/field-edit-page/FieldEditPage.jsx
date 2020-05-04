import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Formik, Field, Form} from 'formik';
import {size as _size} from 'lodash';
import {toast} from 'react-toastify';

import './FieldEditPage.css';
import {InputText, Checkbox} from '../../../elements';
import {getShemaForFieldls} from '../../../../helpers/shemas';
import {TypeSelect} from '../../../../containers/elements';
import {bl} from '../../../../helpers/libs/bl';
import {partsOfWords} from '../../../../helpers/constants';

const FieldEditPage = ({model: {id, title, name, type, isMultiple, isRequired, placeholder, configuration, ...rest}, editField, t}) => {
	const fieldForEdit = (
		<Formik
			initialValues={{
				id,
				title,
				name,
				type,
				isMultiple,
				isRequired,
				placeholder,
				configuration,
				...rest
			}}
			validationSchema={getShemaForFieldls(
				t('validation.maxLen'),
				t('validation.minLen'),
				t('validation.requiredText')
			)}
			onSubmit={(values, {setSubmitting}) => {
				editField(values);

				bl.addInObjectForSync({
					action: partsOfWords.EDIT,
					part: partsOfWords.FIELDS,
					values,
				});

				toast(t('toast.text', {type: t('toast.field'), action: t('toast.edit')}));

				setTimeout(() => {
					setSubmitting(false);
				}, 300);
			}}
			render={({setFieldValue, isSubmitting, errors, values, touched}) => {
				return (
					<Form className="form-container  model-inputs-fields">
						<Field component={InputText} value={values.title} name="title" id="title"
							   label={t('fields.edit.title')}/>
						<Field component={InputText} name="name" id="name" label={t('fields.edit.name')}/>
						<Field component={InputText} name="placeholder" id="placeholder"
							   label={t('fields.edit.placeholder')}/>
						<Field component={Checkbox} name="isMultiple" id="isMultiple"
							   label={t('fields.edit.isMultiple')}/>
						<Field component={Checkbox} name="isRequired" id="isRequired"
							   label={t('fields.edit.isRequired')}/>
						<TypeSelect
							value={values.type}
							onChange={setFieldValue}
							label={t('fields.edit.type')}
							error={errors.type}
						/>
						<button
							type="submit"
							className="btn btn-success pt-20"
							disabled={isSubmitting || !_size(touched)}
						>
							{isSubmitting ? t('buttons.wait') : t('buttons.save')}
						</button>
					</Form>
				);
			}}
		/>
	);

	return (
		<Fragment>
			<h1 className="display-4">
				{t('fields.edit.pageTitle')} "{title}"
			</h1>
			{fieldForEdit}
		</Fragment>
	);
};

FieldEditPage.propTypes = {
	model: PropTypes.object.isRequired,
	editField: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
};

export {FieldEditPage};
