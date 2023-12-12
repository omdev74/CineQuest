// components/common/Footer/Footer.jsx

import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      mt={5}
      py={2}
      bgcolor="#1c1b1e"  // Adjust background color here
      color="#fff"       // Adjust text color here
      textAlign="center"
    >
      <Typography variant="body2">
        © 2023 Your Website Name. All rights reserved.
      </Typography>
      <Typography variant="body2" mt={1}>
        Made with ❤️ by Your Team
      </Typography>
    </Box>
  );
};

export default Footer;
