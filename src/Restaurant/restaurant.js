import React from 'react';
import './restaurant.less';
import Menu0 from './restaurant-menu-0';
import Menu1 from './restaurant-menu-1';
import Menu2 from './restaurant-menu-2';
import Menu3 from './restaurant-menu-3';

import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

import { gtag_pv } from 'SOCIAL/Gtag';

export default class restaurant extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.tr = {
			y: 500,
			o: 0,
			time: 1000,
			init() {
				this.c = $(root.refs.main);
				this.tran();
			},
			in() {
				setTimeout(() => {
					$('html, body').scrollTop(0);
					$(this).animate(
						{ y: 112, o: 1 },
						{
							duration: this.time,
							step: () => this.tran(),
							complete: () => this.tran(),
							easing: 'easeOutQuart',
						}
					);
				}, 300);
			},
			tran() {
				this.c.css({
					'margin-top': this.y + 'px',
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

		gtag_pv('4界美食餐館　特製菜單');
	}

	render() {
		return (
			<div ref='main' id='restaurant-container'>
				<div ref='ctx' className='context'>
					<div className='row'>
						<div className='headline'>
							<div className='bg'></div>
							<div className='txt'>4界美食餐館　特製菜單</div>
						</div>
					</div>
					<div className='row'>
						<div className='col'>
							<div className='text'>只要分享遊戲結果至FB並設定為地球模式，就有機會抽中4界美食餐館雙人券。</div>
						</div>
					</div>
					<div className='row'>
						<div className='col'>
							<Menu0 />
							<Menu1 />
							<Menu2 />
							<Menu3 />
						</div>
					</div>
				</div>
			</div>
		);
	}
}
