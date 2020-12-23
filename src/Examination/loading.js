import React from 'react';
import './loading.less';
import $ from 'jquery';
import swal from 'sweetalert';
require('jquery-easing');
require('jquery.waitforimages');

export default class loading extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.confirm = { loaded: false, alert: false };
		this.tr = {
			t: -50,
			o: 0,
			time: 1000,
			init: function () {
				this.c = $(root.refs.main);
				this.tran();
				this.canvas.init();
				this.text.init();
			},
			in: function () {
				$(this).animate(
					{ t: 0, o: 1 },
					{
						duration: this.time,
						step: () => this.tran(),
						complete: () => {
							this.tran();
							root.props.ready();
							setTimeout(() => {
								swal({
									title: '得獎名單已經出爐了! 點擊 [OK] 看更多資訊。',
									buttons: {
										cancel: true,
										confirm: true,
									},
								}).then((e) => {
									if (e) {
										window.location.href = './award.html';
									} else {
										root.confirm.alert = true;
										this.checkRemind();
									}
								});
							}, 500);
						},
						easing: 'easeOutBack',
					}
				);

				this.canvas.in();
				this.text.in();
			},
			checkRemind() {
				if (root.confirm.alert && root.confirm.loaded) this.out();
			},
			out: function () {
				$(this).animate(
					{ t: -50, o: 0 },
					{
						duration: this.time,
						step: () => this.tran(),
						complete: () => {
							this.tran();
							root.props.end();
						},
						easing: 'easeInBack',
					}
				);
			},
			tran: function () {
				this.c.css({
					top: this.t + 'px',
					opacity: this.o,
				});
			},
			text: {
				l: 0,
				time: 3000,
				prob: 0.95,
				init: function () {
					this.c = $(root.refs.txt);
				},
				in: function () {
					this.play();
				},
				play: function () {
					this.l = 0;
					$(this).animate(
						{
							l: 3,
						},
						{
							duration: this.time,
							step: () => this.tran(),
							complete: () => {
								this.tran();
								this.play();
							},
							easing: 'linear',
						}
					);
				},
				tran: function () {
					var t = 'loading';
					for (var i = 0; i < Math.round(this.l); i++) {
						t += '.';
					}
					this.c.text(t);

					if (Math.random() > this.prob) this.c.css('display', 'none');
					else this.c.css('display', 'block');
				},
			},
			canvas: {
				r: 0,
				time: 5000,
				offset: 30,
				prob: 0.95,
				init: function () {
					this.c = root.refs.canvas;
					this.ctx = this.c.getContext('2d');
				},
				in: function () {
					this.play();
				},
				play: function () {
					this.r = 0;
					$(this).animate(
						{
							r: 360,
						},
						{
							duration: this.time,
							step: () => this.tran(),
							complete: () => {
								this.tran();
								this.play();
							},
							easing: 'easeInOutQuad',
						}
					);
				},
				tran: function () {
					this.ctx.clearRect(0, 0, 400, 400);
					this.ctx.beginPath();
					this.ctx.strokeStyle = '#a9196a';
					this.ctx.lineWidth = 4;
					this.ctx.shadowBlur = 10;
					this.ctx.shadowColor = '#a9196a';
					this.ctx.arc(200, 200, 160, 0, 2 * Math.PI);
					this.ctx.stroke();

					this.ctx.beginPath();
					this.ctx.strokeStyle = '#edcae8';
					this.ctx.lineWidth = 2;
					this.ctx.arc(200, 200, 160, 0, 2 * Math.PI);
					this.ctx.stroke();

					let x = 200 + Math.cos((Math.PI / 180) * (this.r + this.offset)) * 160,
						y = 200 + Math.sin((Math.PI / 180) * (this.r + this.offset)) * 160;

					this.ctx.beginPath();
					this.ctx.shadowBlur = 10;
					this.ctx.shadowColor = '#a9196a';
					this.ctx.arc(x, y, 10, 0, 2 * Math.PI, false);
					this.ctx.fillStyle = '#ffa2ef';
					this.ctx.fill();

					let alpha;
					if (Math.random() > this.prob) alpha = Math.random() * 0.3;
					else alpha = 0.9 + Math.random() * 0.1;

					this.c.style.opacity = alpha;
				},
				stop: function () {
					$(this).clearQueue();
					$(this).stop();
				},
			},
		};
	}

	out() {
		//this.tr.out();
		this.confirm.loaded = true;
		this.tr.checkRemind();
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
		this.tr.canvas.stop();
	}

	render() {
		return (
			<div ref='main' id='loading'>
				<canvas ref='canvas' width='400' height='400' />
				<div ref='txt' class='txt'>
					loading...
				</div>
			</div>
		);
	}
}
