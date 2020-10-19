import React from 'react';
import './content.less';
import Menu from './../Component/menu/menu';
import Logo from './../Component/logo/logo';
import Intro from './intro';
import Sign from './sign';
import Birthday from './birthday';
import AgeWarning from './ageWarning';

export default class content extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.state = { App: 'intro' };
	}

	intro_enter() {
		this.setState({ App: 'birthday' });
	}

	ageWarningEnd() {
		this.setState({ App: 'birthday' });
	}

	bdayWarning() {
		this.setState({ App: 'ageWarning' });
	}

	bdayPass() {
		this.props.out();
		this.refs.sign.out();
	}

	appendApp() {
		if (this.state.App == 'intro') {
			return (
				<Intro
					ref='intro'
					TouchEvent={this.props.TouchEvent}
					enter={this.intro_enter.bind(this)}
				/>
			);
		} else if (this.state.App == 'birthday') {
			return (
				<Birthday
					TouchEvent={this.props.TouchEvent}
					warning={this.bdayWarning.bind(this)}
					pass={this.bdayPass.bind(this)}
				/>
			);
		} else if (this.state.App == 'ageWarning') {
			return (
				<AgeWarning
					end={this.ageWarningEnd.bind(this)}
					TouchEvent={this.props.TouchEvent}
				/>
			);
		}
	}

	signReady() {
		if (this.refs.intro) this.refs.intro.in();
	}

	render() {
		return (
			<div id='content'>
				<Sign ref='sign' ready={this.signReady.bind(this)} />
				{this.appendApp()}
				<Menu TouchEvent={this.props.TouchEvent} />
				<Logo TouchEvent={this.props.TouchEvent} />
			</div>
		);
	}
}
