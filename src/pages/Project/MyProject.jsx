import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Tooltip,
} from '@mui/material';
import MyPhase from '../Phase/MyPhase';
import { useForm } from 'react-hook-form';
import UpdateProjectForm from './UpdateProjectForm';
import {
  GetAllPhase,
  GetUserOnProject,
  CreatePhase,
  DeletePhase,
  GetAllUser,
  CreateUserProject,
  RemoveUserFromProject,
} from '../../apis/index';
import { isEmpty } from 'lodash';
import { toast } from 'react-toastify';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SendIcon from '@mui/icons-material/Send';
import { formatDate } from '../../untils/format';

function MyProject({ project, type, deleteProject, updateProject }) {
  const [currType] = useState(type.find((i) => i._id === project?.projectType));
  const currUser = JSON.parse(localStorage.getItem('userInfo'));
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();
  const [openForm, setOpenForm] = useState(false);
  const [recallApi, setRecallApi] = useState(undefined);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [userList, setUserList] = useState([]);
  const [test, setTest] = useState([]);
  const [openViewMemberList, setOpenViewMemberList] = useState(false);
  const [createUser, setCreateUser] = useState(false);
  const [createUserText, setCreateUserText] = useState('');
  const [phaseList, setPhaseList] = useState([]);

  const token = localStorage.getItem('Authorization');
  const [colorStatus] = useState({
    active: 'green',
    completed: 'orange',
    canceled: 'red',
  });
  const handleUpdateProject = (token, id, data) => {
    updateProject(token, id, data);
  };
  const handleCloseCreateUser = () => {
    setCreateUser(false);
    setCreateUserText('');
  };
  useEffect(() => {
    GetAllPhase(token).then((data) => {
      const test = data.filter((i) => i?.projectId === project._id);
      setPhaseList(test);
    });
  }, [project, recallApi]);
  useEffect(() => {
    GetUserOnProject(project?._id).then((res) => {
      setUserList(res.data.map((i) => i.userId));
    });
  }, [project, recallApi]);

  useEffect(() => {
    GetAllUser().then((res) => {
      setTest(res);
    });
  }, []);

  const handleCloseForm = () => {
    resetField('endDate');
    resetField('phaseDescription');
    resetField('phaseName');
    resetField('startDate');
    setOpenForm(false);
  };
  const deletePhase = (id) => {
    DeletePhase(id, token, project?._id)
      .then((data) => {
        toast.success('Delete phase successfuly', { position: 'top-center' });
        setRecallApi((a) => a + 'a');
      })
      .catch((err) => {
        toast.error(err, { position: 'top-center' });
      });
    // setTitle('Overview')
  };
  const handleDeleteProject = (id) => {
    deleteProject(id);
  };

  const handleCreateUser = (projectId) => {
    const dataSubmit = {
      projectId,
      userRole: 'member',
    };
    const c = test.find((a) => a?.email === createUserText.trim());
    if (c) {
      dataSubmit.userId = c._id;
      CreateUserProject(dataSubmit)
        .then((data) => {
          toast.success('Add user to peoject successfuly!', {
            position: 'top-center',
          });
          setRecallApi((a) => a + 'b');
          handleCloseCreateUser();
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message, { position: 'top-center' });
        });
    } else {
      toast.error('This email does not exist', { position: 'top-center' });
    }
  };
  const handleDeleteUser = (userId, projectId) => {
    RemoveUserFromProject(userId, projectId)
      .then((data) => {
        toast.success('Remove user successfuly!', {
          position: 'top-center',
        });
        setRecallApi((a) => a + 'b');
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message, { position: 'top-center' });
      });
  };
  const handleCreatePhase = (formData) => {
    const { phaseName, phaseDescription, startDate, endDate } = formData;
    const dataSubmit = {
      phaseName,
      phaseDescription,
      startDate: new Date(startDate),
      projectId: project._id,
    };
    if (endDate) {
      dataSubmit.endDate = new Date(endDate);
    }
    CreatePhase(dataSubmit, token, project?._id)
      .then((data) => {
        toast.success('Create phase successfuly!', {
          position: 'top-center',
        });
        setRecallApi(`create phase ${data?._id}`);
        handleCloseForm();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message, { position: 'top-center' });
      });
  };
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

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
              Description: {project?.projectDescription}{' '}
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
            <Typography variant='h6'>
              Start Date: {formatDate(project?.startDate)}{' '}
            </Typography>
            <Typography variant='h6'>
              End Date: {formatDate(project?.endDate)}{' '}
            </Typography>
            <Typography variant='h6'>
              {' '}
              Type: {currType?.projectTypeName}{' '}
            </Typography>
          </Box>
          <Box sx={{ minWidth: '160px' }}>
            <Button
              fullWidth
              variant='contained'
              onClick={() => handleDeleteProject(project?._id)}
              sx={{
                fontSize: '14px',
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
              Delete Project
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: '20px',
          }}
        >
          <Box sx={{ display: 'flex', gap: '32px' }}>
            <Box sx={{ minWidth: '200px' }}>
              <Button
                fullWidth
                variant='outlined'
                onClick={() => setOpenViewMemberList(true)}
                sx={{
                  fontSize: '14px',
                  color: '#000',
                  border: '1px solid #000',
                  '&:hover': {
                    border: '1px solid #000',
                    opacity: '0.8',
                  },
                }}
              >
                View memberList
              </Button>
              <Dialog
                open={openViewMemberList}
                onClose={() => setOpenViewMemberList(false)}
                sx={{
                  '& .MuiPaper-root': {
                    minwidth: '100%',
                    maxwidth: '100%',
                  },
                }}
              >
                <DialogTitle
                  sx={{ backgroundColor: 'secondary.main', color: '#fff' }}
                >
                  View Member List
                  <Tooltip title='Close '>
                    <CloseIcon
                      onClick={() => setOpenViewMemberList(false)}
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
                  <Box sx={{ m: '20px 0' }}>
                    {!createUser && (
                      <Button
                        fullWidth
                        variant='outlined'
                        startIcon={<AddToPhotosIcon />}
                        onClick={() => setCreateUser(true)}
                        sx={{
                          fontSize: '14px',
                          color: '#000',
                          border: '1px solid #000',
                          '&:hover': {
                            border: '1px solid #000',
                            opacity: '0.8',
                          },
                        }}
                      >
                        Add new Member
                      </Button>
                    )}
                    {createUser && (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '20px',
                        }}
                      >
                        <Box
                          sx={{
                            flex: '1',
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
                            autoFocus
                            size='small'
                            fullWidth
                            label='Email'
                            type='text'
                            variant='outlined'
                            value={createUserText}
                            onChange={(e) => setCreateUserText(e.target.value)}
                          />
                        </Box>
                        <Button
                          variant='outlined'
                          startIcon={<SendIcon />}
                          onClick={() => handleCreateUser(project?._id)}
                          sx={{
                            fontSize: '14px',
                            minWidth: '160px',
                            backgroundColor: '#6ea033',
                            color: '#fff',
                            p: '7px 0',
                            maxWidth: '160px',
                            '&:hover': {
                              backgroundColor: '#6ea033',
                              color: '#fff',
                              opacity: '0.8',
                            },
                          }}
                        >
                          Submit
                        </Button>
                        <Button
                          variant='contained'
                          startIcon={<HighlightOffIcon />}
                          onClick={handleCloseCreateUser}
                          sx={{
                            fontSize: '14px',
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
                          Close
                        </Button>
                      </Box>
                    )}
                    <Box
                      sx={{
                        mt: '20px',
                        display: 'flex',
                        borderBottom: '1px solid #000',
                        justifyContent: 'space-between',
                        '& .MuiTypography-body1 ': {
                          fontWeight: '700',
                          color: 'primary.dark',
                          minWidth: '200px',
                          maxWidth: '200px',
                          textAlign: 'center',
                          fontSize: '16px',
                          padding: '12px 0',
                        },
                      }}
                    >
                      <Typography variant='body1' sx={{ flex: '1' }}>
                        Email
                      </Typography>
                      <Typography variant='body1' sx={{ flex: '1' }}>
                        Fullname
                      </Typography>
                      <Typography variant='body1' sx={{ flex: '1' }}>
                        User name
                      </Typography>
                      <Typography variant='body1' sx={{ flex: '1' }}>
                        Delete User
                      </Typography>
                    </Box>
                    {!isEmpty(userList) &&
                      userList?.map((user) => (
                        <Box
                          key={user?._id}
                          sx={{
                            display: 'flex',
                            position: 'relative',
                            justifyContent: 'space-between',
                            backgroundColor: '#fff',
                            alignItems: 'center',
                            boxShadow: '0px 0px 1px #888888',
                            padding: '12px 0',
                            textAlign: 'center',
                            '& .MuiButtonBase-root, & .MuiTypography-h6  ': {
                              color: 'primary.dark',
                              minWidth: '200px',
                              maxWidth: '200px',
                            },
                            '&:hover': {
                              backgroundColor: 'rgba(0,0,0,0.03)',
                            },
                          }}
                        >
                          <Box
                            sx={{
                              position: 'absolute',
                              top: '0',
                              left: '0',
                              backgroundColor: 'secondary.main',
                              color: '#fff',
                              fontSize: '10px',
                              userSelect: 'none',
                              padding: '0.1rem 0.5rem',
                              borderRadius: '0.25rem',
                              display:
                                user?._id === currUser._id ? 'block' : 'none',
                            }}
                          >
                            Your account
                          </Box>
                          <Typography variant='h6' sx={{ flex: '1' }}>
                            {user?.email}
                          </Typography>
                          <Typography variant='h6' sx={{ flex: '1' }}>
                            {user?.fullName}
                          </Typography>
                          <Typography variant='h6' sx={{ flex: '1' }}>
                            {user?.username}
                          </Typography>
                          <Button
                            variant='text'
                            endIcon={
                              user?._id !== currUser._id ? (
                                <DeleteForeverIcon />
                              ) : (
                                <Box />
                              )
                            }
                            onClick={() =>
                              handleDeleteUser(user?._id, project?._id)
                            }
                            sx={{
                              color: '#000',
                              p: '',
                              fontSize: '16px',
                              fontWeight: '700',
                              flex: '1',
                            }}
                          ></Button>
                        </Box>
                      ))}
                  </Box>
                </DialogContent>
              </Dialog>
            </Box>

            <Box sx={{ minWidth: '200px' }}>
              <Button
                fullWidth
                variant='outlined'
                startIcon={<AddToPhotosIcon />}
                onClick={() => setOpenForm(true)}
                sx={{
                  fontSize: '14px',
                  color: '#000',
                  border: '1px solid #000',
                  '&:hover': {
                    border: '1px solid #000',
                    opacity: '0.8',
                  },
                }}
              >
                Create Phase
              </Button>
            </Box>
            <Dialog open={openForm} onClose={handleCloseForm}>
              <DialogTitle
                sx={{ backgroundColor: 'secondary.main', color: '#fff' }}
              >
                Create New Phase
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
                <form onSubmit={handleSubmit(handleCreatePhase)}>
                  <Box sx={{ padding: '1em 1em 1em 1em' }}>
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
                        label='Phase Name'
                        type='text'
                        variant='outlined'
                        error={!!errors.phaseName}
                        {...register('phaseName', {
                          required: 'Please enter phase name.',
                        })}
                      />
                      {errors.phaseName && (
                        <Alert
                          severity='error'
                          sx={{
                            marginTop: '0.7em',
                            '.MuiAlert-message': { overflow: 'hidden' },
                          }}
                        >
                          {errors.phaseName.message}
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
                        label='Phase description'
                        type='text'
                        autoComplete='off'
                        variant='outlined'
                        error={!!errors.phaseDescription}
                        {...register('phaseDescription', {
                          required: 'Please enter phase description.',
                        })}
                      />
                      {errors.phaseDescription && (
                        <Alert
                          severity='error'
                          sx={{
                            marginTop: '0.7em',
                            '.MuiAlert-message': { overflow: 'hidden' },
                          }}
                        >
                          {errors.phaseDescription.message}
                        </Alert>
                      )}
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
                          InputLabelProps={{ shrink: true }}
                          error={!!errors.endDate}
                          {...register('endDate')}
                        />
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
                    Create
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </Box>

          <Box sx={{ minWidth: '200px' }}>
            <Button
              fullWidth
              variant='outlined'
              endIcon={<EditIcon />}
              onClick={() => setOpenUpdate(true)}
              sx={{
                fontSize: '14px',
                color: '#000',
                border: '1px solid #000',
                '&:hover': {
                  border: '1px solid #000',
                  opacity: '0.8',
                },
              }}
            >
              Edit project information
            </Button>
          </Box>
        </Box>
        <Dialog open={openUpdate} onClose={handleCloseUpdate} sx={{}}>
          <DialogTitle
            sx={{ backgroundColor: 'secondary.main', color: '#fff' }}
          >
            Edit Project Information
            <Tooltip title='Close '>
              <CloseIcon
                onClick={handleCloseUpdate}
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
            <UpdateProjectForm
              projectInfoProp={project}
              typeList={type}
              updateProject={handleUpdateProject}
            />
          </DialogContent>
        </Dialog>
      </Box>
      {!isEmpty(phaseList) && (
        <MyPhase phaseList={phaseList} deletePhase={deletePhase} />
      )}
      {isEmpty(phaseList) && (
        <Box sx={{ mt: '40px', ml: '40px' }}>
          <Typography variant='h5'>There are no phases to display</Typography>
        </Box>
      )}
    </Box>
  );
}

export default MyProject;
