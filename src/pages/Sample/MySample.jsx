import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { isEmpty } from 'lodash'
import { formatDate } from '../../untils/format'
import Button from '@mui/material/Button'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import SendIcon from '@mui/icons-material/Send'
import CloseIcon from '@mui/icons-material/Close'
import KeyboardArrowUpTwoToneIcon from '@mui/icons-material/KeyboardArrowUpTwoTone'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import { GetAllQuestions, getQuestionById, CreateQuestion, GetAllRespones } from '../../apis/index'
import { Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, Tooltip } from '@mui/material'
import { toast } from 'react-toastify'
import ListRepones from '../Respone/ListRepones'
function MySample({ sampleList, deleteSample }) {
	const [testQuestion, setTestQuestion] = useState(undefined)
	const [createQuestion, setCreateQuestion] = useState(false)
	const [createQuestionText, setCreateQuestionText] = useState('')
	const [openViewDetail, setOpenViewDetail] = useState(false)
	const [questionType, setQuestionType] = useState('text')
	const token = localStorage.getItem('Authorization')
	const handleCloseViewDetail = () => {
		setOpenViewDetail(false)
	}
	const [responeList, setResponeList] = useState([])
	const [allRes, setAllRes] = useState([])
	useEffect(() => {
		GetAllRespones()
			.then(data => {
				setAllRes(data)
			})
			.catch(err => toast.error(err?.response?.data?.message, { position: 'top-center' }))

	}, [])
	const handleViewDetail = (question) => {
		setResponeList(allRes.filter(a => a?.questionId?._id === question?._id))
		setOpenViewDetail(true)
	}
	const handleCreateQuestion = (sample) => {
		const dataSubmit = {
			sampleId: sample?._id,
			question: createQuestionText,
			questionType: questionType
		}
		CreateQuestion(dataSubmit, token, sample?.projectId)
			.then(data => {
				toast.success('Create question successfuly! ', { position: 'top-center' })
				setCreateQuestion(false)
				setCreateQuestionText('')
				setQuestionType('text')
				setTestQuestion(prevTestQuestion => {
					// Check if this is the same sampleId
					if (prevTestQuestion?.sampleId === sample?._id) {
						return {
							...prevTestQuestion,
							question: [...prevTestQuestion.question, data] // Append new question
						}
					}
					return prevTestQuestion
				})

			})
			.catch(err => {
				toast.error(err?.response?.data?.message, { position: 'top-center' })

			})
	}
	const handleCloseCreateQuestion = () => {
		setCreateQuestion(false)
		setCreateQuestionText('')
	}
	const handleDeleteSample = (id) => {
		deleteSample(id)
	}
	const getQuestionBySampleId = async (sample) => {
		try {
			// Gọi API getQuestionById cho từng questionId và thu thập kết quả
			const questionArray = await Promise.all(
				sample.questionId.map(questionId => getQuestionById(questionId, token))
			);
			setTestQuestion({
				sampleId: sample._id,
				question: questionArray
			}
			)
		} catch (error) {
			console.error('Error fetching questions:', error);
			return null;
		}
		// setQuestionList(allQuestion.filter(i => i?.sampleId === sampleId))
	}
	return (
		<Box sx={{}}>
			{isEmpty(sampleList) &&
				<Box>No a sample yet.</Box>
			}
			{!isEmpty(sampleList) &&
				<Box sx={{ width: '1200px', margin: '20px auto', border: '2px solid #000' }}>
					<Box sx={{
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
							padding: '12px 0'
						}
					}}>
						<Typography variant='body1' sx={{ flex: '1' }}>Sample Title</Typography>
						<Typography variant='body1' sx={{ flex: '1' }}>Create Date</Typography>
						<Typography variant='body1' sx={{ flex: '1' }}>Location</Typography>
						<Typography variant='body1' sx={{ flex: '1' }}>Sample Type</Typography>
						<Typography variant='body1' sx={{ flex: '1' }}>View all question</Typography>
					</Box>
					{sampleList?.map(sample => (
						<Box key={sample._id} sx={{ border: '1px solid #000', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>
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
										minWidth: '200px',
										maxWidth: '200px',
									},
									'&:hover': {
										backgroundColor: 'rgba(0,0,0,0.03)',
									}
								}}
							>
								<Typography variant='h6' sx={{ flex: '1' }}>
									{sample?.sampleTitle}
								</Typography>
								<Typography variant='h6' sx={{ flex: '1' }}>
									{formatDate(sample?.createdAt)}
								</Typography>
								<Typography variant='h6' sx={{ flex: '1' }}>
									{sample?.location}
								</Typography>
								<Typography variant='h6' sx={{ flex: '1' }}>
									{sample?.sampleType}
								</Typography>

								{testQuestion?.sampleId !== sample?._id &&
									<Button
										variant='text'
										endIcon={<ExpandMoreIcon />}
										onClick={() => getQuestionBySampleId(sample)}
										sx={{
											color: '#000',
											p: '',
											fontSize: '16px',
											fontWeight: '700',
											flex: '1'
										}}
									>
									</Button>
								}
								{testQuestion?.sampleId === sample?._id &&
									<Button
										variant='text'
										endIcon={<KeyboardArrowUpTwoToneIcon />}
										onClick={() => setTestQuestion(undefined)}
										sx={{
											color: '#000',
											p: '',
											fontSize: '16px',
											fontWeight: '700',
											flex: '1'
										}}
									>
									</Button>
								}
							</Box>
							<Box>
								{testQuestion?.sampleId === sample?._id &&
									<Box sx={{ backgroundColor: 'rgba(0,0,0,0.03)', padding: '32px 64px' }}>
										<Box sx={{ minWidth: '160px' }}>
											<Button variant='contained' onClick={() => handleDeleteSample(sample?._id)}
												sx={{
													fontSize: '14px',
													mb: '20px',
													color: '#fff',
													backgroundColor: 'error.main',
													border: '1px solid error.main',
													'&:hover': {
														border: '1px solid error.main',
														opacity: '0.8',
														backgroundColor: 'error.main'
													}
												}}>Delete Sample
											</Button>
										</Box>
										{isEmpty(testQuestion?.question) &&
											<Box >
												<Typography variant='h6' sx={{ flex: '1', mb: '12px' }}>
													There are not any questions yet
												</Typography>

												{!createQuestion && <Button fullWidth variant='outlined' startIcon={<AddToPhotosIcon />}
													onClick={() => setCreateQuestion(true)}
													sx={{
														fontSize: '14px',
														color: '#000',
														border: '1px solid #000',
														p: '7px 0',
														'&:hover': {
															border: '1px solid #000',
															opacity: '0.8'
														}
													}}>Add new question</Button>}

												{createQuestion &&
													<Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
														<Box sx={{
															flex: '1',
															'& .MuiFormLabel-root': {
																fontSize: '16px',
																right: 'auto',
																left: '0'
															},
															'&  .MuiOutlinedInput-root ': {
																fontSize: '16px',
																' & .MuiOutlinedInput-notchedOutline': {
																	border: '1px solid #000 !important'
																}
															}
														}}>
															<TextField
																autoFocus
																size="small"
																fullWidth
																label="Question"
																type="text"
																variant="outlined"
																value={createQuestionText}
																onChange={(e) => setCreateQuestionText(e.target.value)}
															/>
														</Box>
														<Box
															sx={{
																maxWidth: {
																	xs: '100%',
																	md: '120px',
																},
																minWidth: {
																	xs: '100%',
																	md: '120px',
																},
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
																	value={questionType || ''}
																	inputProps={{ MenuProps: { disableScrollLock: true } }}
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
														<Button variant='outlined' startIcon={< SendIcon />}
															onClick={() => handleCreateQuestion(sample)}
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
																	opacity: '0.8'
																}
															}}>Submit</Button>

														<Button variant='contained' startIcon={<HighlightOffIcon />}
															onClick={handleCloseCreateQuestion}
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
																	opacity: '0.8'
																}
															}}>Close</Button>

													</Box>
												}
											</Box>}
										{!isEmpty(testQuestion?.question) &&
											<Box >
												{!createQuestion && <Button fullWidth variant='outlined' startIcon={<AddToPhotosIcon />}
													onClick={() => setCreateQuestion(true)}
													sx={{
														fontSize: '14px',
														color: '#000',
														border: '1px solid #000',
														p: '7px 0',
														'&:hover': {
															border: '1px solid #000',
															opacity: '0.8'
														}
													}}>Add new question</Button>}

												{createQuestion &&
													<Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
														<Box sx={{
															flex: '1',
															'& .MuiFormLabel-root': {
																fontSize: '16px',
																right: 'auto',
																left: '0'
															},
															'&  .MuiOutlinedInput-root ': {
																fontSize: '16px',
																' & .MuiOutlinedInput-notchedOutline': {
																	border: '1px solid #000 !important'
																}
															}
														}}>
															<TextField
																autoFocus
																size="small"
																fullWidth
																label="Question"
																type="text"
																variant="outlined"
																value={createQuestionText}
																onChange={(e) => setCreateQuestionText(e.target.value)}
															/>
														</Box>
														<Box
															sx={{
																maxWidth: {
																	xs: '100%',
																	md: '120px',
																},
																minWidth: {
																	xs: '100%',
																	md: '120px',
																},
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
																	value={questionType || ''}
																	inputProps={{ MenuProps: { disableScrollLock: true } }}
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
														<Button variant='outlined' startIcon={< SendIcon />}
															onClick={() => handleCreateQuestion(sample)}
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
																	opacity: '0.8'
																}
															}}>Submit</Button>
														<Button variant='contained' startIcon={<HighlightOffIcon />}
															onClick={handleCloseCreateQuestion}
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
																	opacity: '0.8'
																}
															}}>Close</Button>
													</Box>
												}
												<Box sx={{ border: '1px solid #000', mt: '20px', borderRadius: '4px' }}>
													<Box sx={{
														display: 'flex',
														borderBottom: '1px solid #000',
														justifyContent: 'space-between',
														'& .MuiTypography-body1 ': {
															fontWeight: '700',
															color: 'primary.dark',
															textAlign: 'center',
															fontSize: '16px',
															padding: '12px 0'
														}
													}}>
														<Typography variant='body1' sx={{ flex: '1' }}>Question</Typography>
														<Typography variant='body1' sx={{ maxWidth: '200px', minWidth: '200px', textAlign: 'center' }} >View Detail</Typography>
													</Box>
													{
														testQuestion?.question?.map(question => (
															<Box key={question._id}>
																<Box sx={{
																	display: 'flex',
																	justifyContent: 'space-between',
																	alignItems: 'center',
																	boxShadow: '0px 0px 1px #888888',
																	padding: '12px 0 12px 32px',
																	textAlign: 'left',
																	'& .MuiButtonBase-root, & .MuiTypography-h6  ': {
																		color: 'primary.dark',
																	},
																	'&:hover': {
																		backgroundColor: 'rgba(0,0,0,0.03)',
																	}
																}}>
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
																			fontSize: '16px',
																			fontWeight: '700',
																			minWidth: '200px',
																			maxWidth: '200px',
																			textAlign: 'center'
																		}}
																	>
																	</Button>
																	<Dialog
																		open={openViewDetail}
																		onClose={handleCloseViewDetail}
																		sx={{ '& .MuiPaper-root': { minWidth: '1200px', maxWidth: '1200px' } }}
																	>
																		<DialogTitle sx={{ backgroundColor: 'secondary.main', color: '#fff' }}>
																			{question?.question}
																			<Tooltip title="Close ">
																				<CloseIcon onClick={handleCloseViewDetail} sx={{ position: 'absolute', top: '8px', right: '8px', cursor: 'pointer' }} />
																			</Tooltip>
																		</DialogTitle>
																		<DialogContent >
																			<ListRepones responeList={responeList} />
																		</DialogContent>
																	</Dialog>
																</Box>

															</Box>
														))
													}
												</Box>

											</Box>}
									</Box>
								}
							</Box>
						</Box>
					))}
				</Box>
			}
		</Box >
	)
}

export default MySample