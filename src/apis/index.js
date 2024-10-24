import axios from 'axios'
import authorizedAxiosIntance from '../untils/authorizedAxios'
import { API_ROOT } from '../untils/constant'

export const handleLogoutAPI = async () => {
	//---- cookie---
	await authorizedAxiosIntance.delete(`${API_ROOT}/users/logout`)
	// --------
	//---- localStorage---
	localStorage.removeItem('token')
}
export const getAllProject = async () => {
	const response = await axios.get(`${API_ROOT}/projects`)
	return response.data
}
export const SignUp_API = async (data) => {
	const response = await axios.post(`${API_ROOT}/auth/register`, data)
	return response.data
}
export const Login_API = async (data) => {
	const response = await axios.post(`${API_ROOT}/auth/login`, data)
	return response.data
}
export const GetUserById_API = async (id) => {
	const response = await axios.get(`${API_ROOT}/users/${id}`)
	return response.data
}
