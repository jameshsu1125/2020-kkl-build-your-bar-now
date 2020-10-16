import React from 'react';
import './sign.less';

import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

export default class sign extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.tr = {
			init: function () {
				this.light.init();
			},
			in: function () {
				$(root.refs.sign)
					.delay(200)
					.animate({ opacity: 1 }, 500, 'easeOutQuart', () => {
						this.light.in();
					});
			},
			out: function () {
				this.light.destory();
				$(root.refs.sign)
					.animate({ opacity: 0.1 }, 500, 'easeOutQuart')
					.delay(500)
					.animate({ opacity: 0 }, 500, 'easeOutQuart', () => {
						window.location.href = './examination.html';
					});
			},
			destory: function () {
				this.light.destory();
			},
			upper: function () {
				$(root.refs.sign).animate({ 'margin-top': '-40px' }, 1000, 'easeOutQuart', () => {
					this.light.loop();
				});
			},
			light: {
				o: 0,
				prob: 0.9,
				time: 50,
				init: function () {
					this.c = $(root.refs.light);
					this.tran();
				},
				tran: function () {
					this.c.css({ opacity: this.o });
				},
				in: function () {
					let darker = 0.3,
						brighter = 1,
						blankTime = 20;
					$(this)
						.animate(
							{ o: brighter },
							{
								duration: 500,
								step: () => this.tran(),
								complete: () => this.tran(),
								easing: 'easeOutQuart',
							}
						)
						.animate(
							{ o: darker },
							{
								duration: blankTime,
								step: () => this.tran(),
								complete: () => this.tran(),
								easing: 'easeOutQuart',
							}
						)
						.animate(
							{ o: brighter },
							{
								duration: blankTime,
								step: () => this.tran(),
								complete: () => this.tran(),
								easing: 'easeOutQuart',
							}
						)
						.animate(
							{ o: darker },
							{
								duration: blankTime,
								step: () => this.tran(),
								complete: () => this.tran(),
								easing: 'easeOutQuart',
							}
						)
						.animate(
							{ o: brighter },
							{
								duration: blankTime,
								step: () => this.tran(),
								complete: () => this.tran(),
								easing: 'easeOutQuart',
							}
						)
						.animate(
							{ o: darker },
							{
								duration: blankTime,
								step: () => this.tran(),
								complete: () => this.tran(),
								easing: 'easeOutQuart',
							}
						)
						.animate(
							{ o: brighter },
							{
								duration: blankTime,
								step: () => this.tran(),
								complete: () => this.tran(),
								easing: 'easeOutQuart',
							}
						)
						.animate(
							{ o: 0.5 },
							{
								duration: blankTime,
								step: () => this.tran(),
								complete: () => this.tran(),
								easing: 'easeOutQuart',
							}
						)
						.delay(1000)
						.animate(
							{ o: 1 },
							{
								duration: 1000,
								step: () => this.tran(),
								complete: () => {
									this.tran();
									root.tr.upper();
									root.props.ready();
								},
								easing: 'easeInOutQuart',
							}
						);
				},
				loop: function () {
					this.frame = setInterval(() => this.play(), 30);
				},
				play: function () {
					let r = Math.random();
					if (r > this.prob) this.fade(0.5);
					else this.fade(0.9 + Math.random() * 0.1);
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
				destory: function () {
					clearInterval(this.frame);
				},
			},
		};
	}

	out() {
		this.tr.out();
	}

	componentDidMount() {
		this.tr.init();
		$(this.refs.main).waitForImages({
			finished: () => this.tr.in(),
			each: (e) => {},
			waitForAll: true,
		});
	}

	componentWillUnmount() {
		this.tr.destory();
	}

	render() {
		return (
			<div id='sign'>
				<div ref='sign' ref='sign' className='sign'>
					<div ref='light' className='l'></div>
				</div>
			</div>
		);
	}
}
