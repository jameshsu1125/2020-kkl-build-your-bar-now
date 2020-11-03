import React from 'react';
import './../Main/main.less';

import Background from './../Examination/background';
import Warning from './../Component/warning/warning';
import OC from 'UI/OrientationChange';
import TouchEvent from 'EVENT/TouchEvent';
import Content from './content';

import { gtag_install } from 'SOCIAL/Gtag';

export default class main extends React.Component {
	constructor(props) {
		super(props);
		TouchEvent.init(true);
		gtag_install();
	}

	render() {
		return (
			<div id='main'>
				<Background />
				<Content TouchEvent={TouchEvent} />
				<Warning />
				<OC />
			</div>
		);
	}
}
