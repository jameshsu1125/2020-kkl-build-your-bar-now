import React from 'react';
import './warning.less';
import $ from 'jquery';

export default class warning extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.text = '禁止酒駕　酒後不開車安全有保障';
		this.tr = {
			init: function () {
				this.resize();
				$(window).resize(this.resize);
			},
			resize: function () {
				let dw = window.innerWidth > 768 ? window.innerWidth : 768,
					w = dw / (root.text.length - 1),
					l = 15,
					g;
				if (window.innerWidth > 768) g = 5;
				else g = 6.2;
				$(root.refs.main)
					.children('div')
					.each(function (i) {
						$(this).css({
							'line-height': window.innerHeight * 0.1 + 'px',
							left: l + i * w - g * i + 'px',
						});
					});
			},
		};
	}

	componentDidMount() {
		this.tr.init();
	}

	append() {
		var op = [];
		for (var i = 0; i < this.text.length; i++) {
			var w = this.text[i];
			if (w != '　') op.push(<div key={i}>{w}</div>);
			else
				op.push(
					<div key={i} className='ico'>
						{w}
					</div>
				);
		}
		return op;
	}

	render() {
		return (
			<div ref='main' id='warning'>
				{this.append()}
			</div>
		);
	}
}
