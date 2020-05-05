import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {NavLink} from 'react-router-dom';
import {toast} from 'react-toastify';

import './FieldsListPage.css';
import {pagesCount, path, widthsForTable} from '../../../../helpers/constants';
import {ui} from '../../../../helpers/libs/ui';
import {bl} from '../../../../helpers/libs/bl';
import {partsOfWords} from '../../../../helpers/constants';

const FieldsListPage = ({errorMsg, fieldsList, deleteField, t}) => {
	const columns = [
		{
			Header: t('fields.list.table.num'),
			accessor: 'id',
			width: widthsForTable.half,
			className: 'number',
		},
		{
			Header: t('fields.list.table.title'),
			accessor: 'title',
			Cell: props => <strong className="number">{props.value}</strong>,
		},
		{
			Header: t('fields.list.table.name'),
			accessor: 'name',
		},
		{
			Header: t('fields.list.table.actions'),
			accessor: 'id',
			width: widthsForTable.full,
			className: 'number',
			Cell: props => {
				const id = props.value;

				const clickHandler = () => {
					deleteField(id);

					bl.addInObjectForSync({
						action: partsOfWords.DELETE,
						part: partsOfWords.FIELDS,
						values: fieldsList[id].get(),
					});

					toast(t('toast.text', {type: t('toast.field'), action: t('toast.del')}));
				};

				return (
					<Fragment>
						<NavLink to={`/${path.fields}/${path.edit}/${id}`}>
							<FontAwesomeIcon icon={faSave} className="edit"/>
						</NavLink>
						<FontAwesomeIcon icon={faTrashAlt} className="del" onClick={clickHandler}/>
					</Fragment>
				);
			},
		},
	];

	const list = fieldsList && (
		<ReactTable
			defaultPageSize={ui.calcDefaultPagesCountForTable({list: fieldsList, number: pagesCount.FIELDS})}
			data={ui.getObjectValues({object: fieldsList})}
			columns={columns}
		/>
	);

	const result = errorMsg ? errorMsg : list;

	return (
		<Fragment>
			<h1 className="display-4">{t('fields.list.pageTitle')}</h1>
			<ul>{result}</ul>
		</Fragment>
	);
};

FieldsListPage.propTypes = {
	fieldsList: PropTypes.object,
	errorMsg: PropTypes.string,
	deleteField: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
};

export {FieldsListPage};
