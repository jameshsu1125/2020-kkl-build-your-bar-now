import React from 'react';
import './content.less';

import Logo from './../Component/logo/logo';
import Menu from './../Component/menu/menu';
import OneShot from './oneShot';

export default class content extends React.Component {
	render() {
		return (
			<div id='content'>
				<OneShot TouchEvent={this.props.TouchEvent} />
				<div class='sticky'>
					<Menu TouchEvent={this.props.TouchEvent} />
					<Logo TouchEvent={this.props.TouchEvent} />
				</div>
			</div>
		);
	}
}
