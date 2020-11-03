import React from 'react';
import './end.less';

import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');
import Hash from 'UNIT/Get';

import { gtag_pv } from 'SOCIAL/Gtag';

export default class end extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.tr = {
			y: -800,
			time: 1000,
			o: 0,
			init() {
				this.c = $(root.refs.main);
				this.fb.init();
				this.tran();
			},
			in() {
				$(this).animate(
					{ y: 0, o: 1 },
					{
						duration: this.time,
						step: () => this.tran(),
						complete: () => {
							this.tran();
							this.fb.in();
						},
						easing: 'easeOutQuart',
					}
				);
			},
			out() {
				$(this).animate(
					{ o: 0 },
					{
						duration: this.time,
						step: () => this.tran(),
						complete: () => {
							this.tran();
							window.location.href = Hash.root();
						},
						easing: 'easeOutQuart',
					}
				);
			},
			tran() {
				this.c.css({ 'margin-top': this.y + 'px', opacity: this.o });
			},
			fb: {
				o: 0,
				y: 100,
				init() {
					this.c = $(root.refs.fb);
					this.tran();
				},
				in() {
					$(this).animate(
						{ o: 1, y: 50 },
						{
							duration: this.time,
							step: () => this.tran(),
							complete: () => this.tran(),
							easing: 'easeOutQuart',
						}
					);
				},
				tran() {
					this.c.css({ opacity: this.o, 'margin-top': this.y + 'px' });
				},
			},
		};
	}

	componentDidMount() {
		this.tr.init();
		$(this.refs.main).waitForImages({
			finished: () => this.tr.in(),
			waitForAll: true,
		});

		gtag_pv('抽獎成功頁');
	}

	fb_click() {
		window.open('https://zh-tw.facebook.com/KKL.kin/');
	}

	close() {
		this.tr.out();
	}

	render() {
		return (
			<div ref='main' id='end'>
				<div className='square'>
					<p>
						謝謝您支持金門高粱酒
						<br />
						我們已經收到您的資料
					</p>
					<p>
						欲了解更多活動資訊
						<br />
						請追蹤金門酒廠臉書粉絲專頁
					</p>
					<div onClick={this.close.bind(this)} className='close'></div>
				</div>
				<div onClick={this.fb_click.bind(this)} ref='fb' className='fb'>
					<div className='ico'></div>
					<br />
					立即追蹤金門酒廠臉書粉絲專頁
				</div>
			</div>
		);
	}
}
