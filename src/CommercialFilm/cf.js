import React from 'react';
import './cf.less';
import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

import { gtag_pv } from 'SOCIAL/Gtag';

export default class cf extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.tr = {
			y: -100,
			o: 0,
			time: 800,
			init() {
				this.c = $(root.refs.video);
				this.tran();
			},
			evt() {
				root.props.TouchEvent.add('close', () => this.out());
			},
			out() {
				$(this).animate(
					{ o: 0, y: -100 },
					{
						duration: this.time,
						step: () => this.tran(),
						complete: () => {
							this.tran();
							window.history.back();
						},
						easing: 'easeInBack',
					}
				);
			},
			in() {
				$(this).animate(
					{ o: 1, y: 0 },
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
			waitForAll: true,
		});
		gtag_pv('品牌影片');
	}

	render() {
		return (
			<div ref='main' id='cf'>
				<div ref='video' className='video'>
					<div id='close' className='close'></div>
					品牌影片
					<br />
					敬請期待
				</div>
			</div>
		);
	}
}
