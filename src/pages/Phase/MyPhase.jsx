import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import { formatDate } from '../../untils/format';
import { GetAllSample, CreateNewSample, DeleteSample } from '../../apis/index';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Tooltip,
} from '@mui/material';
import MySample from '../Sample/MySample';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

function MyPhase({ phaseList, deletePhase }) {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();
  const [currentId, setCurrentId] = useState(phaseList[0]?._id);
  const [openForm, setOpenForm] = useState(false);
  const [recallApi, setRecallApi] = useState(undefined);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(undefined);
  useEffect(() => {
    setCurrentId(phaseList[0]?._id);
  }, [phaseList]);
  const index = phaseList.findIndex((phase) => phase?._id === currentId);
  const currentPhase = phaseList[index];
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
  }, [recallApi]);
  const handleCreateSample = (data) => {
    const dataSubmit = {
      ...data,
      collectionDate: new Date(data.collectionDate),
      phaseId: currentPhase?._id,
    };
    CreateNewSample(dataSubmit)
      .then((data) => {
        toast.success('Create sample successfuly!', {
          position: 'top-center',
        });
        setRecallApi(`${data._id} create sample`);
        handleCloseForm();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message, { position: 'top-center' });
      });
  };
  const deleteSample = (sample) => {
    DeleteSample(sample._id)
      .then((data) => {
        toast.success('Delete sample successfuly', { position: 'top-center' });
        setRecallApi((a) => a + 'a');
      })
      .catch((err) => {
        toast.error(err, { position: 'top-center' });
      });
  };
  const handleDeletePhase = (phase) => {
    setOpenConfirmDelete(phase);
  };
  const handleDeletePhase2 = (phase) => {
    setOpenConfirmDelete(undefined);
    deletePhase(phase);
  };
  const handleCloseForm = () => {
    resetField('collectionDate');
    resetField('location');
    resetField('sampleDescription');
    resetField('sampleTitle');
    resetField('sampleType');
    setOpenForm(false);
  };

  return (
    <Box sx={{ mt: '20px', padding: '20px' }}>
      <Dialog
        open={!!openConfirmDelete}
        onClose={() => setOpenConfirmDelete(undefined)}
        sx={{
          '& .MuiPaper-root': {
            minWidth: { xs: '80%', lg: '800px' },
            maxWidth: { xs: '80%', lg: '800px' },
          },
        }}
      >
        <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
          {`Do you want delete phase: ${openConfirmDelete?.phaseName}`}
        </DialogTitle>
        <DialogActions>
          <Button
            variant='text'
            onClick={() => setOpenConfirmDelete(undefined)}
            sx={{
              fontSize: { xs: '0.75rem !important', lg: '1rem !important' },
              border: '1px solid #666',
              color: '#666',
              p: '7px 0',
              minWidth: '100px',
              maxWidth: '100px',
              '&:hover': {
                border: '1px solid #666',
                color: '#666',
                opacity: '0.8',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant='outlined'
            onClick={() => handleDeletePhase2(openConfirmDelete)}
            sx={{
              fontSize: { xs: '0.75rem !important', lg: '1rem !important' },
              backgroundColor: 'error.main',
              color: '#fff',
              p: '7px 0',
              minWidth: '100px',
              maxWidth: '100px',
              '&:hover': {
                backgroundColor: 'error.main',
                color: '#fff',
                opacity: '0.8',
              },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Box
        sx={{ overflow: 'auto', maxWidth: '100%', display: 'flex', gap: '8px' }}
      >
        {phaseList.map((phase, i) => (
          <Box
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
            key={i}
            onClick={() => setCurrentId(phase?._id)}
          >
            {phase.phaseName}
          </Box>
        ))}
      </Box>
      <Box>
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              mt: '2rem',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: { xs: '75%', md: '80%' },
              }}
            >
              <Typography
                variant='body1'
                sx={{
                  mb: '12px',
                  fontSize: { xs: '0.75rem', lg: '1rem' },
                  '& span, & b': {
                    fontSize: { xs: '0.75rem', lg: '1rem' },
                    color: '#333',
                  },
                }}
              >
                <b>Start Date: </b>{' '}
                <span
                  style={{
                    fontSize: { xs: '0.75rem', lg: '1rem' },
                    color: '#333',
                  }}
                >
                  {formatDate(currentPhase?.startDate)}
                </span>
              </Typography>
              <Typography
                variant='body1'
                sx={{
                  mb: '12px',
                  fontSize: { xs: '0.75rem', lg: '1rem' },
                  '& span, & b': {
                    fontSize: { xs: '0.75rem', lg: '1rem' },
                    color: '#333',
                  },
                }}
              >
                <b>End Date: </b>{' '}
                <span>{formatDate(currentPhase?.endDate)}</span>
              </Typography>
            </Box>

            <Button
              variant='contained'
              onClick={() => handleDeletePhase(currentPhase)}
              sx={{
                fontSize: { xs: '0.75rem', lg: '1rem' },
                color: '#fff',
                backgroundColor: 'error.main',
                border: '1px solid error.main',
                '&:hover': {
                  border: '1px solid error.main',
                  opacity: '0.8',
                  backgroundColor: 'error.main',
                },
              }}
            >
              Delete Phase
            </Button>
          </Box>

          <Typography
            variant='body1'
            sx={{
              mb: '12px',
              fontSize: { xs: '0.75rem', lg: '1rem' },
              '& span, & b': {
                fontSize: { xs: '0.75rem', lg: '1rem' },
                color: '#333',
              },
            }}
          >
            <b>Description: </b>
            <span>{currentPhase?.phaseDescription}</span>
          </Typography>
        </Box>
        <Box sx={{ minWidth: '200px', maxWidth: '200px' }}>
          <Button
            fullWidth
            variant='outlined'
            startIcon={<AddToPhotosIcon />}
            onClick={() => setOpenForm(true)}
            sx={{
              fontSize: { xs: '0.75rem !important', lg: '1rem !important' },
              color: '#000',
              border: '1px solid #000',
              '&:hover': {
                border: '1px solid #000',
                opacity: '0.8',
              },
            }}
          >
            Create Sample
          </Button>
          <Dialog
            open={openForm}
            onClose={handleCloseForm}
            sx={{
              '& .MuiPaper-root': { minWidth: '50%', maxWidth: '50%' },
            }}
          >
            <DialogTitle
              sx={{ backgroundColor: 'secondary.main', color: '#fff' }}
            >
              Create New Sample
              <Tooltip title='Close '>
                <CloseIcon
                  onClick={handleCloseForm}
                  sx={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    cursor: 'pointer',
                  }}
                />
              </Tooltip>
            </DialogTitle>
            <DialogContent>
              <form onSubmit={handleSubmit(handleCreateSample)}>
                <Box sx={{ padding: '1em 1em 1em 1em' }}>
                  <Box
                    sx={{
                      marginTop: '1.2em',
                      '& .MuiFormLabel-root': {
                        fontSize: {
                          xs: '0.75rem !important',
                          lg: '1rem !important',
                        },
                        right: 'auto',
                        left: '0',
                      },
                      '&  .MuiOutlinedInput-root ': {
                        fontSize: {
                          xs: '0.75rem !important',
                          lg: '1rem !important',
                        },
                        ' & .MuiOutlinedInput-notchedOutline': {
                          border: '1px solid #000 !important',
                        },
                      },
                    }}
                  >
                    <TextField
                      fullWidth
                      label='Sample title'
                      type='text'
                      variant='outlined'
                      error={!!errors.sampleTitle}
                      {...register('sampleTitle', {
                        required: 'Please enter phase name.',
                      })}
                    />
                    {errors.sampleTitle && (
                      <Alert
                        severity='error'
                        sx={{
                          marginTop: '0.7em',
                          '.MuiAlert-message': { overflow: 'hidden' },
                        }}
                      >
                        {errors.sampleTitle.message}
                      </Alert>
                    )}
                  </Box>
                  <Box
                    sx={{
                      marginTop: '1.2em',
                      '& .MuiFormLabel-root': {
                        fontSize: {
                          xs: '0.75rem !important',
                          lg: '1rem !important',
                        },
                        right: 'auto',
                        left: '0',
                      },
                      '&  .MuiOutlinedInput-root ': {
                        fontSize: {
                          xs: '0.75rem !important',
                          lg: '1rem !important',
                        },
                        ' & .MuiOutlinedInput-notchedOutline': {
                          border: '1px solid #000 !important',
                        },
                      },
                    }}
                  >
                    <TextField
                      fullWidth
                      label='Sample description'
                      type='text'
                      autoComplete='off'
                      variant='outlined'
                      error={!!errors.sampleDescription}
                      {...register('sampleDescription', {
                        required: 'Please enter phase description.',
                      })}
                    />
                    {errors.sampleDescription && (
                      <Alert
                        severity='error'
                        sx={{
                          marginTop: '0.7em',
                          '.MuiAlert-message': { overflow: 'hidden' },
                        }}
                      >
                        {errors.sampleDescription.message}
                      </Alert>
                    )}
                  </Box>
                  <Box
                    sx={{
                      marginTop: '1.2em',
                      '& .MuiFormLabel-root': {
                        fontSize: {
                          xs: '0.75rem !important',
                          lg: '1rem !important',
                        },
                        right: 'auto',
                        left: '0',
                      },
                      '&  .MuiOutlinedInput-root ': {
                        fontSize: {
                          xs: '0.75rem !important',
                          lg: '1rem !important',
                        },
                        ' & .MuiOutlinedInput-notchedOutline': {
                          border: '1px solid #000 !important',
                        },
                      },
                    }}
                  >
                    <TextField
                      fullWidth
                      label='Location'
                      type='text'
                      autoComplete='off'
                      variant='outlined'
                      error={!!errors.location}
                      {...register('location', {
                        required: 'Please enter phase description.',
                      })}
                    />
                    {errors.location && (
                      <Alert
                        severity='error'
                        sx={{
                          marginTop: '0.7em',
                          '.MuiAlert-message': { overflow: 'hidden' },
                        }}
                      >
                        {errors.location.message}
                      </Alert>
                    )}
                  </Box>
                  <Box
                    sx={{
                      marginTop: '1.2em',
                      '& .MuiFormLabel-root': {
                        fontSize: {
                          xs: '0.75rem !important',
                          lg: '1rem !important',
                        },
                        right: 'auto',
                        left: '0',
                      },
                      '&  .MuiOutlinedInput-root ': {
                        fontSize: {
                          xs: '0.75rem !important',
                          lg: '1rem !important',
                        },
                        ' & .MuiOutlinedInput-notchedOutline': {
                          border: '1px solid #000 !important',
                        },
                      },
                    }}
                  >
                    <TextField
                      fullWidth
                      label='Sample type'
                      type='text'
                      autoComplete='off'
                      variant='outlined'
                      error={!!errors.sampleType}
                      {...register('sampleType', {
                        required: 'Please enter phase description.',
                      })}
                    />
                    {errors.sampleType && (
                      <Alert
                        severity='error'
                        sx={{
                          marginTop: '0.7em',
                          '.MuiAlert-message': { overflow: 'hidden' },
                        }}
                      >
                        {errors.sampleType.message}
                      </Alert>
                    )}
                  </Box>
                  <Box
                    sx={{
                      marginTop: '1.2em',
                      '& .MuiFormLabel-root': {
                        fontSize: {
                          xs: '0.75rem !important',
                          lg: '1rem !important',
                        },
                        right: 'auto',
                        left: '0',
                      },
                      '&  .MuiOutlinedInput-root ': {
                        fontSize: {
                          xs: '0.75rem !important',
                          lg: '1rem !important',
                        },
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
                      label='Collection date'
                      InputLabelProps={{ shrink: true }}
                      error={!!errors.collectionDate}
                      {...register('collectionDate', {
                        required: 'Please enter start date',
                      })}
                    />
                    {errors.collectionDate && (
                      <Alert
                        severity='error'
                        sx={{
                          mt: '0.2em',
                          py: '0',
                          '.MuiAlert-message': { overflow: 'hidden' },
                        }}
                      >
                        {errors.collectionDate.message}
                      </Alert>
                    )}
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
                  Create
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </Box>
        <MySample
          sampleList={sampleList.filter(
            (i) => i?.phaseId === currentPhase?._id
          )}
          deleteSample={deleteSample}
        />
      </Box>
    </Box>
  );
}

export default MyPhase;
