import React from 'react';

export default class restaurantmenu extends React.Component {
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
					<div className='head'>打邊爐</div>
					<div className='img-c1'></div>
					<div className='ps'>*圖片僅供參考，以實際菜單料理為準</div>
					<div className='menu'>
						<div className='hr'></div>
						MENU
						<div className='hr'></div>
					</div>
					<div className='table-1'></div>
					<div class='ps'>*隨套餐可品飲38度或58度金門高粱酒凍飲各1杯</div>
					<div className='contact'>
						<p>
							香港私宅打邊爐火鍋餐廳
							<br />
							地址：
							<a target='blank' href='https://goo.gl/maps/rrfBz9sWcNBgxohr5'>
								台北市中山區長安東路二段174之1號2樓
							</a>
							<br />
							電話 : 02-8772-5728
						</p>
					</div>
				</div>
			</div>
		);
	}
}
