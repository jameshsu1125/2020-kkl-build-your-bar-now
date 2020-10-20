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
			init() {
				this.c = $(root.refs.main);
				this.tran();
				this.set();
			},
			set() {
				for (var i = 0; i < 4; i++) $(root.refs['c' + i]).removeClass('on');
				for (var i = 0; i <= this.index; i++) $(root.refs['c' + i]).addClass('on');
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
		};
	}

	componentDidMount() {
		this.tr.init();
	}

	in() {
		this.tr.in();
	}

	push() {
		this.tr.index++;
		this.tr.set();
	}

	getLevel() {
		return this.tr.index;
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
				<div class='back'>BACK</div>
			</div>
		);
	}
}
