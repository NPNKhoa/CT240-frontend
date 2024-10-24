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
import ElseSample from '../Sample/ElseSample'
function ElsePhase() {
	return (
		<Box sx={{ padding: '20px' }}>
			<Box>
				<Typography variant='h5' sx={{ mb: '12px', fontWeight: 'bold', color: 'secondary.main' }}>Phase Name</Typography>
				<Typography variant='body1' sx={{ mb: '12px', fontSize: '16px !important' }}>
					Phase Description Lorem ipsum dolor sit amet consectetur, adipisicing elit.
					Excepturi, totam nobis architecto tempore error veritatis inventore? At minima minus hic necessitatibus,
					inventore similique suscipit doloribus molestiae a voluptate modi laboriosam provident nobis corporis neque
					atque numquam earum praesentium vitae, impedit tenetur? Atque quis enim ipsam, similique nihil assumenda quo eum.
				</Typography>
				<Typography variant='body1' sx={{ fontSize: '16px !important' }} ><b>Start Date: </b> $startDate </Typography>
				<Typography variant='body1' sx={{ fontSize: '16px !important' }}><b>End Date: </b> $startDate </Typography>
			</Box>
			<ElseSample />
		</Box>
	)
}

export default ElsePhase