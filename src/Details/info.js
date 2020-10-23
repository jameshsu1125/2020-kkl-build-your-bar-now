import React from 'react';
import './info.less';
import $ from 'jquery';

export default class info extends React.Component {
	constructor(props) {
		super(props);
		this.title = this.props.title;
	}

	render() {
		return (
			<div ref='main' className='info'>
				<div className='info-title'>{this.props.title}</div>
				<div className='info-content'>
					<div className='info-txt'>
						酒度：{this.props.deg}度
						<br />
						容量：{this.props.capacity}
					</div>
					<div className='info-bottle'>
						<div className='info-g'></div>
						<div
							className='info-b'
							style={{ backgroundImage: `url(${this.props.wine})` }}
						></div>
					</div>
				</div>
			</div>
		);
	}
}
