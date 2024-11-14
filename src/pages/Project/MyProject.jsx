import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
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
import VisibilityIcon from '@mui/icons-material/Visibility';

function MyProject({ project, type, deleteProject, updateProject }) {
  console.log('project: ', project)
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
  const [openConfirmDelete, setOpenConfirmDelete] = useState(undefined);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const hadleResize = (event) => {
      setWindowWidth(event.srcElement.innerWidth);
    };
    window.addEventListener('resize', hadleResize);
    return () => {
      window.removeEventListener('resize', hadleResize);
    };
  }, []);

  const token = localStorage.getItem('Authorization');
  const [colorStatus] = useState({
    active: 'blue',
    completed: 'green',
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
  const deletePhase = (phase) => {
    if (project?.projectStatus !== 'active') {
      toast.error(
        <div>
          You can not delete this phase!!
          <br />
          {`Because this project has been ${project?.projectStatus}`}
        </div >, { position: 'top-center' }
      )
    } else {
      DeletePhase(phase._id, token, project?._id)
        .then((data) => {
          toast.success('Delete phase successfuly', { position: 'top-center' });
          setRecallApi((a) => a + 'a');
        })
        .catch((err) => {
          toast.error(err, { position: 'top-center' });
        });
    }
    // setTitle('Overview')
  };
  const handleDeleteProject = (project) => {
    setOpenConfirmDelete(project);
    // deleteProject(project)
  };
  const handleDeleteProject2 = (project) => {
    // setOpenConfirmDelete(project)
    deleteProject(project);
  };

  const handleCreateUser = (projectId) => {
    if (project?.projectStatus !== 'active') {
      toast.error(
        <div>
          You can not add new user to this project!!
          <br />
          {`Because this project has been ${project?.projectStatus}`}
        </div >, { position: 'top-center' }
      )
    } else {
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
    }
  };
  const handleDeleteUser = (userId, projectId) => {
    if (project?.projectStatus !== 'active') {
      toast.error(
        <div>
          You can not delete this user!!
          <br />
          {`Because this project has been ${project?.projectStatus}`}
        </div >, { position: 'top-center' }
      )
    } else {
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
    }
  };
  const handleCreatePhase = (formData) => {
    if (project?.projectStatus !== 'active') {
      toast.error(
        <div>
          You can not create new phase!!
          <br />
          {`Because this project has been ${project?.projectStatus}`}
        </div >, { position: 'top-center' }
      )
    } else {
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
    }
  };
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  return (
    <Box>
      <Dialog
        open={!!openConfirmDelete}
        onClose={() => setOpenConfirmDelete(undefined)}
        sx={{
          '& .MuiPaper-root': {
            minWidth: { xs: '90%', lg: '800px' },
            maxWidth: { xs: '90%', lg: '800px' },
          },
        }}
      >
        <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
          {`Do you want delete project: ${openConfirmDelete?.projectName}`}
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
            onClick={() => handleDeleteProject2(openConfirmDelete)}
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

      <Box sx={{ mt: '20px', p: '1rem', borderBottom: '1px solid #000' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            width: '100%',
            mb: '1rem',
          }}
        >
          <Box
            sx={{
              width: { xs: '75%', md: '75%' },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography>
                Type:{windowWidth < 800 ? <br /> : ' '}
                <span
                  style={{
                    fontWeight: '600',
                    fontSize: { xs: '1.25rem', md: '1.4rem' },
                  }}
                >
                  {currType?.projectTypeName}
                </span>
              </Typography>
              <Typography
                sx={{
                  textAlign: 'justify',
                  textTransform: 'capitalize',
                  '& span': { color: colorStatus[project?.projectStatus] },
                }}
              >
                Status:{windowWidth < 800 ? <br /> : ' '}
                <span
                  style={{
                    fontWeight: '600',
                    fontSize: { xs: '1.25rem', md: '1.4rem' },
                  }}
                >
                  {project?.projectStatus}
                </span>
              </Typography>
              <Typography>
                Start Date:{windowWidth < 800 ? <br /> : ' '}
                <span
                  style={{
                    fontWeight: '600',
                    fontSize: { xs: '1.25rem', md: '1.4rem' },
                  }}
                >
                  {formatDate(project?.startDate)}
                </span>
              </Typography>
            </Box>
          </Box>

          {windowWidth < 800 ? (
            <Box>
              <IconButton
                aria-label='delete'
                onClick={() => setOpenUpdate(true)}
                color='inherit'
              >
                <EditIcon />
              </IconButton>

              <IconButton
                aria-label='delete'
                onClick={() => handleDeleteProject(project)}
                color='inherit'
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ) : (
            <Button
              variant='contained'
              onClick={() => handleDeleteProject(project)}
              sx={{
                fontSize: { xs: '0.75rem !important', lg: '1rem !important' },
                color: '#fff',
                width: '20%',
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
          )}
        </Box>

        <Typography sx={{ textAlign: 'justify' }}>
          <strong style={{ fontSize: '1.2rem' }}>Description</strong>:{' '}
          <span
            style={{
              fontWeight: '400',
              fontSize: { xs: '1.25rem', md: '1.4rem' },
            }}
          >
            {project?.projectDescription}
          </span>
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            mt: '1rem',
          }}
        >
          {windowWidth < 800 || (
            <Button
              fullWidth
              variant='outlined'
              endIcon={<EditIcon />}
              onClick={() => setOpenUpdate(true)}
              sx={{
                fontSize: {
                  xs: '0.75rem !important',
                  lg: '1rem !important',
                },
                color: '#000',
                border: '1px solid #000',
                '&:hover': {
                  border: '1px solid #000',
                  opacity: '0.8',
                },
              }}
            >
              Edit project
            </Button>
          )}
          {windowWidth < 800 || (
            <Button
              fullWidth
              variant='outlined'
              onClick={() => setOpenViewMemberList(true)}
              sx={{
                fontSize: {
                  xs: '0.75rem !important',
                  lg: '1rem !important',
                },
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
          )}
        </Box>

        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: { xs: 'flex-start', lg: 'space-between' },
            alignItems: { xs: 'flex-start', lg: 'center' },
            flexDirection: { xs: 'column-reverse', lg: 'row' },
            mt: '20px',
          }}
        >
          <Box sx={{ display: 'flex', gap: '32px', width: '100%' }}>
            <Dialog
              open={openViewMemberList}
              onClose={() => setOpenViewMemberList(false)}
              sx={{
                '& .MuiPaper-root': {
                  minWidth: { xs: '90%', lg: '1200px' },
                  maxWidth: { xs: '90%', lg: '1200px' },
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
                        fontSize: {
                          xs: '0.75rem !important',
                          lg: '1rem !important',
                        },
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
                          fontSize: {
                            xs: '0.75rem !important',
                            lg: '1rem !important',
                          },
                          display: { xs: 'none', lg: 'flex' },
                          minWidth: { xs: '15%', lg: '160px' },
                          maxWidth: { xs: '15%', lg: '160px' },
                          backgroundColor: '#6ea033',
                          color: '#fff',
                          p: '7px 0',
                          '&:hover': {
                            backgroundColor: '#6ea033',
                            color: '#fff',
                            opacity: '0.8',
                          },
                          '& .test': {
                            display: { xs: 'none', lg: 'inline' },
                          },
                        }}
                      >
                        <span className='test'>Submit</span>
                      </Button>
                      <Button
                        variant='outlined'
                        onClick={() => handleCreateUser(project?._id)}
                        sx={{
                          fontSize: {
                            xs: '0.75rem !important',
                            lg: '1rem !important',
                          },
                          display: { xs: 'flex', lg: 'none' },
                          minWidth: { xs: '15%', lg: '160px' },
                          maxWidth: { xs: '15%', lg: '160px' },
                          backgroundColor: '#6ea033',
                          color: '#fff',
                          p: '6px 0 6px 4px',
                          '&:hover': {
                            backgroundColor: '#6ea033',
                            color: '#fff',
                            opacity: '0.8',
                          },
                          '& .test': {
                            display: { xs: 'none', lg: 'inline' },
                          },
                        }}
                      >
                        <SendIcon />
                      </Button>
                      <Button
                        variant='contained'
                        startIcon={<HighlightOffIcon />}
                        onClick={handleCloseCreateUser}
                        sx={{
                          fontSize: {
                            xs: '0.75rem !important',
                            lg: '1rem !important',
                          },
                          display: { xs: 'none', lg: 'flex' },
                          backgroundColor: 'error.main',
                          color: '#fff',
                          p: '7px 0',
                          minWidth: { xs: '10%', lg: '100px' },
                          maxWidth: { xs: '10%', lg: '100px' },
                          '&:hover': {
                            backgroundColor: 'error.main',
                            color: '#fff',
                            opacity: '0.8',
                          },
                          '& .test': {
                            display: { xs: 'none', lg: 'inline' },
                          },
                        }}
                      >
                        <span className='test'>Close</span>
                      </Button>
                      <Button
                        variant='contained'
                        onClick={handleCloseCreateUser}
                        sx={{
                          fontSize: {
                            xs: '0.75rem !important',
                            lg: '1rem !important',
                          },
                          display: { xs: 'flex', lg: 'none' },
                          backgroundColor: 'error.main',
                          color: '#fff',
                          p: '6px 0',
                          minWidth: { xs: '10%', lg: '100px' },
                          maxWidth: { xs: '10%', lg: '100px' },
                          '&:hover': {
                            backgroundColor: 'error.main',
                            color: '#fff',
                            opacity: '0.8',
                          },
                        }}
                      >
                        <HighlightOffIcon />
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
                        width: { xs: '30%', md: '40%' },
                        textAlign: 'center',
                        fontSize: {
                          xs: '0.75rem !important',
                          lg: '1rem !important',
                        },
                        padding: '12px 0',
                      },
                    }}
                  >
                    <Typography
                      variant='body1'
                      sx={{ width: { xs: '40% !important' } }}
                    >
                      Email
                    </Typography>
                    <Typography variant='body1'>Fullname</Typography>
                    <Typography variant='body1'>Account</Typography>
                  </Box>
                  {!isEmpty(userList) &&
                    userList?.map((user) => (
                      <Box
                        key={user?._id}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          backgroundColor: '#fff',
                          alignItems: 'center',
                          boxShadow: '0px 0px 1px #888888',
                          padding: '12px 0',
                          textAlign: 'center',
                          '& .MuiButtonBase-root, & .MuiTypography-p': {
                            width: { xs: '30%', md: '40%' },
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            textAlign: 'center !important',
                            fontSize: {
                              xs: '0.75rem !important',
                              lg: '1rem !important',
                            },
                          },
                          '&:hover': {
                            backgroundColor: 'rgba(0,0,0,0.03)',
                          },
                        }}
                      >
                        <Typography
                          variant='p'
                          sx={{
                            fontSize: {
                              xs: '0.7rem !important',
                              md: '1rem !important',
                            },
                            width: { xs: '40% !important' },
                          }}
                        >
                          {user?.email}
                        </Typography>
                        <Typography
                          variant='p'
                          sx={{
                            fontSize: {
                              xs: '0.7rem !important',
                              md: '1rem !important',
                            },
                          }}
                        >
                          {user?.fullName}
                        </Typography>
                        {user?._id !== currUser._id ? (
                          <Button
                            variant='text'
                            endIcon={<DeleteForeverIcon />}
                            onClick={() =>
                              handleDeleteUser(user?._id, project?._id)
                            }
                            sx={{
                              color: '#000',
                              p: '',
                              fontSize: {
                                xs: '0.75rem !important',
                                lg: '1rem !important',
                              },
                              fontWeight: '700',
                            }}
                          ></Button>
                        ) : (
                          <Typography
                            variant='p'
                            fontSize={'0.6rem'}
                            color={'#6ea033'}
                          >
                            Your account
                          </Typography>
                        )}
                      </Box>
                    ))}
                </Box>
              </DialogContent>
            </Dialog>

            <Button
              variant='outlined'
              startIcon={<AddToPhotosIcon />}
              onClick={() => setOpenForm(true)}
              sx={{
                fontSize: { xs: '0.75rem !important', lg: '1rem !important' },
                color: '#fff',
                bgcolor: '#7bbf2f',
                width: { xs: '100%', md: '25%' },
                border: '1px solid #000',
                '&:hover': {
                  border: '1px solid #000',
                  bgcolor: '#97cf57',
                },
              }}
            >
              Create Phase
            </Button>

            {windowWidth < 800 && (
              <Button
                fullWidth
                variant='outlined'
                onClick={() => setOpenViewMemberList(true)}
                sx={{
                  fontSize: {
                    xs: '0.75rem !important',
                    lg: '1rem !important',
                  },
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
            )}

            <Dialog open={openForm} onClose={handleCloseForm} sx={{
              '& .MuiPaper-root': {
                minWidth: { xs: '90%', lg: 'unset' },
                maxWidth: { xs: '90%', lg: 'unset' },
              },
            }}>
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
                    <Box
                      sx={{
                        display: 'flex',
                        gap: { xs: '0', sm: '20px' },
                        flexDirection: { xs: 'column', sm: 'row' },
                      }}
                    >
                      <Box
                        sx={{
                          marginTop: '1.2em',
                          minWidth: { xs: '100%', sm: '200px' },
                          maxWidth: { xs: '100%', sm: '200px' },
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
                          minWidth: { xs: '100%', sm: '200px' },
                          maxWidth: { xs: '100%', sm: '200px' },
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
        </Box>
        <Dialog open={openUpdate} onClose={handleCloseUpdate} sx={{
          '& .MuiPaper-root': {
            minWidth: { xs: '90%', lg: 'unset' },
            maxWidth: { xs: '90%', lg: 'unset' },
          },
        }}>
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
        <MyPhase phaseList={phaseList} deletePhase={deletePhase} projectStatus={project?.projectStatus} />
      )}
      {isEmpty(phaseList) && (
        <Box sx={{ mt: '40px', ml: '40px' }}>
          <Typography variant='h5'>There is no phase to display</Typography>
        </Box>
      )}
    </Box>
  );
}

export default MyProject;
