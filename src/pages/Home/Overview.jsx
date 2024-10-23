import React from 'react';
import Box from '@mui/material/Box';
import { Agriculture } from '@mui/icons-material';

function Overview() {
  const styles = {
    main: {
		width: '100%',
		background: 'linear-gradient(to top, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.5) 50%), url(src/assets/Background_4.jpg)',
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		height: '100vh'
	  },
	  navbar: {
		width: '1200px',
		height: '75px',
		margin: 'auto',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between'
	  },
	  content: {
		width: '1200px',
		height: 'auto',
		margin: 'auto',
		color: '#fff',
		position: 'relative'
	  },
	  heading: {
		fontFamily: '"Times New Roman"',
		fontSize: '50px',
		paddingLeft: '20px',
		marginTop: '9%',
		letterSpacing: '2px'
	  },
	  Agriculture:{
		color: '#83c13b'
	  },
	  paragraph: {
		paddingLeft: '20px',
		paddingBottom: '25px',
		fontFamily: 'Arial',
		letterSpacing: '1.2px',
		lineHeight: '30px'
	  },
	  menuItem: {
		listStyle: 'none',
		marginLeft: '62px',
		marginTop: '27px',
		fontSize: '15px'
	  },
	  link: {
		textDecoration: 'none',
		color: '#fff',
		fontFamily: 'Arial',
		fontWeight: 'bold',
		transition: '0.4s ease-in-out'
	  }
  };

  return (
	<Box sx={styles.main}>
	<Box sx={styles.navbar}>
	  <ul style={{ display: 'flex', justifyContent: 'space-between' }}>
		<li style={styles.menuItem}><a style={styles.link} href="#">HOME</a></li>
		<li style={styles.menuItem}><a style={styles.link} href="#">ABOUT</a></li>
		<li style={styles.menuItem}><a style={styles.link} href="#">PROJECT</a></li>
		<li style={styles.menuItem}><a style={styles.link} href="#">PHASE</a></li>
	  </ul>
	</Box>

	<Box sx={styles.content}>
	  <h1 style={styles.heading}>
		Sample Collecting For
		<br />
		<span style={styles.Agriculture} >Agriculture</span>
	  </h1>
	  <p style={styles.paragraph}>
		Sample Collecting is a web application designed for collecting and
		managing data related to agriculture, environment, fisheries,
		scientific research. The application allows users to collect images
		and sample information for scientific research and learning activities
		directly on their browser quickly and without data loss.
	  </p>
	</Box>
  </Box>
  );
}

export default Overview;