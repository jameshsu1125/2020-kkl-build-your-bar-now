import React from 'react';

export default class restaurantMenu extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='border'>
				<div className='corner'></div>
				<div className='corner'></div>
				<div className='corner'></div>
				<div className='corner'></div>
				<div className='body'>
					<div className='head'>Plan B</div>
					<div className='img-c2'></div>
					<div className='ps'>*圖片僅供參考，以實際菜單料理為準</div>
					<div className='menu'>
						<div className='hr'></div>
						MENU
						<div className='hr'></div>
					</div>
					<div className='table-2'></div>
					<div className='contact'>
						<p>
							Plan B 歐陸街頭市集小酒館
							<br />
							地址：
							<a target='blank' href='https://goo.gl/maps/VScWcU65zv3ywme99'>
								台北市大安區敦化南路一段187巷46號
							</a>
							<br />
							電話 : 02-2731-0855
						</p>
					</div>
				</div>
			</div>
		);
	}
}
