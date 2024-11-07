import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import useMediaQuery from '@mui/material/useMediaQuery';
import ElseSample from '../Sample/ElseSample';
import { formatDate } from '../../untils/format';
import { GetAllSample } from '../../apis';

function ElsePhase({ phaseList }) {
  const [currentId, setCurrentId] = useState(phaseList[0]?._id);
  const index = phaseList.findIndex((phase) => phase?._id === currentId);
  const currentPhase = phaseList[index];

  // Kiểm tra nếu màn hình ở chế độ mobile
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    setCurrentId(phaseList[0]?._id);
  }, [phaseList]);

  const [sampleList, setSampleList] = useState([]);
  useEffect(() => {
    GetAllSample().then((data) => {
      const test = data.map((i) => {
        return {
          ...i,
          phaseId: i.phaseId?._id,
          projectId: i.phaseId?.projectId,
        };
      });
      setSampleList(test);
    });
  }, []);

  return (
    <Box sx={{ padding: '20px', mt: '20px' }}>
      {isMobile ? (
        // Dropdown cho chế độ mobile
        <Select
          value={currentId}
          onChange={(e) => setCurrentId(e.target.value)}
          fullWidth
          sx={{background: '#6ea033',
            '&:hover': {
                  opacity: 0.8,
                },
          }}
        >
          {phaseList.map((phase) => (
            <MenuItem key={phase._id} value={phase._id}
            sx={{
              fontSize: '15px',
              '&:hover': {
                  opacity: 0.8,
                },
            }}
            >
              {phase.phaseName}
            </MenuItem>
          ))}
        </Select>
      ) : (
        // Danh sách phase cho các thiết bị lớn hơn mobile
        <Box sx={{ overflow: 'auto', maxWidth: '100%', display: 'flex', gap: '8px' }}>
          {phaseList.map((phase, i) => (
            <Box
              key={i}
              sx={{
                color: index === i ? '#fff' : '#6ea033',
                fontSize: { xs: '0.75rem !important', lg: '1rem !important' },
                fontWeight: 500,
                minWidth: '200px',
                maxWidth: '200px',
                padding: '0.5rem 0.75rem',
                textAlign: 'center',
                backgroundColor: index === i ? '#6ea033' : '#fff',
                cursor: 'pointer',
                border: '1px solid #6ea033',
                borderRadius: '0.3rem',
                '&:hover': {
                  opacity: 0.8,
                },
              }}
              onClick={() => setCurrentId(phase?._id)}
            >
              {phase.phaseName}
            </Box>
          ))}
        </Box>
      )}
      <Box>
        <Box sx={{ mt: '20px', p: '8px' }}>
          <Typography
            variant='body1'
            sx={{ mb: '12px', fontSize: { xs: '0.75rem !important', lg: '1rem !important' } }}
          >
            {currentPhase?.phaseDescription}
          </Typography>
          <Typography variant='body1' sx={{ fontSize: { xs: '1rem !important', lg: '1rem !important' } }}>
            <b>Start Date: </b> {formatDate(currentPhase?.startDate)}{' '}
          </Typography>
          <Typography variant='body1' sx={{ fontSize: { xs: '1rem !important', lg: '1rem !important' } }}>
            <b>End Date: </b> {formatDate(currentPhase?.endDate)}{' '}
          </Typography>
        </Box>
        <ElseSample
          sampleList={sampleList.filter(
            (i) => i?.phaseId === currentPhase?._id
          )}
        />
      </Box>
    </Box>
  );
}

export default ElsePhase;
