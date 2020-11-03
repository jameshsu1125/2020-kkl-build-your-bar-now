import React from 'react';
import './quadrant.less';
import './guad.less';

import Info from './info';
import Box from './box';

import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

import Guad0 from './guad0';
import Guad1 from './guad1';
import Guad2 from './guad2';
import Guad3 from './guad3';

import { gtag_pv } from 'SOCIAL/Gtag';

export default class quadrant extends React.Component {
	constructor(props) {
		super(props);
		this.state = { guad: false };
		this.hash = {
			A0: '38度金門高粱酒',
			A1: '58度金門高粱酒',
			A2: '罈裝金門高粱酒',
			B0: '金酒典藏珍品',
			B1: '陳年金門高粱酒',
			C0: '戰酒黑金龍',
			C1: '罈裝金門大高酒',
			D0: '金門高粱酒 原釀21',
			D1: '特優 金門高粱酒',
		};
		const root = this;
		this.tr = {
			y: 500,
			o: 0,
			time: 1000,
			init() {
				this.c = $(root.refs.main);
				this.ctx = $(root.refs.ctx);
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
			tran2() {
				this.ctx.css({
					opacity: this.o,
				});
			},
			hide() {
				$(this).animate(
					{ o: 0.2 },
					{
						duration: 500,
						step: () => this.tran2(),
						complete: () => this.tran2(),
						easing: 'easeOutQuart',
					}
				);
			},
			show() {
				$(this).animate(
					{ o: 1 },
					{
						duration: 500,
						step: () => this.tran2(),
						complete: () => this.tran2(),
						easing: 'easeOutQuart',
					}
				);
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

		let id = ['A0', 'A1', 'A2', 'B0', 'B1', 'C0', 'C1', 'D0', 'D1'];
		for (var i in id) {
			this.props.TouchEvent.add(id[i], (e) => this.changeHash(e));
		}

		$(window).on('hashchange', () => {
			if (!window.location.hash) return;
			let hash = decodeURIComponent(window.location.hash).slice(1);
			for (var i in this.refs) {
				let t = this.refs[i];
				if (t.title == hash) {
					let y = t.getOffset(),
						oy = window.innerWidth < 770 ? 155 : 140;
					this.scorllTo(y - oy);
				}
			}
		});

		for (var i = 0; i < 4; i++) {
			this.props.TouchEvent.add('guad-' + i, (e) => this.guad_click(e));
		}

		gtag_pv('金酒新4界');
	}

	guad_click(e) {
		let id = e.target.id;
		this.setState({ guad: id });
		this.tr.hide();
	}

	scorllTo(y) {
		let nt = $('html, body').scrollTop(),
			time = Math.abs(nt - y) * 0.3;

		$('html, body').animate({ scrollTop: y }, time > 1000 ? 1000 : time, 'easeOutQuart');
	}

	changeHash(e) {
		let id = e.target.id;
		window.location.hash = '#' + this.hash[id];
	}

	guad_destory() {
		this.setState({ guad: false });
		this.tr.show();
	}

	append_guad() {
		if (this.state.guad) {
			switch (this.state.guad) {
				case 'guad-0':
					return <Guad0 TouchEvent={this.props.TouchEvent} destory={this.guad_destory.bind(this)} />;
				case 'guad-1':
					return <Guad1 TouchEvent={this.props.TouchEvent} destory={this.guad_destory.bind(this)} />;
				case 'guad-2':
					return <Guad2 TouchEvent={this.props.TouchEvent} destory={this.guad_destory.bind(this)} />;
				case 'guad-3':
					return <Guad3 TouchEvent={this.props.TouchEvent} destory={this.guad_destory.bind(this)} />;
			}
		}
	}

	render() {
		return (
			<div ref='main' id='quadrant'>
				<div ref='ctx' className='context'>
					<div className='row'>
						<div className='headline'>
							<div className='bg'></div>
							<div className='txt'>金酒新4界</div>
						</div>
					</div>
					<div className='row'>
						<div class='quad-c'>
							<div className='b-l'></div>
							<div className='b-b'></div>
							<div className='q-c'>
								<div className='quad'>
									<div id='guad-0' className='h'>
										清雅醇厚
									</div>
									<div className='c'>
										<div id='A2' className='A2'></div>
										<div id='A1' className='A1'></div>
										<div id='A0' className='A0'></div>
									</div>
								</div>
								<div className='quad'>
									<div id='guad-1' className='h'>
										濃郁醇厚
									</div>
									<div className='c'>
										<div id='B0' className='B0'></div>
										<div id='B1' className='B1'></div>
									</div>
								</div>
								<div className='quad'>
									<div id='guad-2' className='h'>
										清雅甘淨
									</div>
									<div className='c'>
										<div id='C1' className='C1'></div>
										<div id='C0' className='C0'></div>
									</div>
								</div>
								<div className='quad'>
									<div id='guad-3' className='h'>
										濃郁甘淨
									</div>
									<div className='c'>
										<div id='D1' className='D1'></div>
										<div id='D0' className='D0'></div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='row pd'>
						<div className='col'>
							<div className='corner'></div>
							<div className='corner'></div>
							<div className='corner'></div>
							<div className='corner'></div>
							<>
								<Info ref='A0' title={this.hash.A0} deg='38' capacity='0.3L/0.6L/0.75L' wine={require('./img/details/A0.png')} />
								<hr />
								<Box headline='典故' description='金門高粱酒以上好瓷罈裝盛，不僅古樸典雅，對酒液更有出色的催陳效果。經長時間存放後，口感更加清香醇厚，深受行家喜愛。' />
								<hr />
								<Box headline='包裝設計' description='酒標以中華象徵的雙龍呈現，與橘、銀、藍、黑色調連結，簡約大方透明的瓶身盛裝著清亮、優質的高粱酒，形塑了廣為盛行的38度金門高粱酒經典形貌。' />
								<hr />
								<Box
									headline='酒液特色'
									description='金門酒廠以傲人的釀酒工藝及得天獨厚的天然泉水，釀造出絕佳的酒液，酒液清若泉水，流露著純正優雅的高粱香氣，入口綿柔爽淨，甜果蜜香中帶點微酸，後味微甘，酒體清爽，回味悠長，值得細細品嘗。'
								/>
								<hr />
							</>
							<>
								<Info ref='A1' title={this.hash.A1} deg='58' capacity='0.3L/0.6L/0.75L' wine={require('./img/details/A1.png')} />
								<hr />
								<Box headline='典故' description='源自1962年問世的特級高粱酒，俗稱為「白金龍」，是深具金門酒廠標誌性風格的最大宗酒款之一。' />
								<hr />
								<Box headline='包裝設計' description='酒標以中華象徵的雙龍呈現，與金、銀、黑、紅色調連結，氣勢磅礡，透明的瓶身盛裝著明亮、優質的高粱酒，形塑了廣為盛行的58度金門高粱酒經典形貌。' />
								<hr />
								<Box
									headline='酒液特色'
									description='金門酒廠以傲人的釀酒工藝及得天獨厚的天然泉水，釀造出絕佳的酒液，酒液清若泉水，流露著芬芳馥郁的高粱香氣，入口甜而爽口，淨醇柔順帶有細緻口感，味道清香甘甜，餘韻迷人，紮實的結構和韻味在口中漫延，充份展現出最佳白酒獨特風味。'
								/>
								<hr />
							</>
							<>
								<Info ref='A2' title={this.hash.A2} deg='58' capacity='1L/2L/3L/5L' wine={require('./img/details/A2.png')} />
								<hr />
								<Box headline='典故' description='金門高粱酒以上好瓷罈裝盛，不僅古樸典雅，對酒液更有出色的催陳效果。經長時間存放後，口感更加清香醇厚，深受行家喜愛。' />
								<hr />
								<Box
									headline='包裝設計'
									description='以金門官窯金門陶瓷廠鑼紋瓷罈裝盛金門高粱酒，不僅擺飾氣派，散發著古樸喜氣，罈瓶飾以舞躍龍騰浮雕圖案，高貴氣質展露無遺，品相大方。大容量之罈裝酒對於陳化效果作用尤為顯著，為送禮、自用及收藏的熱門酒品。本酒品裝盛白金龍。'
								/>
								<hr />
								<Box
									headline='酒液特色'
									description='金門高粱酒以上好瓷罈裝盛，不僅古樸典雅，對酒液更有出色的催陳效果，酒質晶瑩亮透，芳香優雅柔和，口感甘醇勁冽，酒體豐富協調，具有金門香型的獨特風格，經長時間存放後，口感更加清香醇厚，深受行家喜愛。'
								/>
								<hr />
							</>
							<>
								<Info ref='B0' title={this.hash.B0} deg='56' capacity='0.75L' wine={require('./img/details/B0.png')} />
								<hr />
								<Box
									headline='包裝設計'
									description='三年窖藏的金門高粱酒，孕化出極品的口感，以優長新瓶裝盛，紋以赤紅金龍加上印金轉印於瓶身上，外盒則以局部燙金呈現，整體包裝精美，典雅高尚，展現出金門高粱酒獨特風格及風味。'
								/>
								<hr />
								<Box
									headline='酒液特色'
									description='『金酒典藏珍品』嚴選窖藏各式優質陳年酒基，以酒勾酒的獨特勾調技藝，窖藏三年淬煉而成之佳作，孕化出極品佳釀，口感細緻溫醇、陳香優雅柔和，是值得細細品嚐的入門陳年酒款。'
								/>
								<hr />
								<Box description='『金酒典藏珍品』於2016年首次參加世界烈酒競賽，在被譽為酒界最具權威的『舊金山世界烈酒競賽』中，獲得所有評審一致最高分，榮獲最高品質的雙金獎牌（Double Gold Medal），展現金門酒廠傲人的釀酒工藝。' />
								<hr />
							</>
							<>
								<Info ref='B1' title={this.hash.B1} deg='56' capacity='0.6L' wine={require('./img/details/B1.png')} />
								<hr />
								<Box
									headline='典故'
									description='源自1985 年陳年特級高粱酒，即為見證歷史和平的「黑金剛」，曾獲選為宴請各國使節國宴用酒，2016年首次參加世界食品品質評鑑大賞榮獲特金獎殊榮，用實力證明 「世界第一白酒」在金門，金門酒廠也將秉持世界級水準的釀酒工藝，持續在國際間大放異彩。'
								/>
								<hr />
								<Box headline='包裝設計' description='外盒用華美紅色與國人熟悉的燙金雙龍做為整體主視覺，象徵傳承堅持的優良酒質，成就不變的經典與精神。' />
								<hr />
								<Box
									headline='酒液特色'
									description='在天然資源擁 戴下，承襲古法釀造「三高二低一翻」，純糧固態發酵釀酒工藝，陳放酒窖中窖藏五年，窖內先天自然的冷空氣使酒香融合，酒質陳香濃郁，酒體豐厚，綿甜醇和， 回味悠長，是為頂級的高粱佳釀。'
								/>
								<hr />
							</>
							<>
								<Info ref='C0' title={this.hash.C0} deg='46' capacity='0.56L' wine={require('./img/details/C1.png')} />
								<hr />
								<Box headline='包裝設計' description='尊榮黑金配色、不凡質感完勝，金龍環繞瓶身，彰顯極致品味、氣宇軒昂。' />
								<hr />
								<Box
									headline='酒液特色'
									description='潔淨無瑕的酒液漸層式的散發水梨與春天花香氣息，聞來舒暢不厭；紮實且層次豐富的酒體，蘊涵梅子、堅果、蜂蜜與辛香料的混合口感，入口感覺不到辛辣，取而代之的是柔順與清甜爽口，尾韻回味悠長，讓人忍不住一飲再飲。'
								/>
								<hr />
							</>
							<>
								<Info ref='C1' title={this.hash.C1} deg='53' capacity='1L/2L/3L/5L' wine={require('./img/details/D1.png')} />
								<hr />
								<Box
									headline='典故'
									description='「金門大高酒其特色是新釀好時較為濃厚，香氣及尾韻較為甜美，罈裝金門大高酒經瓷罈存放，其醇化效果更佳，常常開罈滿室酒香，在特別節日佳慶，親朋好友相聚，開罈好酒與好友共享，品酌甜美香濃的金門好，是人生最快意的享受。'
								/>
								<hr />
								<Box
									headline='包裝設計'
									description='以鑼紋瓷罈裝盛金門高粱酒，鵝黃罈裝造型有別於特級酒的白罈，更具古樸美感，罈瓶正面飾以舞躍龍騰浮雕圖案，罈瓶背面則為「金門大高酒」字樣品相大方，大容量之罈裝酒對於陳化效果作用尤為顯著，為送禮、自用及收藏的熱門酒品。'
								/>
								<hr />
								<Box headline='酒液特色' description='酒體晶亮透明，清香純正，入口醇甜爽淨，清爽醇香與蜜香結合，自然協調，甜美清爽淡雅，回味爽順。' />
								<hr />
							</>
							<>
								<Info ref='D0' title={this.hash.D0} deg='58' capacity='0.5L' wine={require('./img/details/C0.png')} />
								<hr />
								<Box
									headline='典故'
									description='「金門高粱酒．原釀21」係採用「金選21號」純糯高粱品種所釀製出來的特殊酒品。「原釀」是指金酒公司一貫堅持用純糧固態釀造、發酵，絕不添加任何調味、增味物質；「21」除了代表高粱品種代號外，更有傳統中華文化「一半」、「中庸」的意涵。唐．白居易有〈自詠〉詩云：『鬚白面微紅，醺醺半醉中；百年隨手過，萬事轉頭空。』這種詮釋「人生苦短、對酒當歌」的放曠之情，除了呈現出博大精深的白酒哲學之外，「半醉微醺」也正是「金門高粱酒．原釀21」對於所有愛飲者的傾情承諾。'
								/>
								<hr />
								<Box
									headline='包裝設計'
									description='象徵王者的騰龍，盤繞守護著「金門高粱酒．原釀21」酒徽。設計簡練俐落，兼融現代感與中國風；大器中見婉約，卓然中見和諧。整體造型雍容、謹守中道，體現出「原釀21」所欲追求及詮釋的「中庸」精神，以及一種「半醉微醺」、與天地交融互感的生活狀態。'
								/>
								<hr />
								<Box
									headline='酒液特色'
									description='「金選21號」糯性高粱品種所釀製出來的酒香醇濃郁，較傳統半糯性高粱所產生的高粱口感及香氣更顯得令人驚艷，可謂江山代有才人出，各領風騷，原釀醇酒，魅力難擋。酒液晶瑩剔透，香氣純正、酒體厚實、甘柔爽淨、餘韻悠綿。「金門高粱酒．原釀21」歷經多年研發，測試各種酒度、原料配比，經二十餘位品酒師傅反覆品評，並以獨特完美的酒液特色呈現，可望再次挑戰您的味蕾餘韻！'
								/>
								<hr />
							</>
							<>
								<Info ref='D1' title={this.hash.D1} deg='58' capacity='0.6L' wine={require('./img/details/D0.png')} />
								<hr />
								<Box
									headline='典故'
									description='「窖藏一年以上的特優金門高粱酒，調合優質陳年老酒精心製作而成，2017年首次參加舊金山世界烈酒競賽榮獲金牌獎，用實力證明金門高粱酒受專業評審的肯定，傳承堅持的優良酒質，成就不變的經典與精神。'
								/>
								<hr />
								<Box
									headline='包裝設計'
									description='酒標選用具金屬效果的金箔紙，底紋採用金屬紋路表現質感，透過瓶身可以看到底部紋路，正是代表酒品的純淨、剔透與優質，酒標兩側以局部上光作表現，依光線角度的不同，龍形也更顯層次。'
								/>
								<hr />
								<Box headline='酒液特色' description='酒液清亮透明、香氣幽雅柔和、口感醇順淨爽，酒體豐富協調。適合用於佐餐、宴客或好友聚會時飲用。' />
							</>
						</div>
					</div>
				</div>
				{this.append_guad()}
			</div>
		);
	}
}
