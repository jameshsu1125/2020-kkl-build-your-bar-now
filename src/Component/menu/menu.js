import React from 'react';
import './menu.less';
import Content from './content';

import $ from 'jquery';
require('jquery-easing');

import { gtag_pv } from 'SOCIAL/Gtag';

export default class menu extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.tr = {
			status: 'close',
			is: true,
			init: function () {
				this.t = $(root.refs.t);
				this.l = $('#menu').children('.l');
				this.evt();
			},
			evt: function () {
				this.t.mouseover(() => this.mouseover());
				this.t.mouseout(() => this.mouseout());
				root.props.TouchEvent.add('t', () => {
					this.switch();
				});
			},
			switch: function () {
				if (!this.is) return;
				if (this.status == 'close') this.open();
				else this.close();
			},
			open: function () {
				const self = this;
				this.status = 'open';
				this.is = false;
				let time = 200;
				this.l.each(function () {
					let tar = $(this);
					$(this).animate({ 'margin-top': '2.5px' }, time, 'easeInQuart', () => {
						let i = self.l.index($(this));
						switch (i) {
							case 0:
								$({ r: 0 }).animate(
									{ r: 45 },
									{
										duration: time,
										step: function () {
											self.setRotate(tar, this.r);
										},
										complete: function () {
											self.setRotate(tar, this.r);
										},
										easing: 'easeOutQuart',
									}
								);
								break;
							case 1:
								$({ r: 0 }).animate(
									{ r: -45 },
									{
										duration: 200,
										step: function () {
											self.setRotate(tar, this.r);
										},
										complete: function () {
											self.setRotate(tar, this.r);
										},
										easing: 'easeOutQuart',
									}
								);
								break;
							case 2:
								$(this).css('display', 'none');
								break;
						}
					});
				});
				root.refs.content.open();
				if (root.props.open) root.props.open();
				setTimeout(() => {
					this.is = true;
				}, time * 2);
				gtag_pv('主選單');
			},
			close: function () {
				const self = this;
				this.status = 'close';
				this.is = false;
				let time = 200;
				this.l.each(function () {
					let tar = $(this);
					let i = self.l.index(tar);
					switch (i) {
						case 0:
							$({ r: 45 }).animate(
								{ r: 0 },
								{
									duration: time,
									step: function () {
										self.setRotate(tar, this.r);
									},
									complete: function () {
										self.setRotate(tar, this.r);
										tar.animate(
											{
												'margin-top': -2.5 - 16 + 'px',
											},
											time,
											'easeOutQuart'
										);
									},
									easing: 'easeOutQuart',
								}
							);
							break;
						case 1:
							$({ r: -45 }).animate(
								{ r: 0 },
								{
									duration: time,
									step: function () {
										self.setRotate(tar, this.r);
									},
									complete: function () {
										self.setRotate(tar, this.r);
										tar.animate(
											{
												'margin-top': -2.5 + 16 + 'px',
											},
											time,
											'easeOutQuart'
										);
									},
									easing: 'easeOutQuart',
								}
							);
							break;

						case 2:
							setTimeout(() => {
								tar.css({ 'margin-top': '-2.5px', display: 'block' });
							}, time);
							break;
					}
				});
				root.refs.content.close();
				if (root.props.close) root.props.close();
				setTimeout(() => {
					this.is = true;
				}, time * 2);
			},
			mouseout: function () {
				let delay = 30;
				let time = 200;
				this.l.each(function (i) {
					$(this)
						.delay(delay * i)
						.animate({ width: '50px', 'margin-left': 0 - 50 / 2 + 'px' }, time, 'easeOutQuart');
				});
			},
			mouseover: function () {
				let delay = 30;
				let time = 200;
				let width = 60;
				this.l.each(function (i) {
					$(this)
						.delay(delay * i)
						.animate({ width: width + 'px', 'margin-left': 0 - width / 2 + 'px' }, time, 'easeOutQuart');
				});
			},
			setRotate: function (t, r) {
				t.css({
					transform: `rotate(${r}deg)`,
					'-webkit-transform': `rotate(${r}deg)`,
					'-moz-transform': `rotate(${r}deg)`,
					'-o-transform': `rotate(${r}deg)`,
					'-ms-transform': `rotate(${r}deg)`,
				});
			},
		};
	}

	componentDidMount() {
		this.tr.init();
	}

	render() {
		return (
			<>
				<Content ref='content' TouchEvent={this.props.TouchEvent} />
				<div id='menu'>
					<div class='l'></div>
					<div class='l'></div>
					<div class='l'></div>
					<div id='t' ref='t' class='t'></div>
				</div>
			</>
		);
	}
}
