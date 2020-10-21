import React from 'react';
import $ from 'jquery';
require('jquery-easing');

export default class btns extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.tr = {
			len: 4,
			index: 1,
			isEvt: false,
			init() {
				for (var i = 1; i <= this.len; i++) {
					this['q' + i] = new this.fn('q' + i, i, this.len);
				}
			},
			next() {
				let index = this.index;
				index++;
				if (index > this.len) index = 1;
				this.switch(index);
			},
			prev() {
				let index = this.index;
				index--;
				if (index < 1) index = this.len;
				this.switch(index);
			},
			in() {
				for (var i = 1; i <= 4; i++) this['q' + i].in();
			},
			switch(v) {
				this.index = v;
				for (var i = 1; i <= 4; i++) this['q' + i].off();
				this['q' + v].on();
			},
			fn: function (div, index, max) {
				this.c = $(root.refs[div]);
				this.o = 0;
				this.delay = index * 200;
				this.tran = () => {
					this.c.css({
						opacity: this.o,
					});
				};
				this.in = () => {
					this.c.css('display', 'block');
					$(this)
						.delay(this.delay)
						.animate(
							{ o: 1 },
							{
								duration: this.time,
								step: () => this.tran(),
								complete: () => {
									this.tran();
									this.evt();
									if (index == max) {
										setTimeout(() => {
											root.tr.isEvt = true;
										}, 1050);
										root.props.ready();
									}
								},
								easing: 'easeOutQuart',
							}
						);
				};
				this.evt = () => {
					let id = this.c.attr('id');
					root.props.TouchEvent.add(id, () => {
						if (root.tr.isEvt) root.props.click(id);
					});
				};
				this.on = () => {
					this.c.addClass('on');
				};
				this.off = () => {
					this.c.removeClass('on');
				};
				this.tran();
			},
		};
	}

	getIndex() {
		return this.tr.index;
	}

	prev() {
		this.tr.prev();
	}

	next() {
		this.tr.next();
	}

	componentDidMount() {
		this.tr.init();
	}

	in() {
		this.tr.in();
	}

	goto(v) {
		this.tr.switch(v);
	}

	componentWillUnmount() {
		for (var i = 1; i <= 4; i++) this.props.TouchEvent.remove('q' + i);
	}

	render() {
		return (
			<>
				<div id='q1' ref='q1' className='btn row-a'>
					我不跟誰走
					<br />
					我帶動潮流
				</div>
				<div id='q2' ref='q2' className='btn row-b'>
					我不是老派
					<br />
					我愛好經典
				</div>
				<div id='q3' ref='q3' className='btn row-c'>
					非典型都會人
					<br />
					我與自然共存
				</div>
				<div id='q4' ref='q4' className='btn row-d'>
					不好奢華享樂
					<br />
					執著簡約樸實
				</div>
			</>
		);
	}
}
