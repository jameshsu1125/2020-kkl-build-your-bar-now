import React from 'react';
import './bar.less';

import $ from 'jquery';
require('jquery-easing');

export default class bar extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.tr = {
			init() {
				this.img.init();
			},
			in() {
				this.img.in();
			},
			img: {
				o: 0,
				time: 2000,
				init() {
					this.c = $(root.refs.img);
					this.tran();
				},
				in() {
					$(this).animate(
						{ o: 1 },
						{
							duration: this.time,
							step: () => this.tran(),
							complete: () => this.tran(),
							easing: 'easeOutQuart',
						}
					);
				},
				tran() {
					this.c.css('opacity', this.o);
				},
			},
		};
	}

	componentDidMount() {
		this.tr.init();
	}

	in() {
		this.tr.in();
	}

	render() {
		return (
			<div id='bar'>
				<div ref='img' className={'img c' + this.props.data}></div>
			</div>
		);
	}
}
