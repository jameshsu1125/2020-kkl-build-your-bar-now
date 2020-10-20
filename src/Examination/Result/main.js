import React from 'react';
import './main.less';
import Bar from './bar';

import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

export default class result extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.headline = ['暮色潮間', '金夜風華', '草木森活', '日間工寓'];
		this.wording = [
			'每個特別日子都用心慶祝的你',
			'喜歡私房小酌的你',
			'在江湖走跳的你',
			'喜歡跟親友交心 的你',
		];
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

		let d = this.imgs[this.props.data[0]],
			r = Math.floor(Math.random() * d.length);

		this.bottle = d[r];
	}

	componentDidMount() {}

	in() {}

	render() {
		return (
			<div id='result'>
				<div className='container'>
					<Bar data={this.props.data[0]} />
					<div className='frame'>
						<div className='title'>{this.headline[this.props.data[0]] + ' 酒館'}</div>
						<div className='body'>
							恭喜你的金酒世界酒館開幕了！
							<br />
							{this.wording[this.props.data[2]]},還不快邀請朋友
							<br />
							來你的酒館小酌一番。
						</div>
						<div className='des'>
							<span>你最熱門的酒款：{this.bottle.name}</span>
						</div>
						<div className='btns'>
							<div className='btn'>分享抽獎</div>
							<div className='btn'>再開一家</div>
							<div className='btn'>更了解熱門酒款</div>
						</div>
						<div className='wine'>
							<div className='sl'></div>
							<div
								className='bottle'
								style={{ background: `url(${this.bottle.img})` }}
							></div>
						</div>
						<div className='light p1'></div>
						<div className='light p2'></div>
					</div>
				</div>
			</div>
		);
	}
}
