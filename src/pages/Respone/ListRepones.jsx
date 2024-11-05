import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { isEmpty } from 'lodash'
import PdfLogo from '../../assets/PDF_file_icon.svg?react'
import { formatDate } from '../../untils/format'
import Button from '@mui/material/Button'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import SendIcon from '@mui/icons-material/Send'
import { GetAllRespones } from '../../apis/index'
import { toast } from 'react-toastify'
function ListRepones({ question }) {
	const [responeList, setResponeList] = useState([])
	console.log('responeList: ', responeList)
	useEffect(() => {
		GetAllRespones()
			.then(data => {
				setResponeList(data.filter(a => a?.questionId?._id === question?._id))
			})
			.catch(err => toast.error(err?.response?.data?.message, { position: 'top-center' }))
	}, [question])
	return (
		<Box sx={{ mt: '32px' }}>
			{isEmpty(responeList) &&
				<Box>No a response yet.</Box>
			}
			{!isEmpty(responeList) && responeList?.map(res => (
				<Box key={res._id} >
					{res?.userId?.email}
					{res?.responseAnswer}
					{res?.fileIds?.map(file => (
						<Box key={file._id}>
							{file?.fileType?.includes('image') &&
								<img src={file?.storageURL} alt="" style={{ maxWidth: '1000px', minWidth: '1000px' }} />
							}
							{file?.fileType?.includes('pdf') &&
								<a href={file?.storageURL} target="_blank" rel="noreferrer" >
									<PdfLogo />
								</a>
							}
						</Box>
					))}
				</Box>
			))
			}
		</Box>
	)
}

export default ListRepones