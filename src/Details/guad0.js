import React from 'react';
import './guad0.less';

import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

import { gtag_pv } from 'SOCIAL/Gtag';

export default class guad0 extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.tr = {
			y: -200,
			o: 0,
			time: 800,
			init() {
				this.c = $(root.refs.guad);
				this.tran();
				this.resize();
				$(window).resize(() => this.resize());
			},
			evt() {
				root.props.TouchEvent.add('close', () => {
					root.props.TouchEvent.remove('close');
					this.out();
				});
			},
			resize() {
				let h = window.innerHeight,
					s = 1,
					min = 900;
				if (h < min) s = h / min;
				$(root.refs.main).css({
					transform: `scale(${s})`,
					'-webkit-transform': `scale(${s})`,
					'-moz-transform': `scale(${s})`,
					'-o-transform': `scale(${s})`,
					'-ms-transform': `scale(${s})`,
				});
			},
			out() {
				$(this).animate(
					{ y: -200, o: 0 },
					{
						duration: this.time,
						step: () => this.tran(),
						complete: () => {
							this.tran();
							root.props.destory();
						},
						easing: 'easeInBack',
					}
				);
			},
			in() {
				$(this).animate(
					{ y: 0, o: 1 },
					{
						duration: this.time,
						step: () => this.tran(),
						complete: () => {
							this.tran();
							this.evt();
						},
						easing: 'easeOutBack',
					}
				);
			},
			tran() {
				this.c.css({
					top: this.y + 'px',
					opacity: this.o,
				});
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

		gtag_pv('象限：清雅醇厚');
	}

	render() {
		return (
			<div ref='main' id='guad' className='g0'>
				<div ref='guad' className='guad-c'>
					<div className='row title'>清雅醇厚</div>
					<div className='row table'>
						<div className='table-row'>
							<div className='table-cell l'>
								<div className='circle'>色</div>
							</div>
							<div className='table-cell r'>清亮透明</div>
						</div>
						<div className='table-row'>
							<div className='table-cell l'>
								<div className='circle'>香</div>
							</div>
							<div className='table-cell r'>
								清香純正
								<br />
								前段：典型大麴清香
								<br />
								後段：麴香、糧香、瓜果甜蜜香
							</div>
						</div>
						<div className='table-row'>
							<div className='table-cell l'>
								<div className='circle'>味</div>
							</div>
							<div className='table-cell r'>
								醇甜柔和、甘冽勁爽，酸澀平衡，
								<br />
								層次豐富、細膩交緻，尾味悠長。
							</div>
						</div>
					</div>
					<div id='close' className='close'></div>
				</div>
			</div>
		);
	}
}
