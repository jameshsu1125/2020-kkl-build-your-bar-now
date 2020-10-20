import React from 'react';
import './bar.less';

export default class bar extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
	}

	componentDidMount() {
		//script
	}

	componentDidUpdate() {
		//script
	}

	componentWillUnmount() {
		//script
	}

	render() {
		return (
			<div id='bar'>
				<div className={'img c' + this.props.data}></div>
			</div>
		);
	}
}
