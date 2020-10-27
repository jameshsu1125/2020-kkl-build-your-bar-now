import React from 'react';
import './sign.less';

import Hash from 'UNIT/Get';
import { Submit } from './../Component/_config';

import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');
const swal = require('sweetalert');

export default class sign extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.isPrivacy = false;
		this.tr = {
			y: -800,
			time: 1000,
			o: 0,
			init() {
				this.c = $(root.refs.main);
				this.tran();
			},
			in() {
				$(this)
					.delay(500)
					.animate(
						{ y: 0, o: 1 },
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
					{ y: -800, o: 0 },
					{
						duration: this.time,
						step: () => this.tran(),
						complete: () => {
							this.tran();
							root.props.end();
						},
						easing: 'easeOutQuart',
					}
				);
			},
			tran() {
				this.c.css({ 'margin-top': this.y + 'px', opacity: this.o });
			},
		};
	}

	agree() {
		this.isPrivacy = true;
		$(this.refs.checkbox).addClass('checked');
	}

	componentDidMount() {
		this.tr.init();
		$(this.refs.main).waitForImages({
			finished: () => this.tr.in(),
			waitForAll: true,
		});

		let dat = atob(Hash.get('dat').split('#')[0].split('%')[0]).split(',');
		this.dat = {
			question_1: [
				'我不跟誰走 我帶動潮流',
				'我不是老派 我愛好經典',
				'非典型都會人 我與自然共存',
				'不好奢華享樂 執著簡約樸實',
			][parseInt(dat[0])],
			question_2: [
				`• 穀糧系 • 淡雅清香 尾韻悠長`,
				`• 果梅系 • 沉香濃郁 圓潤細膩`,
				`• 花果系 • 甘美綿柔 回味怡暢`,
				`• 熟瓜系 • 入口爽冽 純甜淨爽`,
			][parseInt(dat[1])],
			question_3: [
				`• 特殊節日 • 每一個心中小日 都是小酌的節日`,
				`• 獨自品味 • 每一口人生甘醇 只有自己才懂得`,
				`• 社交應酬 • 江湖鬥陣走，把酒交心 面子裡子都要有`,
				`• 親友相聚 • 把酒交心 唯與真心`,
			][parseInt(dat[2])],
			question_4: [
				`• 日式料理 • 最鮮的魚貨 味覺與視覺的饗宴`,
				`• 歐式料理 • 美、食、氛圍 我全部都要`,
				`• 港式火鍋 • 好湯頭好食材 怎麼下鍋都美味`,
				`• 創意料理 • 驚喜的菜色 不膩的創意`,
			][parseInt(dat[3])],
			share_id: dat[4],
		};
	}

	submit_click() {
		let n = this.refs.name.value,
			t = this.refs.tel.value,
			m = this.refs.email.value;

		if (n === '' || t === '' || m === '') {
			swal({ title: '表格請確實填寫' });
			return;
		}

		let error = '表格格式有誤，請檢查並重新填寫';

		if (t.length < 10) {
			swal({ title: error });
			return;
		}

		if (m.indexOf('@') < 0) {
			swal({ title: error });
			return;
		}

		if (!this.isPrivacy) {
			swal({ title: error });
			return;
		}

		let d = {
			name: n,
			phone: t,
			email: m,
			agreed: this.isPrivacy ? '1' : '0',
			share_id: '',
		};

		let data = { ...d, ...this.dat };
		console.log(data);

		Submit.send(data).then(
			(e) => {
				console.log(e);
				if (e.status == 200) this.tr.out();
				else swal({ title: e.errors[0] });
			},
			(e) => {
				console.log(e);
				swal({ title: e.responseJSON.errors[0] });
			}
		);
	}

	box_click() {
		if (this.isPrivacy) {
			this.isPrivacy = false;
			$(this.refs.checkbox).removeClass('checked');
		} else {
			this.props.privacy();
		}
	}

	render() {
		return (
			<div ref='main' id='sign'>
				<div className='context'>
					<div className='row'>
						<h1>
							恭喜您完成抽獎資料，還差一步
							<br />
							請您協助填寫以下資料
						</h1>
					</div>
					<hr />
					<div className='row'>
						<h1>抽獎資料</h1>
					</div>
					<div className='row mt'>
						<div className='col-3'>姓名</div>
						<div className='col'>
							<input type='text' ref='name' />
						</div>
					</div>
					<div className='row mt'>
						<div className='col-3'>電話</div>
						<div className='col'>
							<input maxLength='10' type='tel' ref='tel' />
						</div>
					</div>
					<div className='row mt'>
						<div className='col-3'>信箱</div>
						<div className='col'>
							<input type='email' ref='email'></input>
						</div>
					</div>
					<div className='row mt-2'>
						<div className='box'>
							<div ref='checkbox' className='checkbox'></div>
							我已詳閱個資聲明
							<div onClick={this.box_click.bind(this)} className='boxBtn'></div>
						</div>
					</div>
					<div onClick={this.submit_click.bind(this)} className='btn'>
						送出
					</div>
				</div>
			</div>
		);
	}
}
