import React from 'react';
import './content.less';
import Logo from './../Component/logo/logo';
import Menu from './../Component/menu/menu';
import Loading from './loading';

export default class content extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.state = { loading: false };
		//script
	}

	componentDidMount() {
		//script
	}

	componentWillUnmount() {
		//script
	}

	ready() {
		this.setState({ loading: true });
	}

	loader_ready() {}

	appendLoading() {
		if (this.state.loading) return <Loading ready={this.loader_ready.bind(this)} />;
	}

	render() {
		return (
			<div id='content'>
				<Logo TouchEvent={this.props.TouchEvent} />
				<Menu TouchEvent={this.props.TouchEvent} />
				{this.appendLoading()}
			</div>
		);
	}
}
