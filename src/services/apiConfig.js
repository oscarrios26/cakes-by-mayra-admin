import axios from "axios";

const api = axios.create({
	baseURL: process.env.REACT_APP_API,
});

const getToken = () => {
	return new Promise((resolve) => {
		resolve(`Bearer ${localStorage.getItem("token") || null}`);
	});
};

api.interceptors.request.use(
	async function (config) {
		config.headers["Authorization"] = await getToken();
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);
export const signIn = async (credentials) => {
	try {
		const response = await api.post("/sign-in", credentials);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const getCakeInquiries = async () => {
	try {
		const response = await api.get("/cake-clients");
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const getCookieInquiries = async () => {
	try {
		const response = await api.get("/cookie-clients");
		return response.data;
	} catch (error) {
		throw error;
	}
};
