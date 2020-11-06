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
					<div className='head'>喀佈貍</div>
					<div className='img-c3'></div>
					<div className='ps'>*圖片僅供參考，以實際菜單料理為準</div>
					<div className='menu'>
						<div className='hr'></div>
						MENU
						<div className='hr'></div>
					</div>
					<div className='table-3'></div>
					<div className='ps'>*隨餐附贈原釀21金門高粱酒溫飲一杯</div>
					<div className='contact'>
						<p>
							喀佈貍kabu 大眾居酒屋
							<br />
							地址：
							<a target='blank' href='https://goo.gl/maps/8pHA9dRh68GQfDDq5'>
								台北市大安區樂利路11巷13號
							</a>
							<br />
							電話 : 02-2737-2843
						</p>
					</div>
				</div>
			</div>
		);
	}
}
