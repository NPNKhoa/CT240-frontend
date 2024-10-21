import { useState } from 'react'
import Box from '@mui/material/Box'
import LoginForm from './Form/LoginForm'
import SignUpForm from './Form/SignUpForm'


function Login() {
	const [typeOfForm, setTypeOfForm] = useState('login')
	const handleChangeForm = (type) => {
		setTypeOfForm(type)
	}
	return (
		<Box sx={{
			display: 'flex',
			flexDirection: 'column',
			minHeight: '100vh',
			alignItems: 'center',
			justifyContent: 'flex-start',
			background: 'url("https://elearning.ctu.edu.vn/pluginfile.php/1/theme_lambda2/login_bg_img_1/1725094192/RLC.jpg")',
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.6)'
		}}>
			<Box sx={{ minWidth: 380, maxWidth: 380, marginTop: '6em', padding: '20px 0 20px', backgroundColor: '#fff', textAlign: 'center', borderRadius: '4px' }}>

				{typeOfForm === 'login' && <LoginForm goToOtherForm={handleChangeForm} />}
				{typeOfForm === 'signup' && <SignUpForm goToOtherForm={handleChangeForm} />}

			</Box>
		</Box>
	)
}

export default Login
