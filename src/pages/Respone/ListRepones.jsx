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
function ListRepones({ responeList }) {

	return (
		<Box sx={{ mt: '32px' }}>
			{isEmpty(responeList) &&
				<Box>No a response yet.</Box>
			}
			{!isEmpty(responeList) && responeList?.map(res => (
				<Box key={res._id} >
					<Box sx={{ padding: '8px', border: '1px solid #000', mb: '12px' }}>
						<Typography variant='h6' sx={{ flex: '1', fontWeight: 'bold' }}>
							User: {res?.userId?.email}
						</Typography>
						{res?.responseAnswer &&
							<Typography variant='h6' sx={{ flex: '1', mb: '12px' }}>
								<b>Answer: </b> {res?.responseAnswer}
							</Typography>
						}
						{res?.fileIds?.map(file => (
							<Box key={file._id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
								{file?.fileType?.includes('image') &&
									<img src={file?.storageURL} alt="" style={{ maxWidth: '500px', minWidth: '500px' }} />
								}
								{file?.fileType?.includes('pdf') &&
									<a href={file?.storageURL} target="_blank" rel="noreferrer" >
										<PdfLogo />
									</a>
								}
							</Box>
						))}
					</Box>
				</Box>
			))
			}
		</Box>
	)
}

export default ListRepones