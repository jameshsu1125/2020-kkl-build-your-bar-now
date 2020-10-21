import React from 'react';
import './level.less';
import $ from 'jquery';
require('jquery-easing');

export default class level extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.tr = {
			b: -100,
			time: 500,
			index: 0,
			is: true,
			init() {
				this.c = $(root.refs.main);
				this.btn = $(root.refs.btn);
				this.tran();
				this.set();
			},
			set() {
				for (var i = 0; i < 4; i++) $(root.refs['c' + i]).removeClass('on');
				for (var i = 0; i <= this.index; i++) $(root.refs['c' + i]).addClass('on');

				if (this.index == 0) this.hide();
				else this.show();
			},
			show() {
				if (this.btn.css('margin-top') == '0px') return;
				this.btn.stop();
				this.btn.clearQueue();
				this.btn.animate({ 'margin-top': '0px' }, 800, 'easeOutBack');
			},
			hide() {
				if (this.btn.css('margin-top') == '100px') return;
				this.btn.stop();
				this.btn.clearQueue();
				this.btn.animate({ 'margin-top': '100px' }, 800, 'easeOutBack');
			},
			click() {
				if (!this.is) return;
				this.is = false;

				this.back();
				root.props.back();
			},
			out() {
				$(this).animate(
					{ b: -100 },
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
			in() {
				$(this).animate(
					{ b: 30 },
					{
						duration: this.time,
						step: () => this.tran(),
						complete: () => this.tran(),
						easing: 'easeOutQuart',
					}
				);
			},
			tran() {
				this.c.css('bottom', this.b + 'px');
			},
			back() {
				this.btn.addClass('frez');
				this.index--;
				this.set();
			},
			next() {
				if (!this.is) return;
				this.is = false;

				this.btn.addClass('frez');

				this.index++;
				this.set();
			},
		};
	}

	componentDidMount() {
		this.tr.init();
	}

	out() {
		this.tr.out();
	}

	in() {
		this.tr.in();
	}

	show() {
		this.tr.is = true;
		this.tr.btn.removeClass('frez');
	}

	push() {
		this.tr.next();
	}

	getLevel() {
		return this.tr.index;
	}

	back() {
		if (this.tr.index <= 0) return;
		else if (this.tr.index > 3) return;
		this.tr.click();
	}

	render() {
		return (
			<div ref='main' id='level'>
				<div ref='c0' class='circle'></div>
				<div class='dashed'></div>
				<div ref='c1' class='circle'></div>
				<div class='dashed'></div>
				<div ref='c2' class='circle'></div>
				<div class='dashed'></div>
				<div ref='c3' class='circle'></div>
				<div ref='btn' onClick={this.back.bind(this)} class='back hide'>
					BACK
				</div>
			</div>
		);
	}
}
