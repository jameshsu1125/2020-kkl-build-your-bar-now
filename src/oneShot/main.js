import React from 'react';
import './main.less';

import Background from './../Examination/background';
import Warning from './../Component/warning/warning';
import OC from 'UI/OrientationChange';
import TouchEvent from 'EVENT/TouchEvent';
import Content from './content';

export default class main extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		TouchEvent.init(true);
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