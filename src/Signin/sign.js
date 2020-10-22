import React from 'react';
import './sign.less';

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
	}

	submit_click() {
		//check
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

		let data = {
			name: n,
			tel: t,
			email: m,
		};

		console.log(data);

		this.tr.out();
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
