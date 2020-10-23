import React from 'react';
import './box.less';

export default class box extends React.Component {
	render() {
		return (
			<div className='box'>
				<div className='box-h'>{this.props.headline || ''}</div>
				<div className='box-c'>{this.props.description}</div>
			</div>
		);
	}
}
