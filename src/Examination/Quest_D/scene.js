import React from 'react';
import $ from 'jquery';
require('jquery-easing');

import Stage from './../Quest_C/stage';

export default class scene extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.tr = {
			touchs: { mx: 0, offset: 50 },
			init() {
				this.img.init();
			},
			in() {
				this.img.in();
			},
			goto(v) {
				this.img.goto(v);
			},
			next() {
				if (!this.img.is) return;
				this.img.is = false;
				this.img.next();
				root.props.next();
			},
			prev() {
				if (!this.img.is) return;
				this.img.is = false;
				this.img.prev();
				root.props.prev();
			},
			evt() {
				this.touchMove = (e) => {
					if (e.cancelable) if (!e.defaultPrevented) e.preventDefault();
					if (!this.touchs.is) return;
					let x = e.clientX || e.targetTouches[0].clientX;
					let dx = this.touchs.mx - x;
					if (dx > this.touchs.offset) {
						this.touchs.is = false;
						this.next();
					} else if (dx < 0 - this.touchs.offset) {
						this.touchs.is = false;
						this.prev();
					}
				};
				this.mouseup = () => {
					this.isPress = false;
				};

				root.props.TouchEvent.add('touch', (e) => {
					this.touchs.mx = e.clientX || e.targetTouches[0].clientX;
					this.touchs.is = true;
				});
				root.refs.touch.addEventListener('touchmove', this.touchMove, {
					passive: false,
					capture: false,
				});
				root.refs.touch.addEventListener('mousemove', this.touchMove);

				document.addEventListener('touchend', this.mouseup);
				document.addEventListener('mouseup', this.mouseup);
			},
			img: {
				time: 1000,
				index: 0,
				is: true,
				init() {
					this.c = $(root.refs.imgc);
				},
				goto(v) {
					if (!this.is) return;
					this.is = false;
					this.index = v;
					this.moveTo();
				},
				prev() {
					this.index--;
					this.moveTo();
				},
				next() {
					this.index++;
					this.moveTo();
				},
				in() {
					this.index = 1;
					this.moveTo(true);
				},
				moveTo(is) {
					if (this.index > 4) this.index = 1;
					else if (this.index < 1) this.index = 4;
					this.playScene();
					setTimeout(() => {
						this.is = true;
						if (is) this.ined();
					}, 1000);
				},
				playScene() {
					let stage = [false, 'stage_a', 'stage_b', 'stage_c', 'stage_d'];
					for (var i in stage) {
						if (stage[i]) {
							root.refs[stage[i]].moveTo(this.index - i);
						}
					}
				},
				ined() {
					root.tr.evt();
				},
			},
		};
	}

	componentDidMount() {
		this.tr.init();
	}

	componentWillUnmount() {
		this.props.TouchEvent.remove('touch');
		document.removeEventListener('mouseup', this.tr.mouseup);
		document.removeEventListener('touchend', this.tr.mouseup);
		this.refs.touch.removeEventListener('touchmove', this.tr.touchMove);
		this.refs.touch.removeEventListener('mousemove', this.tr.touchMove);
	}

	goto(v) {
		this.tr.goto(v);
	}

	in() {
		this.tr.in();
	}

	is() {
		return this.tr.img.is;
	}

	render() {
		return (
			<div ref='img' className='image'>
				<div ref='imgc' className='img-c'>
					<div className='img_a'>
						<Stage ref='stage_a' />
					</div>
					<div className='img_b'>
						<Stage ref='stage_b' />
					</div>
					<div className='img_c'>
						<Stage ref='stage_c' />
					</div>
					<div className='img_d'>
						<Stage ref='stage_d' />
					</div>
				</div>
				<div ref='touch' id='touch' className='touch'></div>
			</div>
		);
	}
}
