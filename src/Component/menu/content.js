import React from 'react';
import './content.less';
import $ from 'jquery';
require('jquery-easing');

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
				root.props.TouchEvent.add('menu_0', () => {
					window.location.href = '#';
				});
				root.props.TouchEvent.add('menu_1', () => {
					window.location.href = '#';
				});
				root.props.TouchEvent.add('menu_2', () => {
					window.location.href = '#';
				});
				root.props.TouchEvent.add('menu_3', () => {
					window.location.href = '#';
				});
				root.props.TouchEvent.add('menu_4', () => {
					window.location.href = '#';
				});
				root.props.TouchEvent.add('menu_5', () => {
					window.location.href = '#';
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
						<div id='menu_0' className='btn'>
							活動說明
						</div>
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
							活動條款
						</div>
					</div>
				</div>
			</div>
		);
	}
}
