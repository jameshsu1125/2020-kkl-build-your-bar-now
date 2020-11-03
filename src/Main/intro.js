import React from 'react';
import './intro.less';

import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

import { gtag_pv, gtag_event } from 'SOCIAL/Gtag';

export default class intro extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.tr = {
			init: function () {
				this.txt = $(root.refs.txt);
				this.txt.css('line-height', '100em');
				this.btn.init();
				this.arr0.init();
				this.arr1.init();
			},
			in: function () {
				this.arr0.in();
				this.arr1.in();
				$(root.refs.txt).animate({ 'line-height': '1.7em' }, 1000, 'easeOutExpo', () => {
					this.btn.in();
				});
			},
			out: function () {
				root.props.enter();
			},
			destory: function () {
				this.btn.destory();
				this.arr0.destory();
				this.arr1.destory();
			},
			arr0: {
				t: 15,
				time: 700,
				delay: 1,
				init: function () {
					this.c = $(root.refs.arr0);
					this.tran();
				},
				in: function () {
					setTimeout(() => this.play(), this.delay);
				},
				play: function () {
					$(this)
						.animate(
							{ t: 35 },
							{
								duration: this.time,
								step: () => this.tran(),
								complete: () => this.tran(),
								easing: 'easeInOutSine',
							}
						)
						.animate(
							{ t: 15 },
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
				tran: function () {
					this.c.css('background-position-y', this.t + 'px');
				},
				destory: function () {
					$(this).clearQueue();
					$(this).stop();
				},
			},
			arr1: {
				t: 0,
				time: 700,
				delay: 120,
				init: function () {
					this.c = $(root.refs.arr1);
					this.tran();
				},
				in: function () {
					setTimeout(() => this.play(), this.delay);
				},
				play: function () {
					$(this)
						.animate(
							{ t: 20 },
							{
								duration: this.time,
								step: () => this.tran(),
								complete: () => this.tran(),
								easing: 'easeInOutSine',
							}
						)
						.animate(
							{ t: 0 },
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
				tran: function () {
					this.c.css('background-position-y', this.t + 'px');
				},
				destory: function () {
					$(this).clearQueue();
					$(this).stop();
				},
			},
			btn: {
				x: 0,
				time: 500,
				init: function () {
					this.c = $(root.refs.btn);
					this.outline.init();
					this.inline.init();
					this.text.init();
					this.evt();
				},
				in: function () {
					this.outline.in();
					this.inline.in();
					this.text.in();
				},
				destory: function () {
					this.text.destory();
					this.outline.destory();
					this.inline.destory();
				},
				evt: function () {
					this.c.mouseover(() => this.mouseover());
					this.c.mouseout(() => this.mouseout());
					root.props.TouchEvent.add('intro_btn', () => {
						root.tr.out();
						gtag_event('首頁', '立即開店');
					});
				},
				mouseout: function () {
					$(this).clearQueue();
					$(this).stop();
					$(this).animate(
						{ x: 0 },
						{
							duration: this.time,
							step: () => this.tran(),
							complete: () => this.tran(),
							easing: 'easeOutQuart',
						}
					);
				},
				mouseover: function () {
					$(this).clearQueue();
					$(this).stop();
					$(this).animate(
						{ x: 40 },
						{
							duration: this.time,
							step: () => this.tran(),
							complete: () => this.tran(),
							easing: 'easeOutBounce',
						}
					);
				},
				tran: function () {
					this.c.css('margin-left', this.x + 'px');
				},
				text: {
					color: parseInt('33', 16),
					time: 50,
					init: function () {
						this.c = $(root.refs.t);
						this.tran();
					},
					in: function () {
						this.frame = setInterval(() => this.play(), 100);
					},
					play: function () {
						let o = root.tr.btn.outline.o;
						let i = root.tr.btn.inline.o;
						let l = (o + i) / 2;
						this.fade(l);
					},
					fade: function (v) {
						let t = parseInt('ff', 16);
						let c = v * t + 50;
						c = c > 255 ? 255 : c;
						this.color = Math.floor(c);
						this.tran();
					},
					tran: function () {
						var hex = '';
						for (var i = 0; i < 3; i++) {
							hex += this.color.toString(16);
						}
						this.c.css('background-color', '#' + hex);
					},
					destory: function () {
						clearInterval(this.frame);
					},
				},
				outline: {
					o: 0.3,
					time: 50,
					prob: 0.9,
					init: function () {
						this.c = $(root.refs.o);
						this.tran();
					},
					in: function () {
						this.frame = setInterval(() => this.play(), 100);
					},
					play: function () {
						let r = Math.random();
						if (r > this.prob) this.fade(1 - r);
						else this.fade(0.7 + Math.random() * 0.1);
					},
					fade: function (v) {
						$(this).animate(
							{ o: v },
							{
								duration: this.time,
								step: () => this.tran(),
								complete: () => this.tran(),
								easing: 'easeOutQuart',
							}
						);
					},
					tran: function (v) {
						if (v) this.o = v;
						this.c.css('opacity', this.o);
					},
					destory: function () {
						clearInterval(this.frame);
					},
				},
				inline: {
					o: 0.3,
					time: 50,
					prob: 0.93,
					init: function () {
						this.c = $(root.refs.i);
						this.tran();
					},
					in: function () {
						this.frame = setInterval(() => this.play(), 100);
					},
					play: function () {
						let r = Math.random();
						if (r > this.prob) this.fade(1 - r);
						else this.fade(0.7 + Math.random() * 0.1);
					},
					fade: function (v) {
						$(this).animate(
							{ o: v },
							{
								duration: this.time,
								step: () => this.tran(),
								complete: () => this.tran(),
								easing: 'easeOutQuart',
							}
						);
					},
					tran: function (v) {
						if (v) this.o = v;
						this.c.css('opacity', this.o);
					},
					destory: function () {
						clearInterval(this.frame);
					},
				},
			},
		};
	}

	in() {
		this.tr.in();
	}

	componentDidMount() {
		this.tr.init();
		$(this.refs.main).waitForImages({
			finished: () => {},
			each: () => {},
			waitForAll: true,
		});
	}

	componentWillUnmount() {
		this.tr.destory();
	}

	render() {
		return (
			<div ref='main' id='intro'>
				<div ref='txt' className='txt'>
					歡迎您進入金酒新4界
					<br />
					您將成為金酒世界酒館CEO
					<br />
					立刻點擊
					<br />
					打造屬於自己的本命酒館
					<br />
					<div className='arr'>
						<div ref='arr0' class='ar'></div>
						<div ref='arr1' class='ar'></div>
					</div>
					<br />
					<div ref='btn' className='btn'>
						<div ref='o' className='o'></div>
						<div ref='i' className='i'></div>
						<div ref='t' className='t'></div>
						<div id='intro_btn' class='touch'></div>
					</div>
					<br />
					<span>
						分享酒館再抽
						<br />
						《金酒的世界餐桌 雙人行》
					</span>
				</div>
			</div>
		);
	}
}
