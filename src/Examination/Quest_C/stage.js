import React from 'react';
import $ from 'jquery';
require('jquery-easing');

export default class stage extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		//script
		this.tr = {
			time: 1000,

			init() {
				this.c = $(root.refs.photo).parent();
				this.x = parseInt(this.c.css('left'));
				this.r = 0;
				this.s = 1;
				this.y = 0;
				this.o = 1;
				this.index = 1;
			},
			moveTo(i) {
				let p = this.getCss(i);
				$(this).animate(p, {
					duration: this.time,
					step: () => this.tran(),
					complete: () => this.tran(),
					easing: 'easeOutQuart',
				});
			},
			tran() {
				this.c.css({
					transform: `rotate(${this.r}deg) scale(${this.s})`,
					'-webkit-transform': `rotate(${this.r}deg) scale(${this.s})`,
					'-moz-transform': `rotate(${this.r}deg) scale(${this.s})`,
					'-o-transform': `rotate(${this.r}deg) scale(${this.s})`,
					'-ms-transform': `rotate(${this.r}deg) scale(${this.s})`,
					'z-index': Math.round(this.index),
					left: this.x,
					top: this.y,
					opacity: this.o,
					// filter: `brightness(${this.o})`,
					// '-webkit-filter': `brightness(${this.o})`,
					// '-moz-filter': `brightness(${this.o})`,
				});
			},
			getCss(i) {
				switch (i) {
					case 0:
						return { x: 0, y: 0, s: 1, r: 1, index: 3, o: 1 };
					case -1:
						return { x: 215, y: 0, s: 0.75, r: -21, index: 2, o: 0.7 };
					case -2:
						return { x: 475, y: -100, s: 0.55, r: -21, index: 1, o: 0.7 };
					case 1:
						return { x: -207, y: 0, s: 0.75, r: 21, index: 2, o: 0.4 };
					case 2:
						return { x: -456, y: -100, s: 0.55, r: 21, index: 1, o: 0.4 };
					default:
						return { x: -456, y: -100, s: 0.55, r: 21, index: 1, o: 0.4 };
				}
			},
		};
	}

	componentDidMount() {
		this.tr.init();
	}

	componentDidUpdate() {
		//script
	}

	componentWillUnmount() {
		//script
	}

	moveTo(i) {
		let index = i;
		if (i == 3) index = -1;
		else if (i == -3) index = 1;
		this.tr.moveTo(index);
	}

	render() {
		return (
			<>
				<div ref='photo' className='photo'></div>
				<div className='frame'></div>
			</>
		);
	}
}
