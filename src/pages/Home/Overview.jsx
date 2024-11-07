import React from 'react';
import Box from '@mui/material/Box';
function Overview() {
  const styles = {
    main: {
      width: '100%',
      background:
        'linear-gradient(to top, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.5) 50%), url(src/assets/Background_4.jpg)',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      height: '100vh',
      paddingTop: '40px',
    },
    navbar: {
      width: '100%',
      height: '75px',
      margin: 'auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    content: {
      width: '100%',
      height: 'auto',
      margin: 'auto',
      color: '#fff',
      position: 'relative',
    },
    heading: {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: { xs: '1rem', md: '3.5rem' },
      paddingLeft: '20px',
      marginTop: '0px',
      letterSpacing: '2px',
    },
    Agriculture: {
      color: '#83c13b',
    },
    paragraph: {
      paddingLeft: '20px',
      paddingBottom: '25px',
      fontFamily: 'Arial',
      letterSpacing: '1.2px',
      lineHeight: '30px',
    },
    menuItem: {
      listStyle: 'none',
      marginLeft: '62px',
      marginTop: '27px',
      fontSize: '15px',
    },
    link: {
      textDecoration: 'none',
      color: '#fff',
      fontFamily: 'Arial',
      fontWeight: 'bold',
      transition: '0.4s ease-in-out',
    },
  };

  return (
    <Box sx={styles.main}>
      <Box sx={styles.content}>
        <h1 style={styles.heading}>
          Sample Collecting
          <br />
        </h1>
        <p style={styles.paragraph}>
          Sample Collecting is a web application designed for collecting and
          managing data from any type of projects. This application allows users
          to collect images and sample information for scientific research and
          learning activities directly on their browser quickly and without data
          losing.
        </p>
      </Box>
    </Box>
  );
}

export default Overview;
