import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {NavLink} from 'react-router-dom';
import {toast} from 'react-toastify';

import './ModelsListPage.css';
import {pagesCount, path, partsOfWords, widthsForTable} from '../../../../helpers/constants';
import {ui} from '../../../../helpers/libs/ui';
import {bl} from '../../../../helpers/libs/bl';

const ModelsListPage = ({modelsList, errorMsg, deleteModel, t}) => {
	const columns = [
		{
			Header: t('models.list.table.num'),
			accessor: 'id',
			width: widthsForTable.half,
			className: 'number',
		},
		{
			Header: t('models.list.table.title'),
			accessor: 'title',
			Cell: props => <strong className="number">{props.value}</strong>,
		},
		{
			Header: t('models.list.table.name'),
			accessor: 'name',
		},
		{
			Header: t('models.list.table.actions'),
			accessor: 'id',
			width: widthsForTable.full,
			className: 'number',
			Cell: props => {
				const id = props.value;

				const clickHandler = () => {
					deleteModel(id);

					bl.addInObjectForSync({
						action: partsOfWords.DELETE,
						part: partsOfWords.MODELS,
						values: modelsList[id].get(),
					});

					toast(t('toast.text', {type: t('toast.model'), action: t('toast.del')}));
				};

				return (
					<Fragment>
						<NavLink to={`/${path.models}/${path.edit}/${id}`}>
							<FontAwesomeIcon icon={faSave} className="edit"/>
						</NavLink>
						<FontAwesomeIcon icon={faTrashAlt} className="del" onClick={clickHandler}/>
					</Fragment>
				);
			},
		},
	];

	const list = modelsList && (
		<ReactTable
			defaultPageSize={ui.calcDefaultPagesCountForTable({list: modelsList, number: pagesCount.MODELS})}
			data={ui.getObjectValues({object: modelsList})}
			columns={columns}
		/>
	);

	const result = modelsList ? list : errorMsg;

	return (
		<Fragment>
			<h1 className="display-4">{t('models.list.pageTitle')}</h1>
			<ul>{result}</ul>
		</Fragment>
	);
};

ModelsListPage.propTypes = {
	modelsList: PropTypes.object,
	errorMsg: PropTypes.string,
	deleteModel: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
};

export {ModelsListPage};
