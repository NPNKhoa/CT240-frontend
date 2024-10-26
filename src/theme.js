import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

// const APP_BAR_HEIGHT = '64px'
// const BROAD_BAR_HEIGHT = '60px'
// const BROAD_CONTENT_HEIGHT = `calc( 100vh - ${APP_BAR_HEIGHT} - ${BROAD_BAR_HEIGHT})`
// const COLUMN_HEADER_HEIGHT = '48px'
// const COLUMN_FOOTER_HEIGHT = '48px'

// Create a theme instance.
const theme = extendTheme({
	custom: {
	},
	palette: {
		primary: {
			main: '#fff',
			dark: '#000',
			contrastText: '#000'
		},
		secondary: {
			main: '#6ea033',
			dark: '#000',
			contrastText: '#000'
		},
		text: {
			primary: '#000'
		},
		background: {
			default: '#fff',
			paper: '#fff'
		}
	},
	typography: {
		fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
		fontCustom: '"Anek Odia", sans-serif',
		fontPE: '"Playwrite PE"'
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					'*::-webkit-scrollbar': {
						width: '4px',
						height: '4px'
					},
					'*::-webkit-scrollbar-thumb': {
						backgroundColor: '#728B74',
						borderRadius: 4
					},
					'*::-webkit-scrollbar-track ': {
						margin: '8px 0'
					},
					'*::-webkit-scrollbar-thumb:hover': {
						backgroundColor: '#6ea033'
					}
				}
			}
		},
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'capitalize'
				}
			}
		},
		MuiFormLabel: {
			styleOverrides: {
				root: ({ theme }) => ({
					color: '#000 !important',
					[theme.breakpoints.up('md')]: {
						fontSize: '20px'
					},
					[theme.breakpoints.down('md')]: {
						fontSize: '16px',
						lineHeight: '2'
					},
					left: 'auto !important',
					right: '50px'
				})
			}
		},
		MuiTypography: {
			styleOverrides: {
				root: {
					'&.MuiTypography-body1': {
						fontSize: '0.875rem'
					}
				}
			}
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: ({ theme }) => ({
					color: theme.palette.primary.dark,
					fontSize: '20px',
					'& .MuiOutlinedInput-notchedOutline': {
						borderColor: theme.palette.primary.light,
						borderWidth: '1px !important'
					},
					'&:hover .MuiOutlinedInput-notchedOutline': {
						borderColor: theme.palette.primary.main
					}
				})
			}

		}

	}
})

export default theme
