import React, { useEffect, useState } from 'react';
import SearchBox from '../search-box';
import InfoBlock from '../info-block';
import Skeleton from '../skeleton';
import { http } from '../../http';
import { formatForecastData, extractName } from '../../utils';

const Widget = () => {
	const [coordinates, setCoordinates] = useState(null)
	const [forecast, setForecast] = useState({})
	const [place, setPlace] = useState("")

	useEffect(() => {
		const fetchCoordinates = async () => {
			await getDefaultCoordinates();
		};

		if(!coordinates)
			fetchCoordinates();
	}, [])

	useEffect(() => {
		const fetchForecastData = async () => {
			const url = `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`
	    	const data = await http(url);
	    	const forecastData = formatForecastData(data.daily, data.daily_units)
	    	setForecast(forecastData)
	    };

	    if(coordinates) 
	    	fetchForecastData();
	}, [coordinates])

	const getDefaultCoordinates = async () => {
		await navigator.geolocation.watchPosition(
			async (position) =>  {
				const data = {
					latitude: position.coords.latitude,
					longitude: position.coords.longitude
				}
				const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${data.longitude},${data.latitude}.json?access_token=pk.eyJ1IjoidG9tc2FuZG9mZiIsImEiOiJjazljbWYwaXgwNTB2M2xxcHdjaXlyYmtjIn0.ex5-iYMsDzz7hDE4pJViNA`
				const response = await http(url);
				const placeName = extractName(response);
				setPlace(placeName)
				setCoordinates(data)
			},
			err => console.log(err)
		);
	}

	const searchCoordinates = (obj) => {
		if(obj) {
			const data = {
				latitude: obj.latitude,
				longitude: obj.longitude
			}

			setCoordinates(data)
			setPlace(obj.name)
		}
	}

	const resetForecast = () => {
		setForecast({})
	}

	return (
		<div className="root root-content">
		  	<div className="card card-content">
		    	<div className="logo logo-content">Weather App</div>
		    	<div className="header">The browser location is used for forecast by default.</div>
		    	{/*<div className="sub-header">You can also check your current place in the search box, which is prepopulated based on your location.</div>*/}
		    	<SearchBox
		    		searchCoordinates={searchCoordinates}
		    		resetForecast={resetForecast}
		    	/>
		    	{forecast && Object.keys(forecast).length > 0 && <div>
		    		{place.length > 0 && <div style={{ marginTop: '15px' }}>Forecast for <i><b>{place}</b></i></div>}
		    		{Object.keys(forecast).map((key, index) => {
		    			return <InfoBlock key={key} data={forecast[key]} />
		    		})}
		    	</div>}
		    	{forecast && Object.keys(forecast).length === 0 && <div style={{ marginTop: '30px' }}>
		    		{Array.from(Array(7), (e, i) => {
					    return <Skeleton type="post" />
					})}
		    	</div>}
		  </div>
		</div>
	);
}

export default Widget;