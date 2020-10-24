import React from 'react';
import './guad3.less';

import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

export default class guad3 extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.tr = {
			y: window.innerHeight,
			time: 500,
			init() {
				this.c = $(root.refs.guad);
				this.tran();
			},
			evt() {
				root.props.TouchEvent.add('close', () => {
					root.props.TouchEvent.remove('close');
					this.out();
				});
			},
			out() {
				$(this).animate(
					{ y: window.innerHeight },
					{
						duration: this.time,
						step: () => this.tran(),
						complete: () => {
							this.tran();
							root.props.destory();
						},
						easing: 'easeInQuart',
					}
				);
			},
			in() {
				$(this).animate(
					{ y: 0 },
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
				this.c.css('top', this.y + 'px');
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
	}

	render() {
		return (
			<div ref='main' id='guad' className='g3'>
				<div ref='guad' className='guad-c'>
					<div className='row title'>濃郁甘淨</div>
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
								糧香濃郁
								<br />
								前段：典型糧香、曲香、清香
								<br />
								🈝段：熟瓜果香、甜蜜香
							</div>
						</div>
						<div className='table-row'>
							<div className='table-cell l'>
								<div className='circle'>味</div>
							</div>
							<div className='table-cell r'>
								入口爽冽，糧香濃郁，醇甜淨爽，
								<br />
								尾味怡暢，回味悠長。
							</div>
						</div>
					</div>
					<div id='close' className='close'></div>
				</div>
			</div>
		);
	}
}
