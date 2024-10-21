import { useEffect, useState } from 'react'
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

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

function Home() {
	const DRAWER_WIDTH = '320px'
	const [openDrawer, setOpenDrawer] = useState(true)
	const [title, setTitle] = useState('Giới thiệu')
	const [projectList, setProjectList] = useState([{ projectName: 'Project name 01' }, { projectName: 'Project name 02' }, { projectName: 'Project name 03' }])

	const handleToggleDrawer = () => {
		setOpenDrawer(!openDrawer)
	}
	const handleChangeNav = (item) => {
		setTitle(item)
	}
	return (
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
					<ListItem disablePadding onClick={() => handleChangeNav('Giới thiệu')}
						sx={{ backgroundColor: 'Giới thiệu' === title ? '#49664c' : 'transparent' }}
					>
						<ListItemButton>
							<ListItemText primary={'Giới thiệu'} />
						</ListItemButton>
					</ListItem>
				</List>
				<Divider textAlign='left'><Chip label="Dự án của tôi" size="medium" sx={{ color: '#fff ' }} /></Divider>
				<Box>
					{isEmpty(projectList) && <p>Tạo dự án mới</p>}
					<List>
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemText primary={'áđâsđá'} />
							</ListItemButton>
						</ListItem>
					</List>
				</Box>
				<Divider textAlign='left'><Chip label="Dự án tôi đã tham gia" size="medium" sx={{ color: '#fff ' }} /></Divider>
				<Box>
					{isEmpty(projectList) && <p>Bạn chưa tham gia dự án nào</p>}
					<List>
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemText primary={'áđâsđá'} />
							</ListItemButton>
						</ListItem>
					</List>
				</Box>
			</Drawer>
		</Box>
	)
}

export default Home