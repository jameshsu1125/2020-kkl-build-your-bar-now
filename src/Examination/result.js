import React from 'react';
import './result.less';

export default class result extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		//script
		alert('page = result, selected data = ' + JSON.stringify(this.props.score));
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

	in() {}

	render() {
		return <div id='result'>Result</div>;
	}
}
