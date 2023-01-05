import React from 'react';

const fetchTime = (time) => {
	let dateTime = new Date(time);
	let newTime = dateTime.toLocaleTimeString('en-US');
	let amPm = newTime.split(" ")[1];
	let seconds = newTime.split(":")[2].replace(amPm,'');

	let noSeconds = newTime.replace(":"+seconds,' ');

	return noSeconds
}

const fetchDate = (date) => {
	const fullDate = new Date(date);
	const formattedDate = fullDate.toLocaleDateString('en-GB', {
  			day: 'numeric',
  			month: 'short',
  			year: 'numeric'
		}).replace(/ /g, '-');

	return formattedDate;
}
const InfoBlock = ({ data }) => {
	return (
		<div className="data-card data-card-mobile">
			<div style={{ marginBottom: '10px' }}><i>Forecast for <b>{fetchDate(data.date)}</b> is</i></div>
			<div>Temperature: {data.maxTemp}{data.tempUnit} / {data.minTemp}{data.tempUnit}</div>
			<div>Sunrise: {fetchTime(data.sunrise)}</div>
			<div>Sunset: {fetchTime(data.sunset)}</div>
		</div>
	)
}

export default InfoBlock;
//pk.eyJ1IjoidG9tc2FuZG9mZiIsImEiOiJjazljbWYwaXgwNTB2M2xxcHdjaXlyYmtjIn0.ex5-iYMsDzz7hDE4pJViNA