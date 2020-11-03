import React from 'react';
import './content.less';
import $ from 'jquery';
require('jquery-easing');

import Hash from 'UNIT/Get';
import { gtag_event } from 'SOCIAL/Gtag';

export default class content extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.tr = {
			h: 0,
			time: 800,
			init() {
				this.c = $(root.refs.main);
				this.tran();
				this.evt();
			},
			tran() {
				this.c.css('height', this.h + '%');
			},
			switch(v) {
				$(this).stop();
				$(this).clearQueue();
				$(this).animate(
					{ h: v },
					{
						duration: this.time,
						step: () => this.tran(),
						complete: () => this.tran(),
						easing: 'easeOutQuart',
					}
				);
			},
			open() {
				this.switch(100);
			},
			close() {
				this.switch(0);
			},
			evt() {
				root.props.TouchEvent.add('menu_1', () => {
					gtag_event('主選單', '開始遊戲');
					setTimeout(() => {
						window.location.href = Hash.root();
					}, 300);
				});
				root.props.TouchEvent.add('menu_2', () => {
					gtag_event('主選單', '金酒新4界');
					setTimeout(() => {
						window.location.href = './details.html';
					}, 300);
				});
				root.props.TouchEvent.add('menu_3', () => {
					gtag_event('主選單', '金酒的世界餐桌');
					setTimeout(() => {
						window.location.href = './restaurant.html';
					}, 300);
				});
				root.props.TouchEvent.add('menu_4', () => {
					gtag_event('主選單', '單醇 絕不簡單 品牌廣告');
					setTimeout(() => {
						window.location.href = './commercialFilm.html';
					}, 300);
				});
				root.props.TouchEvent.add('menu_5', () => {
					gtag_event('主選單', '即玩即送One Shot');
					setTimeout(() => {
						window.location.href = './oneShot.html';
					}, 300);
				});
				root.props.TouchEvent.add('menu_6', () => {
					gtag_event('主選單', '活動條款');
					setTimeout(() => {
						window.location.href = './terms.html';
					}, 300);
				});
				this.resize();
				$(window).resize(() => this.resize());
			},
			resize() {
				var h = (window.innerHeight - 530) / 2;
				$(root.refs.container).css('margin-top', h + 'px');
			},
		};
	}

	componentDidMount() {
		this.tr.init();
	}

	open() {
		this.tr.open();
	}
	close() {
		this.tr.close();
	}

	render() {
		return (
			<div ref='main' id='menu-content'>
				<div className='c'>
					<div ref='container' className='menu-container'>
						<div id='menu_1' className='btn'>
							開始遊戲
						</div>
						<div id='menu_2' className='btn'>
							金酒新4界
						</div>
						<div id='menu_3' className='btn'>
							金酒的世界餐桌
						</div>
						<div id='menu_4' className='btn'>
							單醇 絕不簡單 品牌廣告
						</div>
						<div id='menu_5' className='btn'>
							即玩即送One Shot
						</div>
						<div id='menu_6' className='btn'>
							活動條款
						</div>
					</div>
				</div>
			</div>
		);
	}
}
