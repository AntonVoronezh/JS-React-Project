import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Formik, Field, Form} from 'formik';
import {toast} from 'react-toastify';

import './ModelCreatePage.css';
import {getShemaForModels} from '../../../../helpers/shemas';
import {InputText} from '../../../elements';
import {FieldsSelect} from '../../../../containers/elements';
import {bl} from '../../../../helpers/libs/bl';
import {partsOfWords} from '../../../../helpers/constants';

const ModelCreatePage = ({t, addModel}) => {
	const id = -Date.now();

	const modelInputs = (
		<Formik
			initialValues={{
				title: '',
				name: '',
				fields: [],
				id,
				className: 'model',
			}}
			validationSchema={getShemaForModels(
				t('validation.maxLen'),
				t('validation.minLen'),
				t('validation.requiredText')
			)}
			onSubmit={(values, {setSubmitting}) => {
				addModel(values);

				bl.addInObjectForSync({
					action: partsOfWords.ADD,
					part: partsOfWords.MODELS,
					values: {...values, _links: {self: {href: 'URL/api/entities'}}},
				});

				toast(t('toast.text', {type: t('toast.model'), action: t('toast.create')}));

				setTimeout(() => {
					setSubmitting(false);
				}, 300);
			}}
			render={({setFieldValue, isSubmitting}) => (
				<Form className="form-container  model-inputs">
					<Field component={InputText} name="title" id="title" label="Title"/>
					<Field component={InputText} name="name" id="name" label="Name"/>
					<FieldsSelect onChange={setFieldValue} label="Fields"/>
					<button type="submit" className="btn btn-success pt-20" disabled={isSubmitting}>
						{isSubmitting ? t('buttons.wait') : t('buttons.save')}
					</button>
				</Form>
			)}
		/>
	);

	return (
		<Fragment>
			<h1 className="display-4">{t('models.create.pageTitle')}</h1>
			{modelInputs}
		</Fragment>
	);
};

ModelCreatePage.propTypes = {
	t: PropTypes.func.isRequired,
	addModel: PropTypes.func.isRequired,
};

export {ModelCreatePage};
