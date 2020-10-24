import React from 'react';
import './content.less';

import Logo from './../Component/logo/logo';
import Menu from './../Component/menu/menu';

import Quadrant from './quadrant';

export default class content extends React.Component {
	constructor(props) {
		super(props);
		this.state = { quadrant: true };
	}

	append_quadrant() {
		if (this.state.quadrant)
			return <Quadrant TouchEvent={this.props.TouchEvent} />;
	}

	render() {
		return (
			<div id='content'>
				{this.append_quadrant()}
				<div class='sticky'>
					<Menu TouchEvent={this.props.TouchEvent} />
					<Logo TouchEvent={this.props.TouchEvent} />
				</div>
			</div>
		);
	}
}
