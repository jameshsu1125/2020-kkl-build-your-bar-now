import React from 'react';
import './main.less';
import Content from './content';
import TouchEvent from 'EVENT/TouchEvent';
import Background from './background';

import $ from 'jquery';
require('jquery.waitforimages');

export default class main extends React.Component {
	constructor(props) {
		super(props);
		TouchEvent.init();
	}

	componentDidMount() {
		$(this.refs.main).waitForImages({
			finished: () => this.refs.content.ready(),
			each: () => {},
			waitForAll: true,
		});
	}

	componentDidUpdate() {
		//script
	}

	componentWillUnmount() {
		//script
	}

	render() {
		return (
			<div ref='main' id='examination'>
				<Background />
				<Content ref='content' TouchEvent={TouchEvent} />
			</div>
		);
	}
}
