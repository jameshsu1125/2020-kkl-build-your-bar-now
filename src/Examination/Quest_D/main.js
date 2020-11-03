import React from 'react';
import './main.less';

import Scene from './scene';
import Btns from './btns';
import { Loader, lastComponent } from './../../Component/_config';
import { gtag_pv } from 'SOCIAL/Gtag';

import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

export default class main extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.tr = {
			init: function () {
				this.head.init();
				this.headline.init();
				this.headtxt.init();
				this.slider.init();
			},
			in: function () {
				root.refs.main.style.display = 'block';
				this.head.in();
				this.headline.in();
				this.headtxt.in();
			},
			out: function (cb) {
				$(root.refs.main).animate({ opacity: 0 }, 500, 'easeOutQuart', () => {
					cb();
				});
			},
			head: {
				y: -240,
				time: 1000,
				init() {
					this.c = $(root.refs.head);
					this.tran();
				},
				in() {
					$(this)
						.delay(2000)
						.animate(
							{ y: -440 },
							{
								duration: this.time,
								step: () => this.tran(),
								complete: () => {
									this.tran();
									root.refs.btns.in();
								},
								easing: 'easeOutQuart',
							}
						);
				},
				tran() {
					this.c.css({
						'margin-top': this.y + 'px',
					});
				},
			},
			headtxt: {
				o: 0,
				time: 1000,
				init() {
					this.c = $(root.refs.headtxt);
					this.tran();
				},
				in() {
					this.moveTo(0.5, 1000);
					this.moveTo(0.2, 30);
					this.moveTo(1, 30);
					this.moveTo(0.2, 30);
					this.moveTo(1, 30);
					this.moveTo(0.2, 30);
					this.moveTo(1, 30);
					this.moveTo(0.2, 30);
					this.moveTo(1, 1000);
				},
				moveTo(to, time, cb) {
					let p = {
						duration: time,
						step: () => this.tran(),
						easing: 'easeOutQuart',
						complete: () => {
							this.tran();
							if (cb) cb();
						},
					};
					$(this).animate({ o: to }, p);
				},
				tran() {
					this.c.css({
						opacity: this.o,
					});
				},
			},
			headline: {
				o: 0,
				time: 1000,
				prob: 0.95,
				init() {
					this.c = $(root.refs.headlight);
					this.tran();
				},
				in() {
					this.moveTo(0.3, 1000);
					this.moveTo(0.2, 30);
					this.moveTo(1, 30);
					this.moveTo(0.2, 30);
					this.moveTo(1, 30);
					this.moveTo(0.2, 30);
					this.moveTo(1, 30);
					this.moveTo(0.2, 30);
					this.moveTo(1, 1000, () => this.play());
				},
				moveTo(to, time, cb) {
					let p = {
						duration: time,
						step: () => this.tran(),
						easing: 'easeOutQuart',
						complete: () => {
							this.tran();
							if (cb) cb();
						},
					};
					$(this).animate({ o: to }, p);
				},
				play() {
					this.frame = setInterval(() => this.blank(), 30);
				},
				blank() {
					if (Math.random() > this.prob) this.o = 0.1;
					else this.o = 1;
					this.tran();
				},
				tran() {
					this.c.css({
						opacity: this.o,
					});
				},
			},
			slider: {
				init() {
					this.btns = root.refs.btns;
					this.scene = root.refs.scene;
				},
				to(v) {
					if (v === undefined) {
						this.btns.goto(1);
					} else {
						if (this.scene.is()) {
							this.btns.goto(v);
							this.scene.goto(v);
						}
					}
				},
			},
		};
	}

	componentDidMount() {
		this.tr.init();
		var p = {
			each: (e) => this.props.each(e),
			waitForAll: true,
		};
		if (lastComponent == this.props.question) p.finished = () => Loader.onend();
		else p.finished = this.props.loaded(this.props.question);
		$(this.refs.main).waitForImages(p);
	}

	in() {
		this.tr.in();
		gtag_pv('你最喜歡吃的料理風格為?');
	}

	out(cb) {
		this.tr.out(cb);
	}

	getSelect() {
		let index = this.refs.btns.getIndex();
		if (index == 5) index = 1;
		else if (index == 0) index = 4;
		return index - 1;
	}

	btns_click(id) {
		this.tr.slider.to(parseInt(id.slice(1)));
	}

	btns_ready() {
		this.tr.slider.to();
		this.refs.scene.in();
		if (this.props.ready) this.props.ready();
		else this.props.ined();
	}

	scene_next() {
		this.refs.btns.next();
	}

	scene_prev() {
		this.refs.btns.prev();
	}

	render() {
		return (
			<div ref='main' id='question' class='q-d'>
				<div ref='head' className='headline'>
					<div ref='headlight' className='bg'></div>
					<div ref='headtxt' className='txt'>
						你最喜歡吃的料理風格為?
					</div>
				</div>
				<Btns ref='btns' TouchEvent={this.props.TouchEvent} click={this.btns_click.bind(this)} ready={this.btns_ready.bind(this)} />
				<Scene ref='scene' TouchEvent={this.props.TouchEvent} prev={this.scene_prev.bind(this)} next={this.scene_next.bind(this)} />
			</div>
		);
	}
}
