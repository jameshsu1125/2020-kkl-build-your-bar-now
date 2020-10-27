import React from 'react';
import $ from 'jquery';

import { UGC_share } from './../../Component/_config';
import { share } from 'SOCIAL/Facebook';
import Hash from 'UNIT/Get';

export default class canvas extends React.Component {
	constructor(props) {
		super(props);
		const root = this;

		this.tr = {
			data: root.props.data,
			wording: root.props.wording,
			headline: root.props.headline,
			bottle: root.props.bottle,
			init() {
				this.c = root.refs.canvas;
				this.ctx = this.c.getContext('2d');
				this.draw();
				this.debug();
				this.name = '你最熱門的酒款：' + this.bottle.name;
			},
			debug() {
				this.x = 811;
				this.y = 221;
				this.z = 10;

				$(window).keydown((e) => {
					switch (e.keyCode) {
						case 37:
							//r
							this.x--;
							this.z--;
							break;
						case 38:
							//t
							this.y--;
							break;
						case 39:
							//l
							this.x++;
							this.z++;
							break;
						case 40:
							//d
							this.y++;
							break;
					}
					console.log(this.x + ', ' + this.y, this.z);
					this.draw();
				});
			},
			draw() {
				let cover = new Image(),
					bg = new Image(),
					logo = new Image(),
					frame = new Image(),
					crow = new Image(),
					bottle = new Image(),
					effect = new Image(),
					coord = 910;
				this.ctx.clearRect(0, 0, this.c.width, this.c.height);
				cover.onload = () => {
					let gw = (cover.width - 670) / 2;
					let x = 0 - gw;
					this.ctx.drawImage(cover, x, 0, 670 + gw, 630);

					logo.src = require('./../../Component/logo/img/logo.png');
				};
				cover.src = require(`./img/c${this.data[0]}.jpg`);

				bg.onload = () => {
					let p = this.ctx.createPattern(bg, 'repeat');
					this.ctx.fillStyle = p;
					this.ctx.fillRect(670, 0, 1200 - 670, 630);

					frame.src = require('./img/frame_canvas.png');
				};
				bg.src = require('./img/bg.jpg');

				logo.onload = () => {
					let s = 0.8;
					this.ctx.drawImage(logo, 30, 30, logo.width * s, logo.height * s);
				};

				frame.onload = () => {
					this.ctx.drawImage(frame, 670 + 20, 0);

					this.ctx.font = '40px Hiragino Mincho ProN, PMingLiU, 新細明體';
					this.ctx.fillStyle = '#2f0f0f';
					this.ctx.fillText(this.headline[this.data[0]] + ' 酒館', 670 + 138, 80);

					this.ctx.font = '23px PingFangSC-Light';
					this.ctx.fillStyle = '#d1ad5a';
					this.ctx.fillText('恭喜你的金酒世界酒館開幕了！', 786, 145);
					this.ctx.fillText(
						`${this.wording[this.data[2]]},還不快邀請朋友`,
						737,
						185
					);
					this.ctx.fillText('來你的酒館小酌一番。', 820, 226);

					let y = 565;

					let x = coord - this.name.length * 19 * 0.5;
					let w = this.name.length * 23;
					this.ctx.fillText(this.name, x, y);

					this.ctx.beginPath();
					this.ctx.strokeStyle = '#d1ad5a';
					this.ctx.lineWidth = 2;
					this.ctx.moveTo(x, y - 31);
					this.ctx.lineTo(x + w, y - 31);
					this.ctx.moveTo(x, y + 17);
					this.ctx.lineTo(x + w, y + 17);

					this.ctx.stroke();

					crow.src = require('./img/crow.png');
					effect.src = require('./img/sl.png');
				};

				effect.onload = () => {
					let s = 0.8;
					this.ctx.drawImage(effect, 846, 211, effect.width * s, effect.height * s);

					bottle.src = this.bottle.img;
				};

				bottle.onload = () => {
					let s = 0.8,
						ly = bottle.height * (1 - s),
						lx = bottle.width * (1 - s);
					this.ctx.drawImage(
						bottle,
						this.x + lx,
						this.y + ly,
						bottle.width * s,
						bottle.height * s
					);
				};

				crow.onload = () => {
					let s = 0.8;
					this.ctx.drawImage(crow, 893, 250, crow.width * s, crow.height * s);
				};
			},
		};
	}

	componentDidMount() {
		this.tr.init();
	}

	share() {
		let base64 = this.refs.canvas.toDataURL('image/jpg', 1.0).split('base64,')[1];
		UGC_share.update(base64).then((e) => {
			let u = e.share_url,
				uid = e.share_id;
			if (u) {
				let dat = [...this.tr.data, uid],
					get = btoa(dat),
					rul = Hash.root() + `signin.html?dat=${get}}`;
				share({ id: '417583752566301', url: u, redirect_uri: rul });
			}
		});
	}

	render() {
		return <canvas ref='canvas' width='1200' height='630'></canvas>;
	}
}
