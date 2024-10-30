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
export const GetProjectType = async () => {
	const response = await axios.get(`${API_ROOT}/project-types/`)
	return response.data
}

// export const GetProjectOfUser = async (id) => {
// 	const response = await axios.get(`${API_ROOT}/user-projects/projects/${id}`)
// 	return response.data
// }
export const DeleteProject = async (token, id) => {
	const response = await axios.delete(`${API_ROOT}/projects/${id}`,
		{
			headers: {
				'Content-Type': 'application/json',
				'Authorization': JSON.parse(token)
			},
		})
	return response.data
}
export const CreateProject = async (token, data) => {
	const response = await axios.post(`${API_ROOT}/projects`, data,
		{
			headers: {
				'Content-Type': 'application/json',
				'Authorization': JSON.parse(token)
			},
		}
	)
	return response.data
}
export const CreateUserProject = async (data) => {
	const response = await axios.post(`${API_ROOT}/user-projects`, data)
	return response.data
}

export const getMyProject = async (token) => {
	const response = await axios.get(`${API_ROOT}/user-projects/own`, {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': JSON.parse(token)
		},
	})
	return response.data
}
export const GetProjectOfUser = async (token) => {
	const response = await axios.get(`${API_ROOT}/user-projects/join`, {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': JSON.parse(token)
		},
	})
	return response.data
}
export const GetAllPhase = async () => {
	const response = await axios.get(`${API_ROOT}/phase`)
	return response.data
}
export const GetUserOnProject = async (id) => {
	const response = await axios.get(`${API_ROOT}/user-projects/users/${id}`)
	return response.data
}
