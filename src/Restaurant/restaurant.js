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

		gtag_pv('4界美食餐館　限定餐券');
	}

	render() {
		return (
			<div ref='main' id='restaurant-container'>
				<div ref='ctx' className='context'>
					<div className='row'>
						<div className='headline'>
							<div className='bg'></div>
							<div className='txt'>4界美食餐館　限定餐券</div>
						</div>
					</div>
					<div className='row'>
						<div className='col'>
							<div className='text'>
								<p>
									只要分享遊戲結果至個人FB，設定為公開模式，並
									<a target='blank' href='https://www.facebook.com/hashtag/%E9%87%91%E9%96%80%E9%AB%98%E7%B2%B1%E9%85%92'>
										#金門高粱酒
									</a>
									，就有機會抽中「金酒的世界餐桌」餐券(雙人行)。*四家餐廳餐券為隨機抽選，恕無法指定餐廳。 *使用方式以限定餐券備註之使用說明為準。
								</p>
								<p>沒抽到別傷心！2020/11/12~2021/01/31只要到以下四間合作餐廳，也可以品嚐到金酒特製套餐及品飲金門高粱酒。*菜單內容及價格以店家標示為準</p>
							</div>
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
