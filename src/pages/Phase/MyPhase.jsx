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
import { formatDate, formatDateToSubmit } from '../../untils/format'

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { Button, InputLabel } from '@mui/material'

function MyPhase({ phaseList }) {
	const [currentId, setCurrentId] = useState(phaseList[0]?._id)
	const index = phaseList.findIndex(phase => phase?._id === currentId)
	const currentPhase = phaseList[index]
	return (
		< Box sx={{ mt: '20px', padding: '20px' }}>
			<Box sx={{ overflow: 'auto', maxWidth: '100%', display: 'flex', gap: '8px' }}>
				{phaseList.map((phase, i) => (
					<Box sx={{
						color: '#6ea033',
						minWidth: '200px',
						maxWidth: '200px',
						padding: '4px 20px',
						textAlign: 'center',
						backgroundColor: index === i ? '#ccc' : '#fff',
						cursor: 'pointer',
						border: '1px solid #6ea033',
						'&:hover': {
							backgroundColor: '#ccc'
						}
					}}
						key={i}
						onClick={() => setCurrentId(phase?._id)}>
						{phase.phaseName}
					</Box>
				))}
			</Box>
			<Box>
				<Box sx={{ mt: '20px', p: '8px' }}>
					<Typography variant='body1' sx={{ mb: '12px', fontSize: '16px !important' }}>
						{currentPhase?.phaseDescription}
					</Typography>
					<Typography variant='body1' sx={{ fontSize: '16px !important' }} ><b>Start Date: </b> {formatDate(currentPhase?.startDate)} </Typography>
					<Typography variant='body1' sx={{ fontSize: '16px !important' }}><b>End Date: </b> {formatDate(currentPhase?.endDate)} </Typography>
				</Box>
				<Box sx={{ minWidth: '200px', maxWidth: '200px' }}>
					<Button fullWidth variant='outlined' startIcon={<AddToPhotosIcon />}
						sx={{
							fontSize: '14px',
							color: '#000',
							border: '1px solid #000',
							'&:hover': {
								border: '1px solid #000',
								opacity: '0.8'
							}
						}}>Create Sample</Button>
				</Box>
				Sample List
			</Box>
		</ Box>
	)
}

export default MyPhase