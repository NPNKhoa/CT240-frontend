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

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { Button, InputLabel } from '@mui/material'
import ElsePhase from '../Phase/ElsePhase'
function ElseProject({ project }) {
	return (
		<Box >
			<Box sx={{ mt: '20px', p: '20px', borderBottom: '1px solid #000' }}>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', }}>
					<Box sx={{ maxWidth: '1000px' }}>
						<Typography variant='h5'> {'$project manager\' Project'} </Typography>
						<Typography variant='h6' sx={{ m: '12px 0', textAlign: 'justify' }}> Description: $project.des Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem repellat incidunt ad suscipit natus, dicta illum commodi perferendis odio accusamus autem ullam voluptatibus nesciunt obcaecati labore laboriosam quisquam omnis velit officia in rerum ipsa quo. Unde similique reiciendis ad, facere nisi voluptas, excepturi reprehenderit sunt iusto alias consequatur labore. Nemo? </Typography>
						<Typography variant='h6'> Type: Project Type </Typography>
						<Typography variant='h6' sx={{ textAlign: 'justify' }}>  Status: Project status </Typography>

					</Box>

				</Box>

			</Box>
			<ElsePhase />
		</Box>
	)
}

export default ElseProject