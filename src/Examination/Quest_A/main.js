import React from 'react';
import './main.less';

import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

import { Loader, lastComponent } from './../../Component/_config';

export default class main extends React.Component {
	constructor(props) {
		super(props);
		const root = this;

		this.tr = {
			mx: 0,
			is: true,
			offsetX: 50,
			isPress: false,
			init: function () {
				this.head.init();
				this.headline.init();
				this.headtxt.init();
				this.q1.init();
				this.q2.init();
				this.q3.init();
				this.q4.init();
				this.imgs.init();
				this.arl.init();
				this.arr.init();
				this.sider.init();
			},
			in: function () {
				root.refs.main.style.display = 'block';
				this.head.in();
				this.headline.in();
				this.headtxt.in();
				this.q1.in();
				this.q2.in();
				this.q3.in();
				this.q4.in();
				this.imgs.in();
			},
			out: function (cb) {
				$(root.refs.main).animate({ opacity: 0 }, 500, 'easeOutQuart', () => {
					cb();
				});
			},
			evt: function () {
				this.touchMove = (e) => {
					if (e.cancelable) if (!e.defaultPrevented) e.preventDefault();
					if (!this.is) return;
					if (!this.isPress) return;
					let x = e.clientX || e.targetTouches[0].clientX;
					let dx = this.mx - x;
					if (dx > this.offsetX) {
						this.is = true;
						this.switcher.next();
					} else if (dx < 0 - this.offsetX) {
						this.is = true;
						this.switcher.prev();
					}
				};
				this.mouseup = () => {
					this.isPress = false;
				};
				root.props.TouchEvent.add('q1', () => {
					this.switcher.switch(1);
				});
				root.props.TouchEvent.add('q2', () => {
					this.switcher.switch(2);
				});
				root.props.TouchEvent.add('q3', () => {
					this.switcher.switch(3);
				});
				root.props.TouchEvent.add('q4', () => {
					this.switcher.switch(4);
				});
				root.props.TouchEvent.add('q4', () => {
					this.switcher.switch(4);
				});
				root.props.TouchEvent.add('arr', () => {
					this.switcher.next();
				});
				root.props.TouchEvent.add('arl', () => {
					this.switcher.prev();
				});
				root.props.TouchEvent.add('touch', (e) => {
					this.isPress = true;
					this.mx = e.clientX || e.targetTouches[0].clientX;
				});
				root.refs.touch.addEventListener('touchmove', this.touchMove, {
					passive: false,
					capture: false,
				});
				document.addEventListener('touchend', this.mouseup);
				root.refs.touch.addEventListener('mousemove', this.touchMove);
				document.addEventListener('mouseup', this.mouseup);
			},
			autoPlay() {
				let gap = 2000;
				let n = 0;
				for (var i = 0; i < 5; i++) {
					setTimeout(() => {
						n++;
						this.switcher.switch(n == 5 ? false : n);
					}, gap * i);
				}
			},
			arl: {
				o: 0,
				time: 500,
				init() {
					this.c = $(root.refs.arl);
					this.tran();
				},
				in() {
					$(this).animate(
						{ o: 1 },
						{
							duration: this.time,
							step: () => this.tran(),
							complete: () => this.tran(),
							easing: 'easeOutQuart',
						}
					);
				},
				tran() {
					this.c.css({
						opacity: this.o,
					});
				},
			},
			arr: {
				o: 0,
				time: 500,
				init() {
					this.c = $(root.refs.arr);
					this.tran();
				},
				in() {
					$(this).animate(
						{ o: 1 },
						{
							duration: this.time,
							step: () => this.tran(),
							complete: () => this.tran(),
							easing: 'easeOutQuart',
						}
					);
				},
				tran() {
					this.c.css({
						opacity: this.o,
					});
				},
			},
			switcher: {
				index: 0,
				switch(v) {
					if (!root.tr.sider.is) return;
					for (var i = 1; i <= 4; i++) root.tr['q' + i].c.removeClass('on');
					if (v === false) {
						this.index = 1;
						root.tr.sider.ready();
						root.tr.q1.c.addClass('on');
					} else {
						this.index = v;
						let index = this.index;
						if (v == 5) index = 1;
						else if (v == 0) index = 4;
						root.tr['q' + index].c.addClass('on');
						root.tr.sider.moveTo(v);
					}
				},
				next: function () {
					if (!root.tr.sider.is) return;
					let index = this.index + 1;
					this.switch(index);
				},
				prev: function () {
					if (!root.tr.sider.is) return;
					let index = this.index - 1;
					this.switch(index);
				},
			},
			sider: {
				time: 1000,
				l: 0,
				is: true,
				init() {
					this.c = $(root.refs.imgc);
				},
				moveTo(v) {
					if (!this.is) return;
					this.is = false;
					this.index = v;
					$(this).stop();
					$(this).clearQueue();
					$(this).animate(
						{ l: 0 - v * 768 },
						{
							duration: this.time,
							step: () => this.tran(),
							complete: () => {
								this.tran();
								this.sync();
								this.is = true;
							},
							easing: 'easeOutQuart',
						}
					);
				},
				sync() {
					if (root.tr.switcher.index == 5) {
						root.tr.switcher.index = 1;
						this.l = 0 - root.tr.switcher.index * 768;
						this.tran();
					} else if (root.tr.switcher.index == 0) {
						root.tr.switcher.index = 4;
						this.l = 0 - root.tr.switcher.index * 768;
						this.tran();
					}
				},
				tran() {
					this.c.css('left', this.l + 'px');
				},
				ready() {
					var c = $(this.c.children('div')[0]);
					c.css('opacity', 1);
					this.moveTo(1);
					root.tr.arr.in();
					root.tr.arl.in();
					root.tr.evt();
					root.props.ready();
				},
			},
			imgs: {
				o: 1,
				delay: 2000,
				time: 1000,
				init() {
					this.c = $(root.refs.img);
					this.tran();
				},
				in() {
					$(this)
						.delay(this.delay)
						.animate(
							{ o: 1 },
							{
								duration: this.time,
								step: () => this.tran(),
								complete: () => {
									this.tran();
								},
								easing: 'easeOutQuart',
							}
						);
				},
				tran() {
					this.c.css('opacity', this.o);
				},
			},
			q4: {
				o: 0,
				delay: 3600,
				time: 1000,
				init() {
					this.c = $(root.refs.q4);
					this.tran();
				},
				in() {
					$(this)
						.delay(this.delay)
						.queue(function () {
							this.c.css('display', 'block');
							$(this).dequeue();
						})
						.animate(
							{ o: 1 },
							{
								duration: this.time,
								step: () => this.tran(),
								complete: () => {
									this.tran();
									//
								},
								easing: 'easeOutQuart',
							}
						);
				},
				tran() {
					this.c.css('opacity', this.o);
				},
			},
			q3: {
				o: 0,
				delay: 3400,
				time: 1000,
				init() {
					this.c = $(root.refs.q3);
					this.tran();
				},
				in() {
					$(this)
						.delay(this.delay)
						.queue(function () {
							this.c.css('display', 'block');
							$(this).dequeue();
						})
						.animate(
							{ o: 1 },
							{
								duration: this.time,
								step: () => this.tran(),
								complete: () => {
									this.tran();

									//
								},
								easing: 'easeOutQuart',
							}
						);
				},
				tran() {
					this.c.css('opacity', this.o);
				},
			},
			q2: {
				o: 0,
				delay: 3200,
				time: 1000,
				init() {
					this.c = $(root.refs.q2);
					this.tran();
				},
				in() {
					$(this)
						.delay(this.delay)
						.queue(function () {
							this.c.css('display', 'block');
							$(this).dequeue();
						})
						.animate(
							{ o: 1 },
							{
								duration: this.time,
								step: () => this.tran(),
								complete: () => this.tran(),
								easing: 'easeOutQuart',
							}
						);
				},
				tran() {
					this.c.css('opacity', this.o);
				},
			},
			q1: {
				o: 0,
				delay: 3000,
				time: 1000,
				init() {
					this.c = $(root.refs.q1);
					this.tran();
				},
				in() {
					$(this)
						.delay(this.delay)
						.queue(function () {
							this.c.css('display', 'block');
							$(this).dequeue();
						})
						.animate(
							{ o: 1 },
							{
								duration: this.time,
								step: () => this.tran(),
								complete: () => {
									this.tran();
									root.tr.autoPlay();
								},
								easing: 'easeOutQuart',
							}
						);
				},
				tran() {
					this.c.css('opacity', this.o);
				},
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
								complete: () => this.tran(),
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
		};
	}

	componentWillUnmount() {
		this.props.TouchEvent.remove('q1');
		this.props.TouchEvent.remove('q2');
		this.props.TouchEvent.remove('q3');
		this.props.TouchEvent.remove('q4');
		this.props.TouchEvent.remove('arr');
		this.props.TouchEvent.remove('arl');
		this.props.TouchEvent.remove('touch');
		this.refs.touch.removeEventListener('touchmove', this.tr.touchMove);
		this.refs.touch.removeEventListener('mousemove', this.tr.touchMove);
		document.removeEventListener('mouseup', this.tr.mouseup);
		document.removeEventListener('touchend', this.tr.mouseup);
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
	}
	out(cb) {
		this.tr.out(cb);
	}

	getSelect() {
		let index = this.tr.switcher.index;
		if (index == 5) index = 1;
		else if (index == 0) index = 4;
		return index - 1;
	}

	render() {
		return (
			<div ref='main' id='question' class='q-a'>
				<div ref='head' className='headline'>
					<div ref='headlight' className='bg'></div>
					<div ref='headtxt' className='txt'>
						哪一句話最靠近你的選物風格？
					</div>
				</div>
				<div id='q1' ref='q1' className='btn row-a'>
					我不跟誰走
					<br />
					我帶動潮流
				</div>
				<div id='q2' ref='q2' className='btn row-b'>
					我不是老派
					<br />
					我愛好經典
				</div>
				<div id='q3' ref='q3' className='btn row-c'>
					非典型都會人
					<br />
					我與自然共存
				</div>
				<div id='q4' ref='q4' className='btn row-d'>
					不好奢華享樂
					<br />
					我執簡約樸實
				</div>
				<div ref='img' className='image'>
					<div ref='imgc' className='img-c'>
						<div className='img_dc'></div>
						<div className='img_a'></div>
						<div className='img_b'></div>
						<div className='img_c'></div>
						<div className='img_d'></div>
						<div className='img_ac'></div>
					</div>
					<div ref='touch' id='touch' className='touch'></div>
					<div id='arl' ref='arl' className='arr l'></div>
					<div id='arr' ref='arr' className='arr r'></div>
				</div>
			</div>
		);
	}
}
