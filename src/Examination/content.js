import React from 'react';
import './content.less';
import './question.less';
import Logo from './../Component/logo/logo';
import Menu from './../Component/menu/menu';
import Loading from './loading';
import { Loader } from './../Component/_config';
import Question_A from './Quest_A/main';
import Question_B from './Quest_B/main';
import Question_C from './Quest_C/main';
import Question_D from './Quest_D/main';
import Result from './Result/main';
import Submit from './../Component/submit/submit';
import Level from './../Component/level/level';

export default class content extends React.Component {
	constructor(props) {
		super(props);
		this.state = { loading: false, question: false, level: true, submit: true };
		Loader.onend = this.loader_end.bind(this);
		this.data = [0, 0, 0, 0];
	}

	loader_end() {
		if (this.state.loading) this.refs.loader.out();
	}

	ready() {
		this.setState({ loading: true });
	}

	loader_ready() {
		this.setState({ question: 'A' });
	}

	loader_remove() {
		this.setState({ loading: false });
		this.setState({ question: 'A' }, () => {
			//this.setState({ question: 'Result' }, () => {
			if (this.refs.question.in) this.refs.question.in();
		});
	}

	appendLoading() {
		if (this.state.loading) return <Loading ref='loader' end={this.loader_remove.bind(this)} ready={this.loader_ready.bind(this)} />;
	}

	load_each(e) {
		if (this.state.loading) Loader.each();
	}

	q1_ready() {
		this.refs.submit.in();
		this.refs.level.in();
		this.refs.submit.show();
		this.refs.level.show();
	}

	load_loaded(n) {
		let c = String.fromCharCode(n.charCodeAt() + 1);
		if (this.state.loading) this.setState({ question: c });
	}

	question_ready() {
		this.refs.submit.show();
		this.refs.level.show();
	}

	appendQuestion() {
		switch (this.state.question) {
			case 'A':
				return (
					<Question_A
						ref='question'
						question='A'
						loaded={this.load_loaded.bind(this)}
						each={this.load_each.bind(this)}
						TouchEvent={this.props.TouchEvent}
						ready={this.q1_ready.bind(this)}
						ined={this.question_ready.bind(this)}
					/>
				);
			case 'B':
				return <Question_B ref='question' question='B' loaded={this.load_loaded.bind(this)} each={this.load_each.bind(this)} TouchEvent={this.props.TouchEvent} ined={this.question_ready.bind(this)} />;
			case 'C':
				return <Question_C ref='question' question='C' loaded={this.load_loaded.bind(this)} each={this.load_each.bind(this)} TouchEvent={this.props.TouchEvent} ined={this.question_ready.bind(this)} />;
			case 'D':
				return <Question_D ref='question' question='D' loaded={this.load_loaded.bind(this)} each={this.load_each.bind(this)} TouchEvent={this.props.TouchEvent} ined={this.question_ready.bind(this)} />;
			case 'Result':
				return <Result ref='question' TouchEvent={this.props.TouchEvent} data={this.data} />;
		}
	}

	level_click() {
		let lv = this.refs.level.getLevel();
		if (lv <= 1) return;
		delete this.data[lv + 1];
	}

	submit_click() {
		let res = this.refs.question.getSelect();
		let lv = this.refs.level.getLevel();
		this.data[lv] = res;
		this.refs.question.out(() => {
			let q = ['B', 'C', 'D', 'Result'];
			this.setState({ question: q[lv] }, () => {
				if (this.refs.question.in) this.refs.question.in();
			});
			if (q[lv] == 'Result') {
				this.refs.level.out();
				this.refs.submit.out();
			}
		});
		this.refs.level.push();
	}

	level_back() {
		let q = ['A', 'B', 'C', 'D'],
			index = q.findIndex((e) => e == this.state.question);
		this.refs.submit.blank();
		this.setState({ question: q[index - 1] }, () => {
			this.refs.question.in();
		});
	}

	level_destory() {
		this.setState({ level: false });
	}

	submit_destory() {
		this.setState({ submit: false });
	}

	append_level() {
		if (this.state.level) return <Level ref='level' TouchEvent={this.props.TouchEvent} click={this.level_click.bind(this)} back={this.level_back.bind(this)} destory={this.level_destory.bind(this)} />;
	}
	append_submit() {
		if (this.state.submit) return <Submit ref='submit' TouchEvent={this.props.TouchEvent} click={this.submit_click.bind(this)} destory={this.submit_destory.bind(this)} />;
	}

	render() {
		return (
			<div id='content'>
				{this.appendQuestion()}
				{this.append_submit()}
				{this.append_level()}
				{this.appendLoading()}
				<Menu TouchEvent={this.props.TouchEvent} />
				<Logo TouchEvent={this.props.TouchEvent} />
			</div>
		);
	}
}
