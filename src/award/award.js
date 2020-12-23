import React from 'react';
import './award.less';

import Data from './data';

export default class award extends React.Component {
	constructor(props) {
		super(props);
		console.log(Data);
	}

	componentDidMount() {
		//script
	}

	componentDidUpdate() {
		//script
	}

	append(v) {
		let op = [];
		for (var i = 0; i < Data[v].length; i++) {
			op.push(
				<tr key={i}>
					<td>{Data[v][i].name}</td>
					<td>{Data[v][i].tel}</td>
				</tr>
			);
		}
		return op;
	}

	render() {
		return (
			<div id='award'>
				<div ref='ctx' className='context'>
					<div className='row'>
						<div className='headline'>
							<div className='bg'></div>
							<div className='txt'>《打造你的本命酒館》得獎名單</div>
						</div>
					</div>
					<div className='row'>
						<div className='col'>
							<div className='text'>
								<p>
									中獎者可獲得《金酒的世界餐桌》雙人行餐券，中獎通知同時以email通知，
									※依中華民國稅法，獎品價值超過1,000元者須申報所得稅，請中獎人務必注意email收件，以免中獎權益受損，雙人行餐券必須於2021/02/10(日)前使用，須提前預約，以利店家準備餐點。
								</p>
							</div>
						</div>
					</div>
					<div className='row'>
						<div className='col'>
							<div className='text'>
								<table>
									<thead>
										<tr>
											<th>桂香</th>
										</tr>
									</thead>
								</table>
								<table>
									<tbody>{this.append(0)}</tbody>
								</table>
								<table>
									<thead>
										<tr>
											<th>打邊爐</th>
										</tr>
									</thead>
								</table>
								<table>
									<tbody>{this.append(1)}</tbody>
								</table>
								<table>
									<thead>
										<tr>
											<th>Plan B</th>
										</tr>
									</thead>
								</table>
								<table>
									<tbody>{this.append(2)}</tbody>
								</table>
								<table>
									<thead>
										<tr>
											<th>喀佈貍</th>
										</tr>
									</thead>
								</table>
								<table>
									<tbody>{this.append(3)}</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
