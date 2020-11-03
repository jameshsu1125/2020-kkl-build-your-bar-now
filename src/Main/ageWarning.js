import React from 'react';
import './ageWarning.less';

import $ from 'jquery';
require('jquery-easing');

import { gtag_pv, gtag_event } from 'SOCIAL/Gtag';

export default class ageWarning extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.tr = {
			b: -70,
			time: 800,
			init: function () {
				this.c = $(root.refs.main);
				this.in();
			},
			in: function () {
				$(this).animate(
					{ b: 0 },
					{
						duration: this.time,
						step: () => this.tran(),
						complete: () => {
							this.tran();
							this.evt();
						},
						easing: 'easeOutQuart',
					}
				);
			},
			out: function () {
				$(this).animate(
					{ b: -70 },
					{
						duration: this.time,
						step: () => this.tran(),
						complete: () => {
							this.tran();
							root.props.end();
						},
						easing: 'easeOutQuart',
					}
				);
			},
			evt: function () {
				root.props.TouchEvent.add('ageWarning-btn', () => {
					this.out();
					gtag_event('未成年', '關閉');
				});
			},
			tran: function () {
				this.c.css('bottom', this.b + '%');
			},
		};
	}

	componentDidMount() {
		this.tr.init();
		gtag_pv('未成年');
	}

	componentWillUnmount() {
		root.props.TouchEvent.remove('ageWarning-btn');
	}

	render() {
		return (
			<div ref='main' id='ageWarning'>
				謝謝您支持金門高粱酒活動，
				<br />
				本次活動適合18歲以上成年人參與，
				<br />
				未來希望有機會再與您互動！
				<br />
				<div id='ageWarning-btn' class='btn'>
					關閉
				</div>
			</div>
		);
	}
}
