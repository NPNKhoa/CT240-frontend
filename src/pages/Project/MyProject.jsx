import { useState } from 'react'
import AppBar from '@mui/material/AppBar'

import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { isEmpty } from 'lodash'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import CloseIcon from '@mui/icons-material/Close'

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { Alert, Button, Dialog, DialogContent, DialogTitle, InputLabel, TextField, Tooltip } from '@mui/material'
import MyPhase from '../Phase/MyPhase'
import { useForm } from 'react-hook-form'

function MyProject({ project }) {
	const { register, handleSubmit, formState: { errors } } = useForm()
	const [typeList, setTypeList] = useState(['123', '456', '789', '000'])
	const [projectType, setProjectType] = useState('123')
	const [openForm, setOpenForm] = useState(false)
	const handleCloseForm = () => {
		setOpenForm(false)
	}
	const handleCreatePhase = (data) => {
		console.log(data)

	}
	return (
		<Box>
			<Box sx={{ mt: '20px', p: '20px', borderBottom: '1px solid #000' }}>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', }}>
					<Box sx={{ maxWidth: '1000px' }}>
						<Typography variant='h6' sx={{ textAlign: 'justify' }}>  $project.des Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem repellat incidunt ad suscipit natus, dicta illum commodi perferendis odio accusamus autem ullam voluptatibus nesciunt obcaecati labore laboriosam quisquam omnis velit officia in rerum ipsa quo. Unde similique reiciendis ad, facere nisi voluptas, excepturi reprehenderit sunt iusto alias consequatur labore. Nemo? </Typography>
						<Typography variant='h6' sx={{ textAlign: 'justify' }}>  Status: Project status </Typography>
					</Box>
					<Box sx={{ minWidth: '160px' }}>
						<Button fullWidth variant='contained'
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

					<Box
						sx={{
							maxWidth: {
								xs: '100%',
								md: '200px'
							},
							minWidth: {
								xs: '100%',
								md: '200px'
							},
							mb: '8px',
							background: 'transparent',
							'& .MuiInputBase-root': {
								color: 'primary.dark',
								fontSize: '18px',
								'& div': {
									p: ' 8px 12px'
								},
								'& fieldset': {
									borderColor: '#000 !important',
								},

								'& .MuiOutlinedInput-notchedOutline': {
									border: '1px solid #000',
									borderColor: '#000'
								}
							},
							'& .MuiFormLabel-root': {
								fontSize: '16px',
								right: 'auto',
								left: '0',
								bottom: '16px',
								lineHeight: '1.4375em',
								backgroundColor: '#fff'
							},
						}}>
						<FormControl fullWidth>
							<InputLabel size='small' variant="outlined" id="project-type" >Project Type</InputLabel>
							<Select
								labelId='project-type'
								value={projectType}
								inputProps={{ MenuProps: { disableScrollLock: true } }}
								onChange={(e) => { setProjectType(e.target.value) }}
								defaultValue=''
							>
								{!isEmpty(typeList) && typeList.map((item, index) => (
									<MenuItem key={index} value={`${item}`}>{`${item}`}</MenuItem>
								))}
							</Select>
						</FormControl>
					</Box>



				</Box>
			</Box>
			<MyPhase />
		</Box>
	)
}

export default MyProject