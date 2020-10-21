import React from 'react';
import $ from 'jquery';
require('jquery-easing');

export default class stage_d extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.tr = {
			init() {
				this.img1.init();
			},
			play() {
				this.img1.play();
			},
			stop() {
				this.img1.stop();
			},
			img1: {
				time: 2000,
				gap: 10,
				init() {
					this.c = $(root.refs.img1);
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
					this.c.css({
						top: this.y + 'px',
					});
				},
				stop() {
					$(this).clearQueue();
					$(this).stop();
					this.o = this.oo;
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
				<div ref='img1' className='img_d_1'></div>
			</>
		);
	}
}
