import React from 'react';
import { OrientationChange } from '../Device/Sensor';
import './OrientationChange.less';

export default class orientationChange extends React.Component {
	constructor(props) {
		super(props);
		this.state = { show: false };
	}

	componentDidMount() {
		OrientationChange.init({
			callback: (e) => {
				var dw = this.props.dw || 768;
				var s = window.screen.width / dw;
				var p = document.querySelector('meta[name="viewport"]');
				p.content = `width=768, minimum-scale=${s},  initial-scale=${s}`;
				this.setState({
					show: e != 0,
				});
			},
		});
	}

	set() {
		if (this.state.show) return <div id='lesca-oc'></div>;
	}

	render() {
		return <>{this.set()}</>;
	}
}
