import React from 'react';
import './logo.less';

import Hash from 'UNIT/Get';

export default class logo extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.TouchEvent.add('logo', () => {
			window.location.href = Hash.root();
		});
	}

	render() {
		return <div id='logo'></div>;
	}
}
