import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { isEmpty } from 'lodash'
import { formatDate } from '../../untils/format'
import Button from '@mui/material/Button'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { GetAllQuestions } from '../../apis/index'
function MySample({ sampleList }) {
	const [questionList, setQuestionList] = useState([])
	const [allQuestion, setAllQuestion] = useState([])
	useEffect(() => {
		GetAllQuestions()
			.then(data => {
				setAllQuestion(data)
			})
			.catch(err => console.log('err: ', err))
	}, [])
	useEffect(() => {
		setQuestionList([])
	}, [sampleList])
	const getQuestionBySampleId = (sampleId) => {
		setQuestionList(allQuestion.filter(i => i?.sampleId === sampleId))
	}
	return (
		<Box sx={{}}>
			{isEmpty(sampleList) &&
				<Box>Chwa co sample</Box>
			}
			{!isEmpty(sampleList) &&
				<Box sx={{ width: '1200px', margin: '20px auto', border: '2px solid #ccc' }}>
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
						<Box key={sample._id}
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
							<Button
								variant='text'
								endIcon={<ExpandMoreIcon />}
								onClick={() => getQuestionBySampleId(sample._id)}
								sx={{
									color: '#000',
									p: '',
									fontSize: '16px',
									fontWeight: '700',
									flex: '1'
								}}
							>
							</Button>
						</Box>
					))}
				</Box>
			}
		</Box>
	)
}

export default MySample