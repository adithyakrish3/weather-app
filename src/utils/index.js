export const formatForecastData = (data, units) => {
	const response = {}
	if(data.time) {
		data.time.forEach((time, index) => {
			const obj = {
				date: time,
				minTemp: data.temperature_2m_min[index],
				maxTemp: data.temperature_2m_max[index],
				tempUnit: units.temperature_2m_max,
				sunrise: data.sunrise[index],
				sunset: data.sunset[index],
			}

			response[time] = obj
		})
	}

	return response;
}

export const extractCoordinates = (data) => {
	const exactOption = data.features[0];
	const response = {
		name: exactOption.place_name,
		latitude: exactOption.center[1],
		longitude: exactOption.center[0]
	}

	return response;
}

export const extractName = (data) => {
	const exactOption = data.features[0];

	return exactOption.place_name;
}