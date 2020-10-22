import React from 'react';
import './content.less';

import Logo from './../Component/logo/logo';
import Menu from './../Component/menu/menu';
import Sign from './sign';
import Privacy from './privacy';
import Ending from './end';

export default class content extends React.Component {
	constructor(props) {
		super(props);

		this.state = { sign: true, privacy: false, end: false };
	}

	privacy_destory() {
		this.setState({ privacy: false });
		this.refs.sign.agree();
	}

	sign_addPrivacy() {
		this.setState({ privacy: true });
	}

	append_privacy() {
		if (this.state.privacy)
			return <Privacy destory={this.privacy_destory.bind(this)} />;
	}

	sign_end() {
		this.setState({ sign: false, end: true });
	}

	append_sign() {
		if (this.state.sign)
			return (
				<Sign
					ref='sign'
					privacy={this.sign_addPrivacy.bind(this)}
					TouchEvent={this.props.TouchEvent}
					end={this.sign_end.bind(this)}
				/>
			);
	}

	append_end() {
		if (this.state.end) return <Ending />;
	}

	render() {
		return (
			<div id='content'>
				{this.append_sign()}
				{this.append_privacy()}
				{this.append_end()}
				<Menu TouchEvent={this.props.TouchEvent} />
				<Logo TouchEvent={this.props.TouchEvent} />
			</div>
		);
	}
}
