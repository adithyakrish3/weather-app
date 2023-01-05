export const http = async (url) => {
	const headers = { 
		'Content-Type': 'application/json',
		'Accept': 'application/vnd.github+json',
		'Authorization': 'Bearer <Token comes here>'
	}
	let response
	await fetch(url)
        .then(response =>response.json())
        .then((data) => {
        	response = data;
        });

        return response;
}

export const fetchCoordinates = async (address) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoidG9tc2FuZG9mZiIsImEiOiJjazljbWYwaXgwNTB2M2xxcHdjaXlyYmtjIn0.ex5-iYMsDzz7hDE4pJViNA`
	const headers = { 
		'Content-Type': 'application/json',
		'Accept': 'application/vnd.github+json',
		'Authorization': 'Bearer <Token comes here>'
	}
	let response
	await fetch(url)
        .then(response =>response.json())
        .then((data) => {
        	response = data;
        });

        return response;
}

export const reverseGeoCoding = async (lat, long) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/-73.989,40.733.json?access_token=pk.eyJ1IjoidG9tc2FuZG9mZiIsImEiOiJjazljbWYwaXgwNTB2M2xxcHdjaXlyYmtjIn0.ex5-iYMsDzz7hDE4pJViNA`
}