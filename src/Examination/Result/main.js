import React from 'react';
import './main.less';
import Bar from './bar';
import Loading from 'UI/Loading';
import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

import Canvas from './canvas';
import { gtag_pv, gtag_event } from 'SOCIAL/Gtag';

export default class result extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.state = { loading: false };
		this.headline = ['暮色潮間', '金夜風華', '草木森活', '日間工寓'];
		this.wording = ['珍惜每個美好當下的你', '喜歡私房小酌的你', '在江湖走跳的你', '喜歡跟親友交心的你'];
		this.imgs = [
			[
				{ img: require('./img/bottle/A0.png'), name: '38度金門高粱酒' },
				{ img: require('./img/bottle/A1.png'), name: '58度金門高粱酒' },
				{ img: require('./img/bottle/A2.png'), name: '罈裝金門高粱酒' },
			],
			[
				{ img: require('./img/bottle/B0.png'), name: '金酒典藏珍品' },
				{ img: require('./img/bottle/B1.png'), name: '陳年金門高粱酒' },
			],
			[
				{ img: require('./img/bottle/C0.png'), name: '戰酒黑金龍' },
				{ img: require('./img/bottle/C1.png'), name: '罈裝金門大高酒' },
			],
			[
				{ img: require('./img/bottle/D0.png'), name: '金門高粱酒 原釀21' },
				{ img: require('./img/bottle/D1.png'), name: '特優金門高粱酒' },
			],
		];
		let d = this.imgs[this.props.data[1]],
			r = Math.floor(Math.random() * d.length);

		this.bottle = d[r];

		this.tr = {
			init() {
				this.frame.init();
			},
			in() {
				$(root.refs.main).animate({ opacity: 1 }, 500, 'easeOutQuart');
				root.refs.bar.in();
				this.frame.in();
			},
			evt() {
				root.props.TouchEvent.add('result_share', () => {
					root.refs.canvas.share();
					gtag_event('結果頁', '分享');
				});
				root.props.TouchEvent.add('result_replay', () => {
					setTimeout(() => {
						window.location.reload();
					}, 300);
					gtag_event('結果頁', '再開一家');
				});
				root.props.TouchEvent.add('result_info', () => {
					setTimeout(() => {
						window.location.href = './details.html';
					}, 300);
					gtag_event('結果頁', '更了解熱門酒款');
				});
			},
			frame: {
				t: -150,
				time: 800,
				delay: 0,
				o: 0,
				init() {
					this.c = $(root.refs.frame);
					this.tran();
				},
				in() {
					$(this)
						.delay(this.delay)
						.animate(
							{ t: -80, o: 1 },
							{
								duration: this.time,
								step: () => this.tran(),
								complete: () => {
									this.tran();
									root.tr.evt();
								},
								easing: 'easeOutBack',
							}
						);
				},
				tran() {
					this.c.css({
						'margin-top': this.t + 'px',
						opacity: this.o,
					});
				},
			},
		};
	}

	componentDidMount() {
		this.tr.init();
		$(this.refs.main).waitForImages({
			finished: () => this.tr.in(),
			each: (e) => {},
			waitForAll: true,
		});
		gtag_pv('結果頁');
	}

	appendLoading() {
		if (this.state.loading) return <Loading />;
	}

	addLoading() {
		this.setState({ loading: true });
	}

	removeLoading() {
		this.setState({ loading: false });
	}

	render() {
		return (
			<div ref='main' id='result'>
				<div ref='container' className='container'>
					<Bar ref='bar' data={this.props.data[0]} />
					<div ref='frame' className='frame'>
						<div className='title'>{this.headline[this.props.data[0]] + ' 酒館'}</div>
						<div className='body'>
							恭喜你的金酒世界酒館開幕了！
							<br />
							{this.wording[this.props.data[2]]}，還不快邀請朋友
							<br />
							來你的酒館小酌一番。
						</div>
						<div className='des'>
							<span>你最熱銷的酒款：{this.bottle.name}</span>
						</div>
						<div className='btns'>
							<div id='result_share' className='btn'>
								立即分享
							</div>
							<div id='result_replay' className='btn'>
								再開一家
							</div>
							<div id='result_info' className='btn'>
								更了解熱門酒款
							</div>
						</div>
						<div className='wine'>
							<div className='sl'></div>
							<div className='bottle' style={{ background: `url(${this.bottle.img})` }}></div>
						</div>
					</div>
				</div>
				<Canvas
					ref='canvas'
					data={this.props.data}
					headline={this.headline}
					wording={this.wording}
					bottle={this.bottle}
					addLoading={this.addLoading.bind(this)}
					removeLoading={this.removeLoading.bind(this)}
				/>
				{this.appendLoading()}
			</div>
		);
	}
}
