import { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'
import AppBar from '@mui/material/AppBar'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { isEmpty } from 'lodash'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import Overview from './Overview'
import MyProject from '../Project/MyProject'
import ElseProject from '../Project/ElseProject'
import { Alert, Button, InputLabel, TextField } from '@mui/material'

function Home() {
	const { register, handleSubmit, formState: { errors } } = useForm()

	const DRAWER_WIDTH = '320px'
	const [openDrawer, setOpenDrawer] = useState(true)
	const [openForm, setOpenForm] = useState(false)
	const [title, setTitle] = useState('Overview')
	const [projectOnclick, setProjectOnclick] = useState(undefined)

	const [typeList, setTypeList] = useState(['123', '456', '789', '000'])

	const [projectType, setProjectType] = useState('123')
	// const [MyProjectList, setMyProjectList] = useState([])
	const [MyProjectList, setMyProjectList] = useState([{ projectName: 'Project name 01' }, { projectName: 'Project name 02' }, { projectName: 'Project name 03' }])
	const [elseProjectList, setElseProjectList] = useState([{ projectName: 'Else project name 01' }, { projectName: 'Else project name 02' }, { projectName: 'Else project name 03' }])
	// const [elseProjectList, setElseProjectList] = useState([])

	const handleToggleDrawer = () => {
		setOpenDrawer(!openDrawer)
	}
	const handleChangeNav = (item) => {
		setTitle(item)
	}
	const handleCreateProject = (formData) => {
		const { projectName, projectDescription, projectStatus } = formData
		const data = { projectName, projectDescription, projectStatus, projectType, projectCreateDate: new Date(), }
		console.log('data: ', data)
	}
	const handleOpenForm = () => {
		setOpenForm(true)
	}
	const handleColseForm = () => {
		setOpenForm(false)
	}
	const handleChangeProject = (project) => {
		setProjectOnclick(project)
		setTitle(project.projectName)
	}
	return (
		<Box sx={{ backgroundColor: '#fff' }}>
			<Box sx={{ display: 'flex' }}>
				<Box sx={{ ml: openDrawer ? DRAWER_WIDTH : '0', mr: `-${DRAWER_WIDTH}`, flexGrow: '1', width: '100%' }} >
					<AppBar position="static">
						<Toolbar>
							{!openDrawer &&
								<IconButton
									size="large"
									edge="start"
									color="inherit"
									sx={{ mr: 2 }}
									onClick={handleToggleDrawer}
								>
									<MenuIcon />
								</IconButton>
							}

							<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
								{title}
							</Typography>

						</Toolbar>
					</AppBar>
				</Box>

				<Drawer
					sx={{
						width: DRAWER_WIDTH,
						flexShrink: 0,
						'& .MuiDrawer-paper': {
							width: DRAWER_WIDTH,
							boxSizing: 'border-box',

							backgroundColor: 'secondary.main',
							color: 'primary.main'
						}
					}}
					variant="persistent"
					anchor="left"
					open={openDrawer}
				>
					<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 8px 15px 20px' }}>
						<Typography variant='h5'>Sample Collecting</Typography>
						<IconButton onClick={handleToggleDrawer}
							sx={{
								border: '1px solid ',
								padding: '4px',
								color: 'primary.main'
							}}>
							<ChevronLeftIcon sx={{
								transform: 'scale(1.2)'
							}} />
						</IconButton>
					</Box>
					<Divider />
					<List>
						<ListItem disablePadding onClick={() => handleChangeNav('Overview')}
							sx={{ backgroundColor: 'Overview' === title ? '#6ea033' : 'transparent' }}
						>
							<ListItemButton>
								<ListItemText primary={'Overview'} />
							</ListItemButton>
						</ListItem>
					</List>
					<Divider textAlign='left'><Chip label="My Project" size="medium" sx={{ color: '#fff ' }} /></Divider>
					<Box>
						<List>
							{isEmpty(MyProjectList) &&
								<ListItem disablePadding >
									<Typography variant='body1' sx={{ overflow: 'hidden', textOverflow: 'ellipsis', padding: '0 12px', fontSize: '16px !important' }}>
										You do not have any projects yet.
									</Typography>
								</ListItem>}

							{MyProjectList?.map((project, index) => (
								<ListItem disablePadding key={index}>
									<ListItemButton onClick={() => handleChangeProject(project)} >
										<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
											<Typography variant='body1' sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{project.projectName}</Typography>
											<Button variant='outlined' sx={{ fontSize: '10px', maxWidth: '20px' }}>projectType</Button>
										</Box>

									</ListItemButton>
								</ListItem>
							))}

							<Button
								variant='outlined'
								fullWidth
								startIcon={<AddToPhotosIcon />}
								sx={{ fontSize: '14px', mt: '20px' }}
								onClick={handleOpenForm}
							>
								Create New Project
							</Button>
						</List>
						<Dialog
							open={openForm}
							onClose={handleColseForm}
							sx={{ '& .MuiPaper-root': { minWidth: '1200px', maxWidth: '1200px' } }}
						>
							<DialogTitle sx={{ backgroundColor: 'secondary.main', color: '#fff' }}>
								Create New Project
								<Tooltip title="Close ">
									<CloseIcon onClick={handleColseForm} sx={{ position: 'absolute', top: '8px', right: '8px', cursor: 'pointer' }} />
								</Tooltip>
							</DialogTitle>
							<DialogContent >
								<form onSubmit={handleSubmit(handleCreateProject)}>
									<Box sx={{ padding: '1em 1em 1em 1em' }}>
										<Box
											sx={{
												maxWidth: '200px',
												minWidth: '200px',
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
												label="Project Name"
												type="text"
												variant="outlined"
												error={!!errors.projectName}
												{...register('projectName', {
													required: 'Please enter project name.'

												})}
											/>
											{errors.projectName &&
												<Alert severity="error" sx={{ marginTop: '0.7em', '.MuiAlert-message': { overflow: 'hidden' } }}>
													{errors.projectName.message}
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
												label="Description"
												type="text"
												autoComplete='off'
												variant="outlined"
												error={!!errors.projectStatus}
												{...register('projectStatus')}
											/>
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
												label="Status"
												type="text"
												autoComplete='off'
												variant="outlined"
												error={!!errors.projectStatus}
												{...register('projectStatus', {
													required: 'Please enter project status.'

												})}
											/>
											{errors.projectStatus &&
												<Alert severity="error" sx={{ marginTop: '0.7em', '.MuiAlert-message': { overflow: 'hidden' } }}>
													{errors.projectStatus.message}
												</Alert>
											}
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

					<Divider textAlign='left'><Chip label="Project Has Joined" size="medium" sx={{ color: '#fff ' }} /></Divider>
					<Box>
						{isEmpty(elseProjectList) && <ListItem disablePadding >
							<Typography variant='body1' sx={{ overflow: 'hidden', textOverflow: 'ellipsis', padding: '0 12px', fontSize: '16px !important', mt: '20px' }}>
								You have not participated in any projects yet.
							</Typography>
						</ListItem>
						}
						{elseProjectList?.map((project, index) => (
							<ListItem disablePadding key={index}>
								<ListItemButton onClick={() => handleChangeProject(project)} >
									<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
										<Typography variant='body1' sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{project.projectName}</Typography>
										<Button variant='outlined' sx={{ fontSize: '10px', maxWidth: '20px' }}>projectType</Button>
									</Box>
								</ListItemButton>
							</ListItem>
						))}
					</Box>
				</Drawer>

			</Box>
			<Box sx={{
				ml: openDrawer ? DRAWER_WIDTH : '0', mr: `-${DRAWER_WIDTH}`, width: openDrawer ? `calc(100% - ${DRAWER_WIDTH})` : '100%'
			}}>
				{title === 'Overview' &&
					<Overview />
				}
				{title !== 'Overview' && MyProjectList.includes(projectOnclick) &&
					<MyProject project={projectOnclick} />

				}
				{title !== 'Overview' && elseProjectList.includes(projectOnclick) &&
					<ElseProject project={projectOnclick} />
				}
			</Box>
		</Box>
	)
}

export default Home
