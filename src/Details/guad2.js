import React from 'react';
import './guad2.less';

import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

import { gtag_pv } from 'SOCIAL/Gtag';

export default class guad2 extends React.Component {
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

		gtag_pv('象限：清雅甘淨');
	}

	render() {
		return (
			<div ref='main' id='guad' className='g2'>
				<div ref='guad' className='guad-c'>
					<div className='row title'>清雅甘淨</div>
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
								清香優雅
								<br />
								前段：花蜜香、醇甜香
								<br />
								🈝段：甜瓜果香、清香糧香
							</div>
						</div>
						<div className='table-row'>
							<div className='table-cell l'>
								<div className='circle'>味</div>
							</div>
							<div className='table-cell r'>
								甘美綿柔、醇和淨爽、酸澀適中，
								<br />
								回味怡暢。
							</div>
						</div>
					</div>
					<div id='close' className='close'></div>
				</div>
			</div>
		);
	}
}
