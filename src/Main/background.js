import React from 'react';
import './background.less';

import $ from 'jquery';
require('jquery-easing');

export default class background extends React.Component {
	constructor(props) {
		super(props);
	}

	out() {
		$(this.refs.bg)
			.animate({ opacity: 0.2 }, 500, 'easeOutQuart')
			.delay(500)
			.animate({ opacity: 0 }, 500, 'easeOutQuart');
	}

	render() {
		return <div ref='bg' id='background'></div>;
	}
}
