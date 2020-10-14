import React from 'react';
import './content.less';
import Menu from './../Component/menu/menu';
import Logo from './../Component/logo/logo';
import Intro from './intro';

export default class content extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.state = { App: 'intro' };
		//script
	}

	appendApp() {
		if (this.state.App == 'intro') return <Intro TouchEvent={this.props.TouchEvent} />;
	}

	render() {
		return (
			<div id='content'>
				{this.appendApp()}
				<Logo TouchEvent={this.props.TouchEvent} />
				<Menu TouchEvent={this.props.TouchEvent} />
			</div>
		);
	}
}
