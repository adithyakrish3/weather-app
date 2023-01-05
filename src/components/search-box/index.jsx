import React, { useState } from 'react';
import { http } from '../../http';
import { extractCoordinates } from '../../utils';

const SearchBox = ({ searchCoordinates, resetForecast }) => {
	const [searchText, setSearchText] = useState("");

	const onTextChange = (e) => {
		setSearchText(e.target.value)
	}

	const onSearch = async () => {
		if(searchText.length > 0) {
			resetForecast()
			const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json?access_token=pk.eyJ1IjoidG9tc2FuZG9mZiIsImEiOiJjazljbWYwaXgwNTB2M2xxcHdjaXlyYmtjIn0.ex5-iYMsDzz7hDE4pJViNA`
			const data = await http(url);
			const extractedData = extractCoordinates(data);
			setSearchText(extractedData.name);
			searchCoordinates(extractedData);
		}
	}
 	return (
		<div style={{
			marginTop: '20px'
		}}>
			<input
				value={searchText}
				onChange={onTextChange}
				type="text"
				id="location"
				name="location"
				placeholder="Search by Location ..."
				className="search-box"
			/>
			<div style={{ marginTop: '15px'}} className="root" >
				<div className="button" onClick={onSearch}>
					Search
				</div>
			</div>
		</div>
	)
}

export default SearchBox;