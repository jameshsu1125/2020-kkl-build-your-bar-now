import React from 'react';

import $ from 'jquery';
require('jquery-easing');

export default class stage_a extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.tr = {
			init() {
				this.img0.init();
				this.img1.init();
				this.img3.init();
			},
			play() {
				this.img0.play();
				this.img1.play();
				this.img3.play();
			},
			stop() {
				this.img0.stop();
				this.img1.stop();
				this.img3.stop();
			},
			img1: {
				time: 500,
				gap: 10,
				prob: 0.7,
				init() {
					this.c = $(root.refs.img1);
					this.r = this.or = 0;
					this.y = this.oy = parseInt(this.c.css('top'));
				},
				play() {
					$(this)
						.animate(
							{ r: this.or - 5, y: this.oy - this.gap },
							{
								duration: this.time,
								step: () => this.tran(),
								complete: () => this.tran(),
								easing: 'easeOutQuart',
							}
						)
						.animate(
							{ r: this.or, y: this.oy },
							{
								duration: this.time,
								step: () => this.tran(),
								complete: () => {
									this.tran();
									this.play();
								},
								easing: 'easeInQuart',
							}
						);
				},
				tran(is) {
					let s = 1;
					if (!is) {
						if (Math.random() > this.prob) s = 0.5 + Math.random() * 0.1;
						else s = 1;
					}
					this.c.css({
						transform: `rotate(${this.r}deg)`,
						'-webkit-transform': `rotate(${this.r}deg)`,
						'-moz-transform': `rotate(${this.r}deg)`,
						'-o-transform': `rotate(${this.r}deg)`,
						'-ms-transform': `rotate(${this.r}deg)`,
						top: this.y + 'px',
						opacity: s,
					});
				},
				stop() {
					$(this).clearQueue();
					$(this).stop();
					this.y = this.oy;
					this.r = this.or;
					this.tran(true);
				},
			},
			img0: {
				time: 500,
				gap: 50,
				prob: 0.7,
				init() {
					this.c = $(root.refs.img0);
					this.r = this.or = 0;
					this.y = this.oy = parseInt(this.c.css('top'));
				},
				play() {
					$(this)
						.animate(
							{ r: this.or - 5, y: this.oy - this.gap },
							{
								duration: this.time,
								step: () => this.tran(),
								complete: () => this.tran(),
								easing: 'easeOutQuart',
							}
						)
						.animate(
							{ r: this.or, y: this.oy },
							{
								duration: this.time,
								step: () => this.tran(),
								complete: () => {
									this.tran();
									this.play();
								},
								easing: 'easeInQuart',
							}
						);
				},
				tran(is) {
					let s = 1;
					if (!is) {
						if (Math.random() > this.prob) s = 0.5 + Math.random() * 0.1;
						else s = 1;
					}
					this.c.css({
						transform: `rotate(${this.r}deg)`,
						'-webkit-transform': `rotate(${this.r}deg)`,
						'-moz-transform': `rotate(${this.r}deg)`,
						'-o-transform': `rotate(${this.r}deg)`,
						'-ms-transform': `rotate(${this.r}deg)`,
						top: this.y + 'px',
						opacity: s,
					});
				},
				stop() {
					$(this).clearQueue();
					$(this).stop();
					this.y = this.oy;
					this.r = this.or;
					this.tran(true);
				},
			},
			img3: {
				time: 500,
				gap: 20,
				prob: 0.95,
				init() {
					this.c = $(root.refs.img3);
					this.y = this.oy = parseInt(this.c.css('top'));
				},
				play() {
					$(this)
						.animate(
							{ y: this.oy + this.gap },
							{
								duration: this.time,
								step: () => this.tran(),
								complete: () => this.tran(),
								easing: 'easeInOutSine',
							}
						)
						.animate(
							{ y: this.oy },
							{
								duration: this.time,
								step: () => this.tran(),
								complete: () => {
									this.tran();
									this.play();
								},
								easing: 'easeInOutSine',
							}
						);
				},
				tran(is) {
					let s = 1;
					if (!is) {
						if (Math.random() > this.prob) s = 1.3;
						else s = 1;
					}

					this.c.css({
						transform: `scale(${s})`,
						'-webkit-transform': `scale(${s})`,
						'-moz-transform': `scale(${s})`,
						'-o-transform': `scale(${s})`,
						'-ms-transform': `scale(${s})`,
						top: this.y + 'px',
					});
				},
				stop() {
					$(this).clearQueue();
					$(this).stop();
					this.y = this.oy;
					this.tran(true);
				},
			},
		};
	}

	stop() {
		this.tr.stop();
	}

	play() {
		this.tr.play();
	}

	componentDidMount() {
		this.tr.init();
	}

	componentWillUnmount() {
		this.stop();
	}

	render() {
		return (
			<>
				<div ref='img0' className='img_a_0'></div>
				<div ref='img1' className='img_a_1'></div>
				<div className='img_a_2'></div>
				<div ref='img3' className='img_a_3'></div>
			</>
		);
	}
}
