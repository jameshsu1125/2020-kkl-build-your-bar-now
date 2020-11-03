import React from 'react';
import './oneShot.less';

import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

import { gtag_pv } from 'SOCIAL/Gtag';

export default class oneShot extends React.Component {
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

		gtag_pv('One Shot 即玩即送');
	}

	render() {
		return (
			<div ref='main' id='oneShot'>
				<div ref='ctx' className='context'>
					<div className='row pd'>
						<div className='col'>
							<div className='headline'>
								<div className='bg'></div>
								<div className='txt'>One Shot 即玩即送</div>
							</div>
							<div className='block'>
								<div className='head'>活動內容</div>
								<div className='desc'>
									金酒特調期間限定推出！在以下兩間酒吧都有機會喝到Bartender精心設計的金酒特調，享受單醇絕不簡單的金門高粱酒。
									<br />
									同時只要在以下兩間合作酒吧參與「打造你的本命酒館」線上測驗遊戲，將結果畫面上傳至個人FB，並#金門高粱酒#金酒新4界，向店家出示上傳畫面，即可免費獲得金門高粱酒Shot一杯。
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
								<div className='desc'>Commons運用各種復古老件鋪陳帶有英倫風的摩登質感，佐著皮革沙發的慵懶氛圍，讓人沉浸其中不知不覺就多喝了二杯。</div>
							</div>
							<div className='block'>
								<div className='head'>金門高粱酒獨家特調</div>
								<div className='img-1-0'></div>
								<div className='desc'>
									酒名：畫菊
									<br />
									酒譜 ：38度金門高粱酒,Roku Gin, Kiwi ,Lime ,Chrysanthemum tea
									<br />
									說明：與台灣獨特茶文化結合，融入菊花茶的風味，增加田園的風格，與金門高粱酒激盪出完美配搭。
								</div>
								<div className='img-1-1'></div>
								<div className='desc'>
									酒名：西施&高粱
									<br />
									酒譜：58度金門高粱酒, Raspberry, Prucia, Honey, Lime
									<br />
									說明：靈感源自台灣檳榔西施的概念，創造一款充滿台灣本土風味的調酒，搭上梅酒及透過檳榔的元素，提出金門高粱酒的獨特香氣。
								</div>
								<div className='img-1-2'></div>
								<div className='desc'>
									酒名：千江同月
									<br />
									酒譜：58度金門高粱酒, Dolin Dry Vermouth,Mozart Dark Cacao,
									<br />
									Boker’s bitter,Hazelnut Oil,Maraschino
									<br />
									說明：一款充滿男性魅力的金酒調酒。富有層次風味的口感，搭上鹹甜滋味的地瓜球，帶出台灣獨有風格。
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
									坐落於信義區台北101對面的 MQ [ Marquee Taipei ]是重視品味與娛樂的饕客們最佳聚所。
									<br />
									挑高六米的空間感與店家重金打造出雅緻寬敞、低調奢華的 Lounge Bar 令人流連忘返。
									<br />
									駐店台灣冠軍調酒團隊各個身懷絕技，均曾代表台灣出席國際賽事，獨家調酒只為與眾不同的妳特製。
								</div>
							</div>
							<div className='block'>
								<div className='head'>金門高粱酒獨家特調</div>
								<div className='img-4-0'></div>
								<div className='desc'>
									酒名：Golden Age
									<br />
									酒譜：38度金門高粱酒、58度金門高粱酒、百香果、法樂南、萊姆、安格式amaro、柳橙
									<br />
									說明：融合兩款經典的金門高粱酒，以酸甜果香風味中和，保有金酒獨有香氣及口感，在兩者中取得完美的平衡。
								</div>
								<div className='img-4-1'></div>
								<div className='desc'>
									酒名：花好月圓
									<br />
									酒譜：38度金門高粱酒、大黃、薑汁糖漿
									<br />
									說明：運用38度金門高粱酒的獨特辛香，搭配上清香的大黃，最後以桂花裝飾，創造出一款清雅溫和的金酒特調。
								</div>
								<div className='img'>
									<div className='img-4-2'></div>
									<div className='img-des'>
										酒名：金高摸妳
										<br />
										酒譜：38度金門高粱酒、campari 龍膽紅酒、葡萄柚、葡萄柚糖漿
										<br />
										說明：以經典調酒Negroni為出發點，突顯金門高粱酒的不凡風味，添加富有台灣滋味的層次。
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
