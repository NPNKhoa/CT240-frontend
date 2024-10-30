import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit';
import { Alert, Button, Dialog, DialogContent, DialogTitle, TextField, Tooltip } from '@mui/material'
import MyPhase from '../Phase/MyPhase'
import { useForm } from 'react-hook-form'
import UpdateProjectForm from './UpdateProjectForm'
import { GetAllPhase, GetUserOnProject } from '../../apis/index'
import { isEmpty } from 'lodash'

function MyProject({ project, type, deleteProject }) {
	const [currType] = useState(type.find(i => i._id === project?.projectType))
	const { register, handleSubmit, formState: { errors } } = useForm()
	const [openForm, setOpenForm] = useState(false)
	const [openUpdate, setOpenUpdate] = useState(false)
	const [userList, setUserList] = useState([])
	const [phaseList, setPhaseList] = useState([])
	useEffect(() => {
		GetAllPhase()
			.then(data => {
				const test = data.filter((i) => i?.projectId === project._id)
				setPhaseList(test)
			})
	}, [project])
	useEffect(() => {
		GetUserOnProject(project?._id)
			.then(res => {
				setUserList(res.data.map(i => i.userId))
			})
	}, [project])

	const handleCloseForm = () => {
		setOpenForm(false)
	}
	const handleDeleteProject = (id) => {
		deleteProject(id)
	}
	const handleCreatePhase = (data) => {
		const dataSubmit = {
			...data,
			startDate: new Date(data.startDate),
			endDate: new Date(data.endDate),
			projectId: project._id
		}
		console.log('dataSubmit: ', JSON.stringify(dataSubmit))

	}
	const handleCloseUpdate = () => {
		setOpenUpdate(false)
	}

	return (
		<Box>
			<Box sx={{ mt: '20px', p: '20px', borderBottom: '1px solid #000' }}>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
					<Box sx={{ maxWidth: '1000px' }}>
						<Typography variant='h6' sx={{ textAlign: 'justify' }}> Description: {project?.projectDescription} </Typography>
						<Typography variant='h6' sx={{ textAlign: 'justify', textTransform: 'capitalize' }}> Status: {project?.projectStatus}</Typography>
						<Typography variant='h6'> Type: {currType?.projectTypeName} </Typography>
					</Box>
					<Box sx={{ minWidth: '160px' }}>
						<Button fullWidth variant='contained' onClick={() => handleDeleteProject(project?._id)}
							sx={{
								fontSize: '14px',
								color: '#fff',
								backgroundColor: 'error.main',
								border: '1px solid error.main',
								'&:hover': {
									border: '1px solid error.main',
									opacity: '0.8',
									backgroundColor: 'error.main'
								}
							}}>Delete Project
						</Button>
					</Box>

				</Box>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: '20px' }}>
					<Box sx={{ display: 'flex', gap: '32px', }}>
						<Box sx={{ minWidth: '200px' }}>
							<Button fullWidth variant='outlined'
								sx={{
									fontSize: '14px',
									color: '#000',
									border: '1px solid #000',
									'&:hover': {
										border: '1px solid #000',
										opacity: '0.8'
									}
								}}>View memberList</Button>
						</Box>

						<Box sx={{ minWidth: '200px' }}>
							<Button fullWidth variant='outlined' startIcon={<AddToPhotosIcon />} onClick={() => setOpenForm(true)}
								sx={{
									fontSize: '14px',
									color: '#000',
									border: '1px solid #000',
									'&:hover': {
										border: '1px solid #000',
										opacity: '0.8'
									}
								}}>Create Phase</Button>
						</Box>
						<Dialog
							open={openForm}
							onClose={handleCloseForm}
						>
							<DialogTitle sx={{ backgroundColor: 'secondary.main', color: '#fff' }}>
								Create New Phase
								<Tooltip title="Close ">
									<CloseIcon onClick={handleCloseForm} sx={{ position: 'absolute', top: '8px', right: '8px', cursor: 'pointer' }} />
								</Tooltip>
							</DialogTitle>
							<DialogContent >
								<form onSubmit={handleSubmit(handleCreatePhase)}>
									<Box sx={{ padding: '1em 1em 1em 1em' }}>

										<Box sx={{
											marginTop: '1.2em',
											'& .MuiFormLabel-root': {
												fontSize: '16px',
												right: 'auto',
												left: '0'
											},
											'&  .MuiOutlinedInput-root ': {
												fontSize: '16px',
												' & .MuiOutlinedInput-notchedOutline': {
													border: '1px solid #000 !important'
												}
											}
										}}>
											<TextField
												fullWidth
												label="Phase Name"
												type="text"
												variant="outlined"
												error={!!errors.phaseName}
												{...register('phaseName', {
													required: 'Please enter phase name.'

												})}
											/>
											{errors.phaseName &&
												<Alert severity="error" sx={{ marginTop: '0.7em', '.MuiAlert-message': { overflow: 'hidden' } }}>
													{errors.phaseName.message}
												</Alert>
											}
										</Box>
										<Box sx={{
											marginTop: '1.2em',
											'& .MuiFormLabel-root': {
												fontSize: '16px',
												right: 'auto',
												left: '0'
											},
											'&  .MuiOutlinedInput-root ': {
												fontSize: '16px',
												' & .MuiOutlinedInput-notchedOutline': {
													border: '1px solid #000 !important'
												}
											}
										}}>
											<TextField
												fullWidth
												label="Phase description"
												type="text"
												autoComplete='off'
												variant="outlined"
												error={!!errors.phaseDescription}
												{...register('phaseDescription', {
													required: 'Please enter phase description.'
												})}
											/>
											{errors.phaseDescription &&
												<Alert severity="error" sx={{ marginTop: '0.7em', '.MuiAlert-message': { overflow: 'hidden' } }}>
													{errors.phaseDescription.message}
												</Alert>
											}
										</Box>
										<Box sx={{ display: 'flex', gap: '20px' }}>
											<Box sx={{
												marginTop: '1.2em',
												minWidth: '200px',
												maxWidth: '200px',
												'& .MuiFormLabel-root': {
													fontSize: '16px',
													right: 'auto',
													left: '0'
												},
												'&  .MuiOutlinedInput-root ': {
													fontSize: '16px',
													' & .MuiOutlinedInput-notchedOutline': {
														border: '1px solid #000 !important'
													}
												}
											}}>
												<TextField
													fullWidth
													type="date"
													variant="outlined"
													label="Start date"
													InputLabelProps={{ shrink: true }}
													error={!!errors.startDate}
													{...register('startDate', {
														required: 'Please enter start date'

													})}
												/>
												{errors.startDate &&
													<Alert severity="error" sx={{ mt: '0.2em', py: '0', '.MuiAlert-message': { overflow: 'hidden' } }}>
														{errors.startDate.message}
													</Alert>
												}

											</Box>
											<Box sx={{
												marginTop: '1.2em',
												minWidth: '200px',
												maxWidth: '200px',
												'& .MuiFormLabel-root': {
													fontSize: '16px',
													right: 'auto',
													left: '0'
												},
												'&  .MuiOutlinedInput-root ': {
													fontSize: '16px',
													' & .MuiOutlinedInput-notchedOutline': {
														border: '1px solid #000 !important'
													}
												}
											}}>
												<TextField
													fullWidth
													type="date"
													variant="outlined"
													label="End date"
													InputLabelProps={{ shrink: true }}
													error={!!errors.endDate}
													{...register('endDate', {
														required: 'Please enter end date'
													})}
												/>
												{errors.endDate &&
													<Alert severity="error" sx={{ mt: '0.2em', py: '0', '.MuiAlert-message': { overflow: 'hidden' } }}>
														{errors.endDate.message}
													</Alert>
												}

											</Box>
										</Box>
									</Box>
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
										Create
									</Button>
								</form>
							</DialogContent>
						</Dialog>
					</Box>


					<Box sx={{ minWidth: '200px' }}>
						<Button fullWidth variant='outlined' endIcon={<EditIcon />} onClick={() => setOpenUpdate(true)}
							sx={{
								fontSize: '14px',
								color: '#000',
								border: '1px solid #000',
								'&:hover': {
									border: '1px solid #000',
									opacity: '0.8'
								}
							}}>Edit project information</Button>
					</Box>
				</Box>
				<Dialog
					open={openUpdate}
					onClose={(handleCloseUpdate)}
					sx={{}}
				>
					<DialogTitle sx={{ backgroundColor: 'secondary.main', color: '#fff' }}>
						Edit Project Information
						<Tooltip title="Close ">
							<CloseIcon onClick={handleCloseUpdate} sx={{ position: 'absolute', top: '8px', right: '8px', cursor: 'pointer' }} />
						</Tooltip>
					</DialogTitle>
					<DialogContent >
						<UpdateProjectForm projectInfo={project} typeList={type} />
					</DialogContent>
				</Dialog>
			</Box>
			{!isEmpty(phaseList) &&
				<MyPhase phaseList={phaseList} />
			}
			{isEmpty(phaseList) &&
				<Box sx={{ mt: '40px', ml: '40px' }}>
					<Typography variant='h5'  >No a phase yet.</Typography>
				</Box>
			}
		</Box>
	)
}

export default MyProject