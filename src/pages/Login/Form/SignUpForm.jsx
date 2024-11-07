/* eslint-disable no-console */
import { Alert, Box, Button, CardActions, TextField, Typography, Zoom } from '@mui/material'
import { Card as MuiCard } from '@mui/material'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { SignUp_API } from '../../../apis'

function SignUpForm({ goToOtherForm, submitSignUp }) {
	const { register, handleSubmit, formState: { errors }, watch } = useForm()
	const password = useRef({})
	const age = useRef({})
	password.current = watch('password', '')
	age.current = watch('age', '')
	const submitSignIn = (data) => {
		const { fullName, address, dateOfBirth, username, password, email } = data // remove confirmPassWork
		const dataSubmit = {
			fullName,
			dateOfBirth: new Date(dateOfBirth),
			age: new Date().getFullYear() - new Date(data.dateOfBirth).getFullYear(),
			address,
			username,
			password,
			email
		}

		submitSignUp(dataSubmit)
		// console.log('dataSubmit: ', JSON.stringify(dataSubmit))
	}
	return (
		<form onSubmit={handleSubmit(submitSignIn)}>
			<Zoom in={true} >
				<MuiCard sx={{ boxShadow: 'none' }} >
					<Box >
						<Typography sx={{ textAlign: 'center', p: '12px' }} variant='h4'>SAMPLE COLLECTING</Typography>
						<Typography sx={{ textAlign: 'left', pl: '12px', mb: '20px', color: 'secondary.main', fontWeight: 'bold' }} variant='h5'>SIGN UP</Typography>
					</Box>
					<Box sx={{ padding: '0 1em 1em 1em', display: 'flex', gap: '32px' }}>
						<Box>
							<Typography sx={{ textAlign: 'left', color: 'secondary.main' }} variant='h6'>Your Information</Typography>
							<Box sx={{
								marginTop: '0.6em',
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
									label="Email"
									type="text"
									variant="outlined"
									error={!!errors.email}
									{...register('email', {
										required: 'This field is required.'
									})}
								/>
								{errors.email &&
									<Alert severity="error" sx={{ mt: '0.2em', py: '0', '.MuiAlert-message': { overflow: 'hidden' } }}>
										{errors.email.message}
									</Alert>
								}
							</Box>
							<Box sx={{
								marginTop: '0.6em',
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
									label="Fullname"
									type="text"
									variant="outlined"
									error={!!errors.fullName}
									{...register('fullName', {
										required: 'Please enter your full name.'
									})}
								/>
								{errors.fullName &&
									<Alert severity="error" sx={{ mt: '0.2em', py: '0', '.MuiAlert-message': { overflow: 'hidden' } }}>
										{errors.fullName.message}
									</Alert>
								}
							</Box>
							<Box sx={{
								marginTop: '0.6em',
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
									label="Address"
									type="text"
									variant="outlined"
									error={!!errors.address}
									{...register('address', {
										required: 'Please enter your address.',
										minLength: {
											value: 8,
											message: 'Address must have at least 10 characters.'
										}
									})}
								/>
								{errors.address &&
									<Alert severity="error" sx={{ mt: '0.2em', py: '0', '.MuiAlert-message': { overflow: 'hidden' } }}>
										{errors.address.message}
									</Alert>
								}

							</Box>
							<Box sx={{
								marginTop: '0.6em',
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
									type="date"
									variant="outlined"
									label="Date of birth"
									InputLabelProps={{ shrink: true }}
									error={!!errors.dateOfBirth}
									{...register('dateOfBirth', {
										required: 'Please enter your date of birth.',
										validate: value => {
											if (new Date().getFullYear() - new Date(value).getFullYear() < 18)
												return 'You must be at least 18 years old.'
										}

									})}
								/>
								{errors.dateOfBirth &&
									<Alert severity="error" sx={{ mt: '0.2em', py: '0', '.MuiAlert-message': { overflow: 'hidden' } }}>
										{errors.dateOfBirth.message}
									</Alert>
								}

							</Box>
						</Box>
						<Box>
							<Typography sx={{ textAlign: 'left', color: 'secondary.main' }} variant='h6'>Your Account </Typography>

							<Box sx={{
								marginTop: '0.6em',
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
									<Alert severity="error" sx={{ marginTop: '0.2em', py: '0', '.MuiAlert-message': { overflow: 'hidden' } }}>
										{errors.username.message}
									</Alert>
								}
							</Box>

							<Box sx={{
								marginTop: '0.6em',
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
									<Alert severity="error" sx={{ marginTop: '0.2em', py: '0', '.MuiAlert-message': { overflow: 'hidden' } }}>
										{errors.password.message}
									</Alert>
								}

							</Box>

							<Box sx={{
								marginTop: '0.6em',
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
									label="Confirm Password"
									autoComplete='off'
									type="password"
									variant="outlined"
									error={!!errors.confirmPassword}
									{...register('confirmPassword', {
										validate: value =>
											value === password.current || 'The passwords do not match.'
									})}
								/>
								{errors.confirmPassword &&
									<Alert severity="error" sx={{ marginTop: '0.2em', py: '0', '.MuiAlert-message': { overflow: 'hidden' } }}>
										{errors.confirmPassword.message}
									</Alert>
								}
							</Box>

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
							SIGN UP
						</Button>
					</CardActions>
					<Typography variant='body1'>Already a user ?
						<Button
							variant='text'
							sx={{ color: 'secondary.main', fontWeight: '700' }}
							onClick={() => goToOtherForm('login')}
						>
							Login
						</Button>
					</Typography>
				</MuiCard>
			</Zoom>

		</form>
	)
}

export default SignUpForm
