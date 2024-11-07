/* eslint-disable no-console */
import { Alert, Box, Button, CardActions, TextField, Typography, Zoom } from '@mui/material'
import { Card as MuiCard } from '@mui/material'
import { useForm } from 'react-hook-form'

function LoginForm({ goToOtherForm, submitLogIn }) {
	const { register, handleSubmit, formState: { errors } } = useForm()
	const handleSubmitForm = async (data) => {
		await submitLogIn(data)
	}
	return (
		<form onSubmit={handleSubmit(handleSubmitForm)}>
			<Zoom in={true} >
				<MuiCard sx={{ boxShadow: 'none' }} >
					<Box >
						<Typography sx={{ textAlign: 'center', p: '12px' }} variant='h4'>SAMPLE COLLECTING</Typography>
						<Typography sx={{ textAlign: 'left', pl: '12px', color: 'secondary.main' }} variant='h5'>LOGIN</Typography>
					</Box>
					<Box sx={{ padding: '0 1em 1em 1em' }}>
						<Box sx={{
							marginTop: '1.2em',
							'& .MuiFormLabel-root': {
								fontSize: { xs: '0.75rem !important', lg: '1rem !important' },
								right: 'auto',
								left: '0'
							},
							'&  .MuiOutlinedInput-root ': {
								fontSize: { xs: '0.75rem !important', lg: '1rem !important' },
								' & .MuiOutlinedInput-notchedOutline': {
									border: '1px solid #000 !important'
								}
							}
						}}>
							<TextField
								fullWidth
								label="Username"
								type="text"
								variant="outlined"
								error={!!errors.username}
								{...register('username', {
									required: 'Please enter username.',
									minLength: {
										value: 8,
										message: 'Username must have at least 8 characters.'
									}
								})}
							/>
							{errors.username &&
								<Alert severity="error" sx={{ marginTop: '0.7em', '.MuiAlert-message': { overflow: 'hidden' } }}>
									{errors.username.message}
								</Alert>
							}
						</Box>

						<Box sx={{
							marginTop: '1.2em',
							'& .MuiFormLabel-root': {
								fontSize: { xs: '0.75rem !important', lg: '1rem !important' },
								right: 'auto',
								left: '0'
							},
							'&  .MuiOutlinedInput-root ': {
								fontSize: { xs: '0.75rem !important', lg: '1rem !important' },
								' & .MuiOutlinedInput-notchedOutline': {
									border: '1px solid #000 !important'
								}
							}
						}}>
							<TextField
								fullWidth
								label="Password"
								type="password"
								autoComplete='off'
								variant="outlined"
								error={!!errors.password}
								{...register('password', {
									required: 'Please enter password.',
									minLength: {
										value: 8,
										message: 'Password must have at least 8 characters.'
									}
								})}
							/>
							{errors.password &&
								<Alert severity="error" sx={{ marginTop: '0.7em', '.MuiAlert-message': { overflow: 'hidden' } }}>
									{errors.password.message}
								</Alert>
							}

						</Box>

					</Box>

					<CardActions sx={{ padding: '0.5em 1em 1em 1em' }}>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							size="large"
							fullWidth
							sx={{
								backgroundColor: 'secondary.main',
								color: 'primary.main',
								transition: 'all linear .3s',
								'&:hover': {
									backgroundColor: 'secondary.main',
									opacity: '0.9'
								}
							}}
						>
							LOGIN
						</Button>
					</CardActions>
					<Typography variant='body1'>Not a Member ?
						<Button
							variant='text'
							sx={{ color: 'secondary.main', fontWeight: '700' }}
							onClick={() => goToOtherForm('signup')}
						>
							Signup
						</Button>
					</Typography>
				</MuiCard>
			</Zoom>

		</form>
	)
}

export default LoginForm
