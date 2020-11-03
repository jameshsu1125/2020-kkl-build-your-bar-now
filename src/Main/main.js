import React from 'react';
import './main.less';
import Background from './background';
import Warning from './../Component/warning/warning';
import Content from './content';

import TouchEvent from 'EVENT/TouchEvent';
import OC from 'UI/OrientationChange';
import SSL from 'UNIT/Http2https';

import { gtag_install, gtag_pv } from 'SOCIAL/Gtag';

export default class main extends React.Component {
	constructor(props) {
		super(props);
		TouchEvent.init();
		SSL.go();
		gtag_install();
		gtag_pv('首頁');
	}

	out() {
		this.refs.bg.out();
	}

	render() {
		return (
			<div id='main'>
				<Background ref='bg' />
				<Content ref='c' TouchEvent={TouchEvent} out={this.out.bind(this)} />
				<Warning />
				<OC />
			</div>
		);
	}
}
