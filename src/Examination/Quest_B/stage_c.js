import React from 'react';
import $ from 'jquery';
require('jquery-easing');

export default class stage_c extends React.Component {
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
				init() {
					this.c = $(root.refs.img1);
					this.o = this.oo = parseInt(this.c.css('opacity'));
				},
				play() {
					$(this)
						.animate(
							{ o: 0.5 },
							{
								duration: this.time,
								step: () => this.tran(),
								complete: () => this.tran(),
								easing: 'easeInOutSine',
							}
						)
						.animate(
							{ o: this.oo },
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
						opacity: this.o,
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
				<div className='img_c_0'></div>
				<div ref='img1' className='img_c_1'></div>
			</>
		);
	}
}
