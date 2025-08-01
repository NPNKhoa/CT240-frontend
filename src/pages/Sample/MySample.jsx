import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { isEmpty } from 'lodash';
import { formatDate } from '../../untils/format';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowUpTwoToneIcon from '@mui/icons-material/KeyboardArrowUpTwoTone';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import {
  getQuestionById,
  CreateQuestion,
  GetAllRespones,
} from '../../apis/index';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from '@mui/material';
import { toast } from 'react-toastify';
import ListRepones from '../Respone/ListRepones';
function MySample({ sampleList, deleteSample, projectStatus }) {
  const [testQuestion, setTestQuestion] = useState(undefined)
  const [createQuestion, setCreateQuestion] = useState(false)
  const [createQuestionText, setCreateQuestionText] = useState('')
  const [openViewDetail, setOpenViewDetail] = useState(false)
  const [questionType, setQuestionType] = useState('text')
  const [openConfirmDelete, setOpenConfirmDelete] = useState(undefined)
  const token = localStorage.getItem('Authorization')
  const handleCloseViewDetail = () => {
    setOpenViewDetail(false)
  }
  const [responeList, setResponeList] = useState([])
  const [allRes, setAllRes] = useState([])
  useEffect(() => {
    GetAllRespones()
      .then((data) => {
        setAllRes(data);
      })
      .catch((err) =>
        toast.error(err?.response?.data?.message, { position: 'top-center' })
      );
  }, []);
  const handleViewDetail = (question) => {
    setResponeList(allRes.filter((a) => a?.questionId?._id === question?._id));
    setOpenViewDetail(true);
  };
  const handleCreateQuestion = (sample) => {
    if (projectStatus !== 'active') {
      toast.error(
        <div>
          You can not create new question!!
          <br />
          {`Because this project has been ${projectStatus}`}
        </div >, { position: 'top-center' }
      )
    } else {
      const dataSubmit = {
        sampleId: sample?._id,
        question: createQuestionText,
        questionType: questionType,
      };
      CreateQuestion(dataSubmit, token, sample?.projectId)
        .then((data) => {
          toast.success('Create question successfuly! ', {
            position: 'top-center',
          });
          setCreateQuestion(false);
          setCreateQuestionText('');
          setQuestionType('text');
          setTestQuestion((prevTestQuestion) => {
            // Check if this is the same sampleId
            if (prevTestQuestion?.sampleId === sample?._id) {
              return {
                ...prevTestQuestion,
                question: [...prevTestQuestion.question, data],
              };
            }
            return prevTestQuestion;
          });
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message, { position: 'top-center' });
        });
    }
  };
  const handleCloseCreateQuestion = () => {
    setCreateQuestion(false);
    setCreateQuestionText('');
  };
  const handleDeleteSample = (sample) => {
    setOpenConfirmDelete(sample);
  };
  const handleDeleteSample2 = (sample) => {
    setOpenConfirmDelete(undefined);
    deleteSample(sample);
  };
  const getQuestionBySampleId = async (sample) => {
    try {
      const questionArray = await Promise.all(
        sample.questionId.map((questionId) =>
          getQuestionById(questionId, token)
        )
      );
      setTestQuestion({
        sampleId: sample._id,
        question: questionArray,
      });
    } catch (error) {
      return null;
    }
  };
  return (
    <Box sx={{}}>
      <Dialog
        open={!!openConfirmDelete}
        onClose={() => setOpenConfirmDelete(undefined)}
        sx={{
          '& .MuiPaper-root': { minWidth: { xs: '90%', lg: '800px' }, maxWidth: { xs: '90%', lg: '800px' } },
        }}
      >
        <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
          {`Do you want delete sample: ${openConfirmDelete?.sampleTitle}`}
        </DialogTitle>
        <DialogActions>
          <Button
            variant='text'
            onClick={() => setOpenConfirmDelete(undefined)}
            sx={{
              fontSize: { xs: '0.75rem', lg: '1rem' },
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
            onClick={() => handleDeleteSample2(openConfirmDelete)}
            sx={{
              fontSize: { xs: '0.75rem', lg: '1rem' },
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
      {isEmpty(sampleList) && (
        <Box sx={{ mt: '0.5rem' }}>There are no samples to display</Box>
      )}
      {!isEmpty(sampleList) && (
        <Box
          sx={{
            width: '100%',
            margin: '20px auto',
            border: '2px solid #000',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              borderBottom: '1px solid #000',
              justifyContent: 'space-between',
              '& .MuiTypography-body1 ': {
                fontWeight: '700',
                color: 'primary.dark',
                minWidth: '20%',
                maxWidth: '20%',
                textAlign: 'center',
                padding: '12px 0',
              },
            }}
          >
            <Typography
              variant='p'
              sx={{
                flex: '1',
                fontSize: { xs: '0.7rem', md: '1rem' },
                textAlign: 'center',
                p: '0.25rem',
              }}
            >
              Sample Title
            </Typography>
            <Typography
              variant='p'
              sx={{
                flex: '1',
                fontSize: { xs: '0.7rem', md: '1rem' },
                textAlign: 'center',
                p: '0.25rem',
              }}
            >
              Create Date
            </Typography>
            <Typography
              variant='p'
              sx={{
                flex: '1',
                fontSize: { xs: '0.7rem', md: '1rem' },
                textAlign: 'center',
                p: '0.25rem',
              }}
            >
              Location
            </Typography>
            <Typography
              variant='p'
              sx={{
                flex: '1',
                fontSize: { xs: '0.7rem', md: '1rem' },
                textAlign: 'center',
                p: '0.25rem',
              }}
            >
              Sample Type
            </Typography>
            <Typography
              variant='p'
              sx={{
                flex: '1',
                fontSize: { xs: '0.7rem', md: '1rem' },
                textAlign: 'center',
                p: '0.25rem',
              }}
            >
              View all question
            </Typography>
          </Box>
          {sampleList?.map((sample) => (
            <Box
              key={sample._id}
              sx={{
                border: '1px solid #000',
                borderTop: 'none',
                borderLeft: 'none',
                borderRight: 'none',
              }}
            >
              <Box
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
                    minWidth: '20%',
                    maxWidth: '20%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.03)',
                  },
                }}
              >
                <Typography
                  variant='p'
                  sx={{
                    flex: '1',
                    fontSize: { xs: '0.75rem', md: '1rem' },
                    textAlign: 'center',
                    p: '0.25rem',
                  }}
                >
                  {sample?.sampleTitle}
                </Typography>
                <Typography
                  variant='p'
                  sx={{
                    flex: '1',
                    fontSize: { xs: '0.75rem', md: '1rem' },
                    textAlign: 'center',
                    p: '0.25rem',
                  }}
                >
                  {formatDate(sample?.createdAt)}
                </Typography>
                <Typography
                  variant='p'
                  sx={{
                    flex: '1',
                    fontSize: { xs: '0.75rem', md: '1rem' },
                    textAlign: 'center',
                    p: '0.25rem',
                  }}
                >
                  {sample?.location}
                </Typography>
                <Typography
                  variant='p'
                  sx={{
                    flex: '1',
                    fontSize: { xs: '0.75rem', md: '1rem' },
                    textAlign: 'center',
                    p: '0.25rem',
                  }}
                >
                  {sample?.sampleType}
                </Typography>

                {testQuestion?.sampleId !== sample?._id && (
                  <Button
                    variant='text'
                    endIcon={<ExpandMoreIcon />}
                    onClick={() => getQuestionBySampleId(sample)}
                    sx={{
                      color: '#000',
                      p: '',
                      fontSize: { xs: '0.75rem', lg: '1rem' },
                      fontWeight: '700',
                      flex: '1',
                    }}
                  ></Button>
                )}
                {testQuestion?.sampleId === sample?._id && (
                  <Button
                    variant='text'
                    endIcon={<KeyboardArrowUpTwoToneIcon />}
                    onClick={() => setTestQuestion(undefined)}
                    sx={{
                      color: '#000',
                      p: '',
                      fontSize: { xs: '0.75rem', lg: '1rem' },
                      fontWeight: '700',
                      flex: '1',
                    }}
                  ></Button>
                )}
              </Box>
              <Box>
                {testQuestion?.sampleId === sample?._id && (
                  <Box
                    sx={{
                      backgroundColor: 'rgba(0,0,0,0.03)',
                      padding: { xs: '20px 12px 64px ', lg: '32px 64px' },
                    }}
                  >
                    <Box sx={{ minWidth: '160px' }}>
                      <Button
                        variant='contained'
                        onClick={() => handleDeleteSample(sample)}
                        sx={{
                          fontSize: { xs: '0.75rem', lg: '1rem' },
                          mb: '20px',
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
                        Delete Sample
                      </Button>
                    </Box>
                    {isEmpty(testQuestion?.question) && (
                      <Box>
                        <Typography variant='h6' sx={{ flex: '1', mb: '12px', fontSize: { xs: '0.75rem', lg: '1rem' }, }}>
                          There are no questions to display
                        </Typography>

                        {!createQuestion && (
                          <Button
                            fullWidth
                            variant='outlined'
                            startIcon={<AddToPhotosIcon />}
                            onClick={() => setCreateQuestion(true)}
                            sx={{
                              fontSize: { xs: '0.75rem', lg: '1rem' },
                              color: '#000',
                              border: '1px solid #000',
                              p: '7px 0',
                              '&:hover': {
                                border: '1px solid #000',
                                opacity: '0.8',
                              },
                            }}
                          >
                            Add new question
                          </Button>
                        )}

                        {createQuestion && (
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: { xs: '4px', lg: '20px' },
                            }}
                          >
                            <Box
                              sx={{
                                flex: '1',
                                '& .MuiFormLabel-root': {
                                  fontSize: { xs: '0.75rem', lg: '1rem' },
                                  right: 'auto',
                                  left: '0',
                                },
                                '&  .MuiOutlinedInput-root ': {
                                  fontSize: { xs: '0.75rem', lg: '1rem' },
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
                                label='Question'
                                type='text'
                                variant='outlined'
                                value={createQuestionText}
                                onChange={(e) =>
                                  setCreateQuestionText(e.target.value)
                                }
                              />
                            </Box>
                            <Box
                              sx={{
                                maxWidth: { xs: '25%', lg: '200px' },
                                minWidth: { xs: '25%', lg: '200px' },
                                background: 'transparent',
                                '& .MuiInputBase-root': {
                                  color: 'primary.dark',
                                  fontSize: { xs: '0.75rem', lg: '1rem' },
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
                                  fontSize: { xs: '0.75rem', lg: '1rem' },
                                  right: 'auto',
                                  left: '0',
                                  bottom: '16px',
                                  lineHeight: '1.4375em',
                                  backgroundColor: '#fff',
                                },
                              }}
                            >
                              <FormControl fullWidth>
                                <InputLabel
                                  size='small'
                                  variant='outlined'
                                >
                                  Question type
                                </InputLabel>
                                <Select
                                  labelId='project-type'
                                  value={questionType || ''}
                                  inputProps={{
                                    MenuProps: { disableScrollLock: true },
                                  }}
                                  onChange={(e) => {
                                    setQuestionType(e.target.value);
                                  }}
                                  defaultValue={questionType || ''}
                                >
                                  <MenuItem value='text'>Text</MenuItem>
                                  <MenuItem value='file'>File</MenuItem>
                                  <MenuItem value='image'>Image</MenuItem>
                                </Select>
                              </FormControl>
                            </Box>
                            <Button
                              variant='outlined'
                              startIcon={<SendIcon />}
                              onClick={() => handleCreateQuestion(sample)}
                              sx={{
                                fontSize: { xs: '0.75rem', lg: '1rem' },
                                minWidth: { xs: '15%', lg: '160px' },
                                display: { xs: 'none', lg: 'flex' },
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
                                  display: { xs: 'none', lg: 'inline' }
                                }
                              }}
                            >
                              <span className='test'>
                                Submit
                              </span>
                            </Button>
                            <Button
                              variant='outlined'
                              onClick={() => handleCreateQuestion(sample)}
                              sx={{
                                fontSize: { xs: '0.75rem', lg: '1rem' },
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
                                  display: { xs: 'none', lg: 'inline' }
                                }
                              }}
                            >
                              <SendIcon />
                            </Button>
                            <Button
                              variant='contained'
                              startIcon={<HighlightOffIcon />}
                              onClick={handleCloseCreateQuestion}
                              sx={{
                                fontSize: { xs: '0.75rem', lg: '1rem' },
                                backgroundColor: 'error.main',
                                color: '#fff',
                                display: { xs: 'none', lg: 'flex' },
                                p: '7px 0',
                                minWidth: { xs: '15%', lg: '100px' },
                                maxWidth: { xs: '15%', lg: '100px' },
                                '&:hover': {
                                  backgroundColor: 'error.main',
                                  color: '#fff',
                                  opacity: '0.8',
                                },
                                '& .test': {
                                  display: { xs: 'none', lg: 'inline' }
                                }
                              }}
                            >
                              <span className='test'>
                                Close
                              </span>
                            </Button>
                            <Button
                              variant='contained'
                              onClick={handleCloseCreateQuestion}
                              sx={{
                                fontSize: { xs: '0.75rem', lg: '1rem' },
                                backgroundColor: 'error.main',
                                display: { xs: 'flex', lg: 'none' },
                                color: '#fff',
                                p: '7px 0',
                                minWidth: { xs: '15%', lg: '100px' },
                                maxWidth: { xs: '15%', lg: '100px' },
                                '&:hover': {
                                  backgroundColor: 'error.main',
                                  color: '#fff',
                                  opacity: '0.8',
                                }
                              }}
                            >
                              <HighlightOffIcon />
                            </Button>
                          </Box>
                        )}
                      </Box>
                    )}
                    {!isEmpty(testQuestion?.question) && (
                      <Box>
                        {!createQuestion && (
                          <Button
                            fullWidth
                            variant='outlined'
                            startIcon={<AddToPhotosIcon />}
                            onClick={() => setCreateQuestion(true)}
                            sx={{
                              fontSize: { xs: '0.75rem', lg: '1rem' },
                              color: '#000',
                              border: '1px solid #000',
                              p: '7px 0',
                              '&:hover': {
                                border: '1px solid #000',
                                opacity: '0.8',
                              },
                            }}
                          >
                            Add new question
                          </Button>
                        )}

                        {createQuestion && (
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: { xs: '4px', lg: '20px' },
                            }}
                          >
                            <Box
                              sx={{
                                flex: '1',
                                '& .MuiFormLabel-root': {
                                  fontSize: { xs: '0.75rem', lg: '1rem' },
                                  right: 'auto',
                                  left: '0',
                                },
                                '&  .MuiOutlinedInput-root ': {
                                  fontSize: { xs: '0.75rem', lg: '1rem' },
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
                                label='Question'
                                type='text'
                                variant='outlined'
                                value={createQuestionText}
                                onChange={(e) =>
                                  setCreateQuestionText(e.target.value)
                                }
                              />
                            </Box>
                            <Box
                              sx={{
                                maxWidth: { xs: '25%', lg: '200px' },
                                minWidth: { xs: '25%', lg: '200px' },
                                background: 'transparent',
                                '& .MuiInputBase-root': {
                                  color: 'primary.dark',
                                  fontSize: { xs: '0.75rem', lg: '1rem' },
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
                                  fontSize: { xs: '0.75rem', lg: '1rem' },
                                  right: 'auto',
                                  left: '0',
                                  bottom: '16px',
                                  lineHeight: '1.4375em',
                                  backgroundColor: '#fff',
                                },
                              }}
                            >
                              <FormControl fullWidth>
                                <InputLabel
                                  size='small'
                                  variant='outlined'
                                >
                                  Question type
                                </InputLabel>
                                <Select
                                  labelId='project-type'
                                  value={questionType || ''}
                                  inputProps={{
                                    MenuProps: { disableScrollLock: true },
                                  }}
                                  onChange={(e) => {
                                    setQuestionType(e.target.value);
                                  }}
                                  defaultValue={questionType || ''}
                                >
                                  <MenuItem value='text'>Text</MenuItem>
                                  <MenuItem value='file'>File</MenuItem>
                                  <MenuItem value='image'>Image</MenuItem>
                                </Select>
                              </FormControl>
                            </Box>
                            <Button
                              variant='outlined'
                              startIcon={<SendIcon />}
                              onClick={() => handleCreateQuestion(sample)}
                              sx={{
                                fontSize: { xs: '0.75rem', lg: '1rem' },
                                minWidth: { xs: '15%', lg: '160px' },
                                display: { xs: 'none', lg: 'flex' },
                                maxWidth: { xs: '15%', lg: '160px' },
                                backgroundColor: '#6ea033',
                                color: '#fff',
                                p: '7px 0',
                                '&:hover': {
                                  backgroundColor: '#6ea033',
                                  color: '#fff',
                                  opacity: '0.8',
                                }
                              }}
                            >
                              <span className='test'>
                                Submit
                              </span>
                            </Button>
                            <Button
                              variant='outlined'
                              onClick={() => handleCreateQuestion(sample)}
                              sx={{
                                fontSize: { xs: '0.75rem', lg: '1rem' },
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
                                  display: { xs: 'none', lg: 'inline' }
                                }
                              }}
                            >
                              <SendIcon />
                            </Button>
                            <Button
                              variant='contained'
                              startIcon={<HighlightOffIcon />}
                              onClick={handleCloseCreateQuestion}
                              sx={{
                                fontSize: { xs: '0.75rem', lg: '1rem' },
                                backgroundColor: 'error.main',
                                color: '#fff',
                                display: { xs: 'none', lg: 'flex' },
                                p: '7px 0',
                                minWidth: { xs: '15%', lg: '100px' },
                                maxWidth: { xs: '15%', lg: '100px' },
                                '&:hover': {
                                  backgroundColor: 'error.main',
                                  color: '#fff',
                                  opacity: '0.8',
                                },
                                '& .test': {
                                  display: { xs: 'none', lg: 'inline' }
                                }
                              }}
                            >
                              <span className='test'>
                                Close
                              </span>
                            </Button>
                            <Button
                              variant='contained'
                              onClick={handleCloseCreateQuestion}
                              sx={{
                                fontSize: { xs: '0.75rem', lg: '1rem' },
                                backgroundColor: 'error.main',
                                display: { xs: 'flex', lg: 'none' },
                                color: '#fff',
                                p: '7px 0',
                                minWidth: { xs: '15%', lg: '100px' },
                                maxWidth: { xs: '15%', lg: '100px' },
                                '&:hover': {
                                  backgroundColor: 'error.main',
                                  color: '#fff',
                                  opacity: '0.8',
                                }
                              }}
                            >
                              <HighlightOffIcon />
                            </Button>
                          </Box>
                        )}
                        <Box
                          sx={{
                            border: '1px solid #000',
                            mt: '20px',
                            borderRadius: '4px',
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              borderBottom: '1px solid #000',
                              justifyContent: 'space-between',
                              '& .MuiTypography-body1 ': {
                                fontWeight: '700',
                                color: 'primary.dark',
                                textAlign: 'center',
                                fontSize: { xs: '0.65rem !important', lg: '1rem' },
                                padding: '12px 0',
                              },
                            }}
                          >
                            <Typography variant='body1' sx={{ flex: '1', }}>
                              Question
                            </Typography>
                            <Typography
                              variant='body1'
                              sx={{
                                maxWidth: { xs: '25%', lg: '200px' },
                                minWidth: { xs: '25%', lg: '200px' },
                                textAlign: 'center',
                              }}
                            >
                              View Detail
                            </Typography>
                          </Box>
                          {testQuestion?.question?.map((question) => (
                            <Box key={question._id}>
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  boxShadow: '0px 0px 1px #888888',
                                  padding: '12px 0 12px 32px',
                                  textAlign: 'left',
                                  '& .MuiButtonBase-root, & .MuiTypography-h6': {
                                    fontSize: { xs: '0.75rem', lg: '1rem' },
                                    color: 'primary.dark'
                                  },
                                  '&:hover': {
                                    backgroundColor: 'rgba(0,0,0,0.03)'
                                  }
                                }}
                              >
                                <Typography variant='h6' sx={{ flex: '1' }}>
                                  {question?.question}
                                </Typography>
                                <Button
                                  variant='text'
                                  startIcon={<MoreHorizTwoToneIcon />}
                                  onClick={() => handleViewDetail(question)}
                                  sx={{
                                    color: '#000',
                                    p: '',
                                    fontSize: { xs: '0.75rem', lg: '1rem' },
                                    fontWeight: '700',
                                    maxWidth: { xs: '20%', lg: '200px' },
                                    minWidth: { xs: '20%', lg: '200px' },
                                    textAlign: 'center'
                                  }}
                                ></Button>
                                <Dialog
                                  open={openViewDetail}
                                  onClose={handleCloseViewDetail}
                                  sx={{
                                    '& .MuiPaper-root': {
                                      minWidth: { xs: '90%', lg: '1200px' }, maxWidth: { xs: '90%', lg: '1200px' },
                                    },
                                  }}
                                >
                                  <DialogTitle
                                    sx={{
                                      backgroundColor: 'secondary.main',
                                      color: '#fff',
                                    }}
                                  >
                                    {question?.question}
                                    <Tooltip title='Close '>
                                      <CloseIcon
                                        onClick={handleCloseViewDetail}
                                        sx={{
                                          position: 'absolute',
                                          top: '8px',
                                          right: '8px',
                                          cursor: 'pointer'
                                        }}
                                      />
                                    </Tooltip>
                                  </DialogTitle>
                                  <DialogContent>
                                    <ListRepones responeList={responeList} />
                                  </DialogContent>
                                </Dialog>
                              </Box>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    )}
                  </Box>
                )}
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default MySample;
