import React from 'react';
import './content.less';

import Logo from './../Component/logo/logo';
import Menu from './../Component/menu/menu';
import Restaurant from './restaurant';

export default class content extends React.Component {
	render() {
		return (
			<div id='content'>
				<Restaurant TouchEvent={this.props.TouchEvent} />
				<div class='sticky'>
					<Menu TouchEvent={this.props.TouchEvent} />
					<Logo TouchEvent={this.props.TouchEvent} />
				</div>
			</div>
		);
	}
}
