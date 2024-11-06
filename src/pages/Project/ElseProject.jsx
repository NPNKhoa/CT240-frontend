import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { isEmpty } from 'lodash';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Button, InputLabel } from '@mui/material';

import { GetAllPhase } from '../../apis/index';
import ElsePhase from '../Phase/ElsePhase';
function ElseProject({ project, type }) {
  const [currType] = useState(type.find((i) => i._id === project?.projectType));
  const [phaseList, setPhaseList] = useState([]);
  const token = localStorage.getItem('Authorization');
  const [colorStatus] = useState({
    active: 'blue',
    completed: 'green',
    canceled: 'red',
  });
  useEffect(() => {
    GetAllPhase(token).then((data) => {
      const test = data.filter((i) => i?.projectId === project._id);
      setPhaseList(test);
    });
  }, [project]);
  return (
    <Box>
      <Box sx={{ mt: '20px', p: '20px', borderBottom: '1px solid #000' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Box sx={{ maxWidth: '1000px' }}>
            <Typography variant='h5' sx={{ m: '12px 0', textAlign: 'justify' }}>
              {' '}
              Description: {project.projectDescription}{' '}
            </Typography>
            <Typography variant='h6'>
              {' '}
              Type: {currType?.projectTypeName}{' '}
            </Typography>
            <Typography
              variant='h6'
              sx={{
                textAlign: 'justify',
                textTransform: 'capitalize',
                '& span': { color: colorStatus[project?.projectStatus] },
              }}
            >
              {' '}
              Status: <span> {project?.projectStatus}</span>
            </Typography>
          </Box>
        </Box>
      </Box>
      {!isEmpty(phaseList) && <ElsePhase phaseList={phaseList} />}
      {isEmpty(phaseList) && (
        <Box sx={{ mt: '40px', ml: '40px' }}>
          <Typography variant='h5'>There are no phases to display</Typography>
        </Box>
      )}
    </Box>
  );
}

export default ElseProject;
