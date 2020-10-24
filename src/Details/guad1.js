import React from 'react';
import './guad1.less';

import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

export default class guad1 extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.tr = {
			y: window.innerHeight * 0.6,
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
			<div ref='main' id='guad' className='g1'>
				<div ref='guad' className='guad-c'>
					<div className='row title'>濃郁醇厚</div>
					<div className='row table'>
						<div className='table-row'>
							<div className='table-cell l'>
								<div className='circle'>色</div>
							</div>
							<div className='table-cell r'>微金黃色光暈</div>
						</div>
						<div className='table-row'>
							<div className='table-cell l'>
								<div className='circle'>香</div>
							</div>
							<div className='table-cell r'>
								陳香濃郁
								<br />
								前段：典型陳香、醇甜香、酯香
								<br />
								後段：醃漬梅子香、堅果、熟果、
								<br />
								花蜜、微醬香等複合香氣。
							</div>
						</div>
						<div className='table-row'>
							<div className='table-cell l'>
								<div className='circle'>味</div>
							</div>
							<div className='table-cell r'>
								陳香濃郁，綿甜醇厚，圓潤細膩，
								<br />
								回味悠長，空杯留香。
							</div>
						</div>
					</div>
					<div id='close' className='close'></div>
				</div>
			</div>
		);
	}
}
