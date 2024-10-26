import { useState } from 'react'
import Box from '@mui/material/Box'
import LoginForm from './Form/LoginForm'
import SignUpForm from './Form/SignUpForm'
import { jwtDecode } from 'jwt-decode'
import { Login_API, GetUserById_API, SignUp_API } from '../../apis/index'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function Login() {
	const [typeOfForm, setTypeOfForm] = useState('login')
	const navigate = useNavigate()

	const handleChangeForm = (type) => {
		setTypeOfForm(type)
	}
	const submitLogIn = async (data) => {
		try {
			const { token } = await Login_API(data)
			const tokenDecoded = jwtDecode(token)
			const user = await GetUserById_API(tokenDecoded.id)
			localStorage.setItem('userInfo', JSON.stringify(user))
			localStorage.setItem('Authorization', JSON.stringify(`Bearer ${token}`))
			navigate('/')
		} catch (error) {
			toast('Username or Password incorrect', { position: 'top-center' })
		}
	}
	const submitSignUp = (dataSubmit) => {
		SignUp_API(dataSubmit)
			.then(userInfo => {
				toast.success('You have successfully registered.', { position: 'top-center' })
				setTypeOfForm('login')
			}
			)
			.catch((error) => {
				toast.error(`${error?.response?.data?.message}`, { position: 'top-center' })
			})
	}
	return (
		<Box sx={{
			display: 'flex',
			flexDirection: 'column',
			minHeight: '100vh',
			alignItems: 'center',
			justifyContent: 'flex-start',
			background: 'url(src/assets/RLC.jpg)',
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.6)'
		}}>
			{typeOfForm === 'login' &&
				<Box sx={{ minWidth: 380, maxWidth: 380, marginTop: '6em', padding: '20px 0 20px', backgroundColor: '#fff', textAlign: 'center', borderRadius: '4px' }}>
					<LoginForm goToOtherForm={handleChangeForm} submitLogIn={submitLogIn} />
				</Box>
			}
			{typeOfForm === 'signup' &&
				<Box sx={{ marginTop: '6em', padding: '20px 0 20px', backgroundColor: '#fff', textAlign: 'center', borderRadius: '4px' }}>
					<SignUpForm goToOtherForm={handleChangeForm} submitSignUp={submitSignUp} />
				</Box>
			}
		</Box>
	)
}

export default Login
