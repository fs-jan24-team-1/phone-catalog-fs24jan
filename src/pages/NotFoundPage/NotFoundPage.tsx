import { Link } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export const NotFoundPage = () => {
  return (
    <Box textAlign="center" marginTop="20vh">
      <h1>Oops! Lost page. Stay calm!</h1>
      <Link to="/">
        <Button
          variant="contained"
          startIcon={<ArrowBackIosNewIcon />}
          sx={{
            marginTop: '20px',
            backgroundColor: '#4219D0',
            color: '#FFFFFF',
            borderRadius: '48px',
            height: '48px',
            '&:hover': {
              backgroundColor: '#E2E6E9',
              color: '#4219D0',
            },
          }}
        >
          Home
        </Button>
      </Link>
    </Box>
  );
};
