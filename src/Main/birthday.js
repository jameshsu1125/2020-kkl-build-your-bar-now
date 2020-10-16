import React from 'react';
import './birthday.less';
import $ from 'jquery';
require('jquery-easing');

const swal = require('sweetalert');

export default class birthday extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		//script
		this.tr = {
			b: -460,
			time: 800,
			init: function () {
				this.c = $(root.refs.main);
				this.in();
			},
			in: function () {
				$(this).animate(
					{ b: 0 },
					{
						duration: this.time,
						step: () => this.tran(),
						complete: () => {
							this.tran();
							this.evt();
						},
						easing: 'easeOutQuart',
					}
				);
			},
			out: function (is) {
				$(this).animate(
					{ b: -460 },
					{
						duration: this.time,
						step: () => this.tran(),
						complete: () => {
							this.tran();
							if (is) root.props.warning();
							else root.props.pass();
						},
						easing: 'easeOutQuart',
					}
				);
			},
			tran: function () {
				this.c.css('bottom', this.b + 'px');
			},
			evt: function () {
				root.props.TouchEvent.add('birthday_send', () => {
					root.check();
				});
			},
		};
	}

	check() {
		let y = this.refs.y.value,
			m = this.refs.m.value,
			d = this.refs.d.value;

		if (y == '請選擇' || m == '請選擇' || d == '請選擇') {
			swal({ title: '請選擇你的生日' });
			return;
		}

		let bday = new Date(y, m - 1, d).getTime();
		let now = new Date();
		let dis = now - bday;

		let alive = dis / 1000 / 60 / 60 / 24 / 365;
		this.tr.out(alive < 18);
	}

	componentDidMount() {
		this.tr.init();
	}

	componentWillUnmount() {
		//script
	}

	append_years() {
		let n = new Date(),
			y = n.getFullYear(),
			op = [];

		for (var i = y; i >= y - 120; i--) {
			op.push(<option key={i}>{i}</option>);
		}
		return op;
	}

	append_mouth() {
		let op = [];
		for (var i = 1; i <= 12; i++) {
			op.push(<option key={i}>{i}</option>);
		}
		return op;
	}

	append_day() {
		let op = [];
		for (var i = 1; i <= 31; i++) {
			op.push(<option key={i}>{i}</option>);
		}
		return op;
	}

	render() {
		return (
			<div ref='main' id='birthday'>
				<div className='context'>
					<div className='title'>請輸入您的出生年月日</div>
					<div className='date'>
						<div className='col'>
							<div class='head'>年</div>
							<div class='select'>
								<select ref='y'>
									<option>請選擇</option>
									{this.append_years()}
								</select>
							</div>
						</div>
						<div className='col'>
							<div class='head'>月</div>
							<div class='select'>
								<select ref='m'>
									<option>請選擇</option>
									{this.append_mouth()}
								</select>
							</div>
						</div>
						<div className='col'>
							<div class='head'>日</div>
							<div class='select'>
								<select ref='d'>
									<option>請選擇</option>
									{this.append_day()}
								</select>
							</div>
						</div>
					</div>
					<div class='b'>
						<div id='birthday_send' class='btn'>
							送出
						</div>
					</div>
				</div>
			</div>
		);
	}
}
