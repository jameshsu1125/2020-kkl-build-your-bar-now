import React from 'react';
import $ from 'jquery';
require('jquery-easing');

export default class stage_d extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.tr = {
			init() {
				this.img2.init();
			},
			play() {
				this.img2.play();
			},
			stop() {
				this.img2.stop();
			},
			img2: {
				time: 1000,
				prob: 0.9,
				init() {
					this.c = $(root.refs.img2);
					this.r = 0;
				},
				play() {
					$(this)
						.animate(
							{ r: 100 },
							{
								duration: this.time,
								step: () => this.tran(),
								complete: () => this.tran(),
								easing: 'easeOutQuart',
							}
						)
						.animate(
							{ r: 0 },
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
						if (Math.random() > this.prob) s = 0.7 + Math.random() * 0.1;
						else s = 1;
					}
					this.c.css({
						opacity: s,
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
				<div className='img_d_0'></div>
				<div className='img_d_1'></div>
				<div ref='img2' className='img_d_2'></div>
			</>
		);
	}
}
