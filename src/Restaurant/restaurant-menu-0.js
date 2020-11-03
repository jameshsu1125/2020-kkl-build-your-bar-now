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
					<div className='head'>桂香</div>
					<div className='img-c0'></div>
					<div className='ps'>*圖片僅供參考，以實際菜單料理為準</div>
					<div className='menu'>
						<div className='hr'></div>
						MENU
						<div className='hr'></div>
					</div>
					<div className='table-0'></div>
					<div className='ps'>
						*隨套餐可品飲金酒典藏珍品/陳高各1杯
						<br />
						*部份料理可能因季節問題而調整食材，請以餐廳菜單為主
					</div>
				</div>
			</div>
		);
	}
}
