import React from 'react';
import './oneShot.less';

import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

export default class oneShot extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.tr = {
			y: 1000,
			time: 1000,
			init() {
				this.c = $(root.refs.main);
			},
			in() {
				setTimeout(() => {
					$('html, body').scrollTop(0);
					$(this).animate(
						{ y: 112 },
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
	}

	render() {
		return (
			<div id='oneShot'>
				<div ref='ctx' className='context'>
					<div className='row pd'>
						<div className='col'>
							<div className='headline'>
								<div className='bg'></div>
								<div className='txt'>即玩即送 One Shot</div>
							</div>
							<div className='block'>
								<div className='head'>活動內容</div>
								<div className='desc'>
									只要參與「打造你的本命酒館」活動，將結果畫面上傳個人FB社群，即可現場免費獲得金門高粱酒Shot一杯
								</div>
							</div>
							<div className='block'>
								<div className='head'>活動時間</div>
								<div className='desc'>即日起-2021/1/31</div>
							</div>
							<div className='block'>
								<div className='head'>合作酒款</div>
								<div className='desc'>金門高粱酒38度/金門高粱酒58度</div>
							</div>
							<div className='block'>
								<div className='head'>合作店家</div>
								<div className='desc'>Commons、Marquee</div>
							</div>
							<div className='block'>
								<div className='crow'></div>
								<div className='commons'>Commons</div>
								<div className='img-0'></div>
								<div className='head'>地點</div>
								<div className='desc'>台北市信義區光復南路447之48號</div>
							</div>
							<div className='block'>
								<div className='head'>交通狀況</div>
								<div className='desc'>
									<ul>
										<li>距信義安和捷運站步行約９分鐘</li>
										<li>距101/世貿站步行約10分鐘</li>
									</ul>
								</div>
							</div>
							<div className='block'>
								<div className='head'>店家介紹</div>
								<div className='desc'>
									Commons運用各種復古老件鋪陳帶有英倫風的摩登質感，佐著皮革沙發的慵懶氛圍，讓人沉浸其中不知不覺就多喝了二杯。
								</div>
							</div>
							<div className='block'>
								<div className='head'>金門高粱酒獨家特調</div>
								<div className='img'>
									<div className='img-1'></div>
									<div className='img-2'></div>
								</div>
							</div>
							<div className='block'>
								<div className='crow'></div>
								<div className='commons'>MQ Taipei</div>
								<div className='img-3'></div>
								<div className='head'>地點</div>
								<div className='desc'>台北市信義區信義路五段16-1號</div>
							</div>
							<div className='block'>
								<div className='head'>店家介紹</div>
								<div className='desc'>
									坐落於信義區台北101對面的 MQ [ Marquee Taipei
									]是重視品味與娛樂的饕客們最佳聚所。
									<br />
									挑高六米的空間感與店家重金打造出雅緻寬敞、低調奢華的 Lounge Bar
									令人流連忘返。
									<br />
									駐店台灣冠軍調酒團隊各個身懷絕技，均曾代表台灣出席國際賽事，獨家調酒只為與眾不同的妳特製。
								</div>
							</div>
							<div className='block'>
								<div className='head'>金門高粱酒獨家特調</div>
								<div className='img'>
									<div className='img-4'></div>
									<div className='img-5'></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
