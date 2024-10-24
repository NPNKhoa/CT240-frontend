import axios from 'axios'
import { toast } from 'react-toastify'
import { handleLogoutAPI } from '../apis/index'
let authorizedAxiosIntance = axios.create()

authorizedAxiosIntance.defaults.timeout = 1000 * 60 * 10

// ------Cookies-----
authorizedAxiosIntance.defaults.withCredentials = true

// Add a request interceptor
authorizedAxiosIntance.interceptors.request.use((config) => {

	// -----localStorage--------
	const accessToken = localStorage.getItem('accessToken')
	config.headers.Authorization = `Bearer ${accessToken}`
	// ------
	return config

}, (error) => {
	// Do something with request error
	return Promise.reject(error)
})

// Add a response interceptor
authorizedAxiosIntance.interceptors.response.use((response) => {

	return response
}, (error) => {
	if (error.response.status === 401) {
		handleLogoutAPI().then((() => {
			localStorage.removeItem('userInfo')
			location.href('/login')
		}))
	}
})

export default authorizedAxiosIntance
