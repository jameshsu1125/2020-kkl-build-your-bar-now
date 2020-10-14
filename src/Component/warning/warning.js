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
				let w = window.innerWidth / (root.text.length - 1);
				let h = window.innerHeight * 0.1;
				if (window.innerWidth > 600) h = 3.5;
				else h = 2.3;
				$(root.refs.main)
					.children('div')
					.each(function (i) {
						$(this).css({
							left: i * w - h * i + 'px',
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
