import request from "../../../Service/";
const api = new request();

export const getAlert = async () => {
	try {
		let response = await api.get(`alert/`);
		return response.alerts;
	} catch (error) {
		if (error.response) {
			if (error.response.status === 404) return null;
			throw Error(error.response.data.message);
		}
		throw Error(error.message);
	}
};

export const getAlertById = async () => {
	try {
		let response = await api.get(`alert/:id`);
		return response.alerts;
	} catch (error) {
		if (error.response) {
			if (error.response.status === 404) return null;
			throw Error(error.response.data.message);
		}
		throw Error(error.message);
	}
};

export const postAlert = async data => {
	try {
		let response = await api.post(`/alert/`, data);
		response = response.data;
		if (response.data) {
			return response.data;
		} else {
			return response;
		}
	} catch (error) {
		if (error.response) {
			if (error.response.status === 401) return null;
			throw Error(error.response.data.message);
		}
		throw Error(error.message);
	}
};

export const updateAlert = async (data ) => {
	const query = data.propsData;
	const result = await api.put(`/alert/${query._id}`, data.data);
	return result.data;
};

export const deleteAlert = async alertId => {
	const id = alertId.toString();
	const result = await api.delete(`/alert/${id}`);
	return result.data;
};
