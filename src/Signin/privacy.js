import React from 'react';
import './../Terms/dialog.less';
import $ from 'jquery';
require('jquery-easing');

export default class privacy extends React.Component {
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
							root.props.destory();
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
						<h3>個資聲明</h3>
					</div>
					<div className='row'>
						<ol>
							<li>
								參加活動者請依活動網頁指示填寫相關資料。您參加本次活動時，主辦單位將蒐集您的個人資料及您在本活動中所參與及輸入的相關資訊（包含姓名、電話及郵件信箱等資料），將作為本次及未來行銷活動之聯繫、活動公告、後續處理、聯絡及記錄等行銷目的使用。
							</li>
							<li>
								參加本活動者同意主辦單位基於活動目的，得公佈得獎者姓名或部分個人資料於網站。
							</li>
							<li>
								您得自由選擇是否提供相關個人資料及類別，惟若您不同意提供個人資料，將無法參加抽獎或受有領獎資格。
								<br />
								根據主辦單位之隱私權政策，您擁有以下權利：
							</li>

							<li>
								注意事項：
								<ul>
									<li>
										看的權利。您可以隨時查看我們所收集的資料。確保您資料之準確性。任何不準確的個人資料將被即時刪除或改正。
									</li>
									<li>取得您資料的權利。您的資料屬於您，因此您可以隨時複製或移動之。</li>
								</ul>
							</li>
						</ol>
						<div onClick={this.back.bind(this)} className='agree'>
							同意
						</div>
					</div>
					<div onClick={this.back.bind(this)} className='close'></div>
				</div>
			</div>
		);
	}
}
