import React, { Component } from 'react';

import { ErrorBoundary } from '../../../hoc';
import { FooterElement } from '../../../components/elements';
import { WithSync } from '../../../hoc/with-sync';

export class FooterElementContainer extends Component {
	render() {
		return (
			<ErrorBoundary>
				<FooterElement {...this.props}/>
			</ErrorBoundary>
		);
	}
}

export default WithSync(FooterElementContainer);
