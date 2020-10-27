import React from 'react';
import './main.less';
import Background from './background';
import Warning from './../Component/warning/warning';
import Content from './content';
import TouchEvent from 'EVENT/TouchEvent';
import OC from 'UI/OrientationChange';
import SSL from 'UNIT/Http2https';

export default class main extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		TouchEvent.init();
		SSL.go();
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
