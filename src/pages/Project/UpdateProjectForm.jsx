import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { isEmpty } from 'lodash';
import { Alert, Button, InputLabel, TextField } from '@mui/material';
import { formatDateForTextField } from '../../untils/format';

function UpdateProjectForm({ projectInfoProp, typeList, updateProject }) {
  const token = localStorage.getItem('Authorization');
  const [projectInfo, setProjectInfo] = useState({ ...projectInfoProp });
  const [projectType, setProjectType] = useState(projectInfo?.projectType);
  const [projectStatus, setProjectStatus] = useState(
    projectInfo?.projectStatus
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleUpdateProject = (data) => {
    const dataSubmit = {
      ...data,
      projectType,
      projectStatus,
    };
    updateProject(token, projectInfo?._id, dataSubmit);
  };
  return (
    <form onSubmit={handleSubmit(handleUpdateProject)}>
      <Box sx={{ padding: '1em 1em 1em 1em' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box
            sx={{
              maxWidth: {
                xs: '100%',
                md: '200px',
              },
              minWidth: {
                xs: '100%',
                md: '200px',
              },
              mb: '8px',
              background: 'transparent',
              '& .MuiInputBase-root': {
                color: 'primary.dark',
                fontSize: '18px',
                '& div': {
                  p: ' 8px 12px',
                },
                '& fieldset': {
                  borderColor: '#000 !important',
                },

                '& .MuiOutlinedInput-notchedOutline': {
                  border: '1px solid #000',
                  borderColor: '#000',
                },
              },
              '& .MuiFormLabel-root': {
                fontSize: '16px',
                right: 'auto',
                left: '0',
                bottom: '16px',
                lineHeight: '1.4375em',
                backgroundColor: '#fff',
              },
            }}
          >
            <FormControl fullWidth>
              <InputLabel size='small' variant='outlined' id='project-type'>
                Project Type
              </InputLabel>
              <Select
                labelId='project-type'
                value={projectType || ''}
                inputProps={{ MenuProps: { disableScrollLock: true } }}
                onChange={(e) => {
                  setProjectType(e.target.value);
                }}
                defaultValue={projectType || ''}
              >
                {!isEmpty(typeList) &&
                  typeList?.map((item, index) => (
                    <MenuItem
                      key={index}
                      value={`${item?._id}`}
                    >{`${item.projectTypeName}`}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
          <Box
            sx={{
              maxWidth: {
                xs: '100%',
                md: '200px',
              },
              minWidth: {
                xs: '100%',
                md: '200px',
              },
              mb: '8px',
              background: 'transparent',
              '& .MuiInputBase-root': {
                color: 'primary.dark',
                fontSize: '18px',
                '& div': {
                  p: ' 8px 12px',
                },
                '& fieldset': {
                  borderColor: '#000 !important',
                },

                '& .MuiOutlinedInput-notchedOutline': {
                  border: '1px solid #000',
                  borderColor: '#000',
                },
              },
              '& .MuiFormLabel-root': {
                fontSize: '16px',
                right: 'auto',
                left: '0',
                bottom: '16px',
                lineHeight: '1.4375em',
                backgroundColor: '#fff',
              },
            }}
          >
            <FormControl fullWidth>
              <InputLabel size='small' variant='outlined' id='project-type'>
                Project Status
              </InputLabel>
              <Select
                labelId='project-type'
                value={projectStatus || ''}
                inputProps={{ MenuProps: { disableScrollLock: true } }}
                onChange={(e) => {
                  setProjectStatus(e.target.value);
                }}
                defaultValue={projectStatus || ''}
              >
                <MenuItem value='active'>Active</MenuItem>
                <MenuItem value='completed'>Completed</MenuItem>
                <MenuItem value='canceled'>Canceled</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Box
          sx={{
            marginTop: '1.2em',
            '& .MuiFormLabel-root': {
              fontSize: '16px',
              right: 'auto',
              left: '0',
            },
            '&  .MuiOutlinedInput-root ': {
              fontSize: '16px',
              ' & .MuiOutlinedInput-notchedOutline': {
                border: '1px solid #000 !important',
              },
            },
          }}
        >
          <TextField
            fullWidth
            label='Project Name'
            type='text'
            defaultValue={projectInfo?.projectName}
            variant='outlined'
            error={!!errors.projectName}
            {...register('projectName', {
              required: 'Please enter project name.',
            })}
          />
          {errors.projectName && (
            <Alert
              severity='error'
              sx={{
                marginTop: '0.7em',
                '.MuiAlert-message': { overflow: 'hidden' },
              }}
            >
              {errors.projectName.message}
            </Alert>
          )}
        </Box>
        <Box
          sx={{
            marginTop: '1.2em',
            '& .MuiFormLabel-root': {
              fontSize: '16px',
              right: 'auto',
              left: '0',
            },
            '&  .MuiOutlinedInput-root ': {
              fontSize: '16px',
              ' & .MuiOutlinedInput-notchedOutline': {
                border: '1px solid #000 !important',
              },
            },
          }}
        >
          <TextField
            fullWidth
            label='Description'
            type='text'
            autoComplete='off'
            defaultValue={projectInfo?.projectName}
            variant='outlined'
            error={!!errors.projectDescription}
            {...register('projectDescription')}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <Box
            sx={{
              marginTop: '1.2em',
              minWidth: '200px',
              maxWidth: '200px',
              '& .MuiFormLabel-root': {
                fontSize: '16px',
                right: 'auto',
                left: '0',
              },
              '&  .MuiOutlinedInput-root ': {
                fontSize: '16px',
                ' & .MuiOutlinedInput-notchedOutline': {
                  border: '1px solid #000 !important',
                },
              },
            }}
          >
            <TextField
              fullWidth
              type='date'
              variant='outlined'
              label='Start date'
              defaultValue={formatDateForTextField(projectInfo?.startDate)}
              InputLabelProps={{ shrink: true }}
              error={!!errors.startDate}
              {...register('startDate', {
                required: 'Please enter start date',
              })}
            />
            {errors.startDate && (
              <Alert
                severity='error'
                sx={{
                  mt: '0.2em',
                  py: '0',
                  '.MuiAlert-message': { overflow: 'hidden' },
                }}
              >
                {errors.startDate.message}
              </Alert>
            )}
          </Box>
          <Box
            sx={{
              marginTop: '1.2em',
              minWidth: '200px',
              maxWidth: '200px',
              '& .MuiFormLabel-root': {
                fontSize: '16px',
                right: 'auto',
                left: '0',
              },
              '&  .MuiOutlinedInput-root ': {
                fontSize: '16px',
                ' & .MuiOutlinedInput-notchedOutline': {
                  border: '1px solid #000 !important',
                },
              },
            }}
          >
            <TextField
              fullWidth
              type='date'
              variant='outlined'
              label='End date'
              defaultValue={formatDateForTextField(projectInfo?.endDate)}
              InputLabelProps={{ shrink: true }}
              error={!!errors.endDate}
              {...register('endDate', {
                required: 'Please enter end date',
              })}
            />
            {errors.endDate && (
              <Alert
                severity='error'
                sx={{
                  mt: '0.2em',
                  py: '0',
                  '.MuiAlert-message': { overflow: 'hidden' },
                }}
              >
                {errors.endDate.message}
              </Alert>
            )}
          </Box>
        </Box>
      </Box>
      <Button
        type='submit'
        variant='contained'
        color='primary'
        size='large'
        fullWidth
        sx={{
          backgroundColor: 'secondary.main',
          color: 'primary.main',
          transition: 'all linear .3s',
          '&:hover': {
            backgroundColor: 'secondary.main',
            opacity: '0.9',
          },
        }}
      >
        Update
      </Button>
    </form>
  );
}

export default UpdateProjectForm;
