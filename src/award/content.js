import React from 'react';
import './content.less';

import Logo from './../Component/logo/logo';
import Menu from './../Component/menu/menu';
import Award from './award';

export default class content extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div id='content'>
				<Award />
				<div class='sticky'>
					<Menu TouchEvent={this.props.TouchEvent} />
					<Logo TouchEvent={this.props.TouchEvent} />
				</div>
			</div>
		);
	}
}
