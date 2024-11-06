import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { isEmpty } from 'lodash';
import PdfLogo from '../../assets/PDF_file_icon.svg?react';
import { Stack } from '@mui/material';
function ListRepones({ responeList }) {
  return (
    <Box sx={{ mt: '32px' }}>
      {isEmpty(responeList) && <Box>Empty</Box>}
      {!isEmpty(responeList) &&
        responeList?.map((res) => (
          <Box key={res._id}>
            <Box sx={{ padding: '8px', border: '1px solid #000', mb: '12px' }}>
              <Typography variant='h6' sx={{ flex: '1', fontWeight: 'bold' }}>
                User: {res?.userId?.email}
              </Typography>
              {res?.responseAnswer && (
                <Typography variant='h6' sx={{ flex: '1', mb: '12px' }}>
                  <b>Answer: </b> {res?.responseAnswer}
                </Typography>
              )}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  flexWrap: 'wrap',
                }}
              >
                {res?.fileIds?.map((file) => (
                  <Box key={file._id}>
                    {file?.fileType?.includes('image') && (
                      <img
                        src={file?.storageURL}
                        alt=''
                        style={{ maxWidth: '400px', minWidth: '400px' }}
                      />
                    )}
                    {file?.fileType?.includes('pdf') && (
                      <a
                        href={file?.storageURL}
                        target='_blank'
                        rel='noreferrer'
                        style={{
                          textDecoration: 'none',
                        }}
                      >
                        <Stack spacing={1}>
                          <PdfLogo />
                          <span
                            style={{
                              color: '#000',
                              fontSize: '1.5rem',
                              paddingLeft: '0.75rem',
                            }}
                          >
                            Click here to see the file!
                          </span>
                        </Stack>
                      </a>
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        ))}
    </Box>
  );
}

export default ListRepones;
