import { useEffect, useRef, useState } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { isEmpty } from 'lodash'
import { formatDate } from '../../untils/format'
import Button from '@mui/material/Button'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone'


import SendIcon from '@mui/icons-material/Send'
import KeyboardArrowUpTwoToneIcon from '@mui/icons-material/KeyboardArrowUpTwoTone'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import { CreateRespones, GetAllQuestions, getQuestionById } from '../../apis/index'
import { TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
function ElseSample({ sampleList }) {
	const [testQuestion, setTestQuestion] = useState(undefined)
	console.log('testQuestion: ', testQuestion)
	const { register, handleSubmit, formState: { errors } } = useForm()
	const test = useRef(null)
	const token = localStorage.getItem('Authorization')

	const handleSubmitForm = (data) => {
		const formDataList = []
		for (const [key, value] of Object.entries(data)) {
			console.log(`${key}: ${value}`)
			if (testQuestion?.question?.map(a => a?._id).includes(key)) {
				const formData = new FormData()
				formData.append('questionId', key)
				if (typeof value === 'string') {
					formData.append('responseAnswer', value)
				} else {
					const fileLength = value.length
					for (let i = 0; i < fileLength; i++) {
						formData.append('files', value[i])
					}
				}
				formDataList.push(formData)
			}
		}
		formDataList.forEach((formData) => {
			CreateRespones(token, formData)
				.then(data => {
					toast.success(`Submit response for question: ${data?.questionId?.question} successfuly! `, { position: 'top-center' })
				})
				.catch(err => toast.error(err?.response?.data?.message, { position: 'top-center' }))
		})

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
										{isEmpty(testQuestion?.question) &&
											<Box >
												<Typography variant='h6' sx={{ flex: '1', mb: '12px' }}>
													There are not any questions yet
												</Typography>

											</Box>}
										{!isEmpty(testQuestion?.question) &&
											<Box  >
												<form onSubmit={handleSubmit(handleSubmitForm)}>
													<Box sx={{ border: '1px solid #000', padding: '0 20px 20px 20px', borderRadius: '4px' }}>
														{
															testQuestion?.question?.map(question => (
																<Box key={question._id}>
																	<Box sx={{
																		textAlign: 'left',
																		'& .MuiButtonBase-root, & .MuiTypography-h6  ': {
																			color: 'primary.dark'
																		}
																	}}>
																		<Typography variant='h6' sx={{ flex: '1', m: '20px 0 8px', }}>
																			{question?.question}
																		</Typography>
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
																					inputProps={question?.questionType === 'file' || question?.questionType === 'image' ? { multiple: true } : {}}
																					label={question?.questionType === 'file' || question?.questionType === 'image' ? '' : 'Answer'}
																					type={question?.questionType === 'file' || question?.questionType === 'image' ? 'file' : 'text'}
																					variant="outlined"
																					{...register(`${question?._id}`)}
																				// value={createQuestionText}
																				// onChange={(e) => setCreateQuestionText(e.target.value)}
																				/>
																			</Box>

																		</Box>
																	</Box>
																</Box>
															))
														}
														<Button
															type="submit"
															variant="contained"
															color="primary"
															size="large"
															fullWidth
															sx={{
																backgroundColor: 'secondary.main',
																mt: '32px',
																color: 'primary.main',
																transition: 'all linear .3s',
																'&:hover': {
																	backgroundColor: 'secondary.main',
																	opacity: '0.9'
																}
															}}
														>
															SUBMIT
														</Button>
													</Box>
												</form>
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

export default ElseSample