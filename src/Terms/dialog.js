import React from 'react';
import './dialog.less';
import $ from 'jquery';
require('jquery-easing');

export default class dialog extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.tr = {
			y: 100,
			o: 0,
			time: 1000,
			init() {
				this.c = $(root.refs.dialog);
				this.tran();
				this.in();
			},
			in() {
				$(this).animate(
					{ o: 1, y: 19 },
					{
						duration: this.time,
						step: () => this.tran(),
						complete: () => this.tran(),
						easing: 'easeOutQuart',
					}
				);
			},
			out() {
				$(this).animate(
					{ o: 0, y: 0 },
					{
						duration: this.time,
						step: () => this.tran(),
						complete: () => {
							this.tran();
							window.history.back();
						},
						easing: 'easeOutQuart',
					}
				);
			},
			tran() {
				this.c.css({
					opacity: this.o,
					'margin-top': this.y + '%',
				});
			},
		};
	}

	componentDidMount() {
		this.tr.init();
	}

	back() {
		this.tr.out();
	}

	render() {
		return (
			<div ref='dialog' id='dialog'>
				<div className='context'>
					<div className='row'>
						<h3>活動條款</h3>
					</div>
					<div className='row'>
						<ul>
							<li>活動名稱：金門高粱酒 打造你的本命酒館</li>
							<li>活動日期：即日起至 2020/12/18為止</li>
							<li>
								活動辦法：進入遊戲後，按步驟回答4個問題，即可打造屬於自己的酒館風格與分享畫面。
							</li>
							<li>
								抽獎辦法：完成遊戲後，於FB分享你的酒館畫面，並於FB設定地球模式，即可獲得乙次抽獎機會。
							</li>
							<li>抽獎內容：協力合作餐廳晚餐-雙人券 </li>
							<li>抽獎公布時間：2020/12/23</li>
							<li>抽獎公布位置：金門高粱酒臉書粉絲專頁</li>
							<li>
								注意事項：
								<ol>
									<li>本活動由金門高粱酒品牌主辦（下稱主辦單位）。</li>
									<li>
										主辦單位將於抽獎後10日內以信箱或電話聯繫中獎者，如中獎者未於10日內回應，將取消獲獎資格。
									</li>
									<li>
										本活動贈品以公佈於活動網站上的資料為準，主辦單位保留更換其他等值獎項之權利。如活動方式及活動獎品有所變動，以活動網站公告為準，不再另行通知。本活動贈品不得替換、交換、銷售，或是折換現金或其他商品或服務。
									</li>
									<li>
										如有任何因電腦、網路、電話、技術或不得歸責於主辦單位之事由，而使參加者所寄出或登錄之資料有延遲、遺失、錯誤、或毀損之情況，主辦單位及相關之母公司、關係企業、員工不負任何法律責任，參加者亦不得因此異議。
									</li>
									<li>
										主辦單位寄送贈品給每位得獎者，如無法成功投遞導致贈品遭退回時，或若得獎者聯絡資訊有誤以致無法成功聯絡上得獎者，恕將視為自動棄權。
									</li>
									<li>
										每個Facebook帳號僅有一個中獎機會。主辦單位保留隨時修改本活動辦法及本活動之權利。參加活動者一旦參加本活動，即視為同意接受本辦法之拘束。
									</li>
									<li>
										依中華民國稅法規定，中獎價值在新台幣 1,000
										(含)元以上者，贈與物品的價值將併入中獎人年度個人綜合所得稅申報。請中獎人配合繳交身分證影印本作為申報依據，以便主辦單位寄發扣繳憑單。若中獎人不願繳交身分證影本，視同放棄中獎資格，且不得異議。
									</li>
									<li>
										中獎金額超過 NT$20,000元，中獎人應依稅法先行繳交相當於獎品價值 10%
										機會中獎之稅金（若中獎人屬於在中華民國境內居住未達 183
										日之本國人或外國人，請參照外籍人士之規定扣繳 20%
										稅金），並出具繳款收據後，始得領取獎項。若中獎人不願先行繳納本項稅金，視同放棄中獎資格，不得異議。
									</li>
									<li>
										外籍人士中獎者（即在中華民國境內居住未達 183
										日之本國人或外國人），依中華民國稅法應先行繳交相當於獎品價值 20%
										機會中獎之稅金，並出具繳款收據與居留證明後，始得領取獎項。若中獎人不願先行繳納本項稅金，視同放棄中獎資格，不得異議。
									</li>
									<li>
										主辦單位於抽出得獎者後，將依得獎者所提供之聯絡資訊以電子郵件通知得獎者，得獎者應於主辦單位寄送通知郵件後
										10 日內提供主辦單位所要求之完整領獎文件，逾期視為棄權。
									</li>
								</ol>
							</li>
						</ul>
					</div>
					<div onClick={this.back.bind(this)} className='close'></div>
				</div>
			</div>
		);
	}
}
