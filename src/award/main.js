import React from 'react';
import './main.less';
import Background from './../Examination/background';
import TouchEvent from 'EVENT/TouchEvent';
import { gtag_install } from 'SOCIAL/Gtag';
import Warning from './../Component/warning/warning';
import Content from './content';

import OC from 'UI/OrientationChange';

export default class award extends React.Component {
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
