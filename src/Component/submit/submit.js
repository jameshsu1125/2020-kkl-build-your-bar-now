import React from 'react';
import './submit.less';
import $ from 'jquery';
require('jquery-easing');

export default class submit extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		//script
		this.tr = {
			b: -110,
			time: 500,
			init() {
				this.c = $(root.refs.main);
				this.tran();
			},
			in() {
				$(this)
					.delay(500)
					.animate(
						{ b: 30 },
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
			evt() {
				root.props.TouchEvent.add('submit', () => {
					root.props.click();
				});
			},
			tran() {
				this.c.css('bottom', this.b + 'px');
			},
		};
	}

	in() {
		this.tr.in();
	}

	componentDidMount() {
		this.tr.init();
	}

	componentWillUnmount() {
		//script
	}

	render() {
		return (
			<div id='submit' ref='main' id='submit'>
				送出
			</div>
		);
	}
}
