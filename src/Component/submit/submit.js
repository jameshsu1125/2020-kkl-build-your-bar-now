import React from 'react';
import './submit.less';
import $ from 'jquery';
require('jquery-easing');

import { Pad } from 'UNIT/Number';

export default class submit extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.tr = {
			b: -110,
			time: 500,
			is: false,
			color: parseInt('ff', 16),
			s: 1,
			init() {
				this.c = $(root.refs.main);
				this.btn = $(root.refs.btn);
				if (window.innerWidth > 768) this.btn.addClass('hover');
				this.tran();
				this.tran2();
			},
			out() {
				$(this).animate(
					{ b: -110 },
					{
						duration: this.time,
						step: () => this.tran(),
						complete: () => {
							this.tran();
							root.props.destory();
						},
						easing: 'easeOutQuart',
					}
				);
			},
			blank() {
				$(this).animate(
					{ s: 0.8 },
					{
						duration: 50,
						step: () => this.tran3(),
						complete: () => {
							this.tran3();
							this.hide();
						},
						easing: 'easeOutQuart',
					}
				);
			},
			tran3() {
				this.btn.css({
					transform: `scale(${this.s})`,
					'-webkit-transform': `scale(${this.s})`,
					'-moz-transform': `scale(${this.s})`,
					'-o-transform': `scale(${this.s})`,
					'-ms-transform': `scale(${this.s})`,
				});
			},
			in() {
				$(this)
					.delay(500)
					.animate(
						{ b: 30 },
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
			evt() {
				root.props.TouchEvent.add('submit_btn', () => {
					if (!this.is) return;
					this.is = false;
					this.blank();
					root.props.click();
				});
			},
			tran() {
				this.c.css('bottom', this.b + 'px');
			},
			hide() {
				if (window.innerWidth > 768) this.btn.removeClass('hover');
				$(this).animate(
					{
						color: parseInt('66', 16),
					},
					{
						duration: this.time,
						step: () => this.tran2(),
						complete: () => this.tran2(),
						easing: 'easeOutQuart',
					}
				);
			},
			show() {
				$(this).animate(
					{
						color: parseInt('ff', 16),
						s: 1,
					},
					{
						duration: this.time,
						step: () => this.tran2(),
						complete: () => {
							this.tran2();
							if (window.innerWidth > 768) this.btn.addClass('hover');
							this.is = true;
						},
						easing: 'easeOutQuart',
					}
				);
			},
			tran2() {
				let c = Pad(Math.round(this.color).toString(16), 2);
				this.btn.css({
					color: '#' + c + c + c,
					border: `solid #${c + c + c} 2px`,
					transform: `scale(${this.s})`,
					'-webkit-transform': `scale(${this.s})`,
					'-moz-transform': `scale(${this.s})`,
					'-o-transform': `scale(${this.s})`,
					'-ms-transform': `scale(${this.s})`,
				});
			},
		};
	}

	blank() {
		if (!this.tr.is) true;
		this.tr.is = false;

		this.tr.blank();
	}

	out() {
		this.tr.out();
	}

	in() {
		this.tr.in();
	}

	show() {
		this.tr.show();
	}

	componentDidMount() {
		this.tr.init();
	}

	componentWillUnmount() {
		this.props.TouchEvent.remove('submit_btn');
	}

	render() {
		return (
			<div id='submit' ref='main'>
				<div ref='btn' id='submit_btn' className='submit_btn'>
					送出
				</div>
			</div>
		);
	}
}
