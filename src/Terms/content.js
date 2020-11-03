import React from 'react';
import './content.less';

import Logo from './../Component/logo/logo';
import Menu from './../Component/menu/menu';
import Dialog from './dialog';

import { gtag_pv } from 'SOCIAL/Gtag';

export default class content extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		gtag_pv('活動條款');
	}

	render() {
		return (
			<div id='content'>
				<Dialog TouchEvent={this.props.TouchEvent} />
				<Menu TouchEvent={this.props.TouchEvent} />
				<Logo TouchEvent={this.props.TouchEvent} />
			</div>
		);
	}
}
