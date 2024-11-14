import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { isEmpty } from 'lodash';
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
            <Typography variant='h6' sx={{ textAlign: 'justify' }}>
              {' '}
              Description: {project.projectDescription}{' '}
            </Typography>
            <Typography variant='h6' sx={{ fontSize: '20px' }}>
              {' '}
              Type: {currType?.projectTypeName}{' '}
            </Typography>
            <Typography
              variant='h6'
              sx={{
                textAlign: 'justify',
                fontSize: '20px',
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
      {!isEmpty(phaseList) && <ElsePhase phaseList={phaseList} projectStatus={project?.projectStatus} />}
      {isEmpty(phaseList) && (
        <Box sx={{ mt: '40px', ml: '40px' }}>
          <Typography variant='h5'>There is no phase to display</Typography>
        </Box>
      )}
    </Box>
  );
}

export default ElseProject;
