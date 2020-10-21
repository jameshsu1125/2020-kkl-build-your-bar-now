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
					• 穀糧系 •
					<br />
					淡雅清香
					<br />
					尾韻悠長
				</div>
				<div id='q2' ref='q2' className='btn row-b'>
					• 果梅系 •
					<br />
					沉香濃郁
					<br />
					圓潤細膩
				</div>
				<div id='q3' ref='q3' className='btn row-c'>
					• 花果系 •
					<br />
					甘美綿柔
					<br />
					回味怡暢
				</div>
				<div id='q4' ref='q4' className='btn row-d'>
					• 熟瓜系 •
					<br />
					入口爽冽
					<br />
					純甜淨爽
				</div>
			</>
		);
	}
}
