import React from 'react';
import { Container, Typography, Box, Grid, Paper, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  boxShadow: theme.shadows[3],
  borderRadius: '10px',
  backdropFilter: 'blur(10px)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const About = () => {
  return (
    <Box sx={{ py: 5, minHeight: '100vh', backgroundColor: '#f4f6f8' }}>
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            mb: 5,
          }}
        >
          <Typography variant="h2" gutterBottom>
            Welcome to NoteMate
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Your ultimate solution for managing notes efficiently and securely.
          </Typography>
        </Box>

        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} lg={6} xl={5}>
            <img
              src="/logo.png"
              alt="About NoteMate"
              loading="lazy"
              style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
            />
          </Grid>
          <Grid item xs={12} lg={6} xl={7}>
            <Typography variant="h4" gutterBottom>
              Who Are We?
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ fontSize: '1.25rem', color: 'text.secondary' }}>
              NoteMate is committed to providing a seamless experience for storing, organizing, and securing your notes.
              Whether you're a student, professional, or anyone who loves to stay organized, NoteMate simplifies your note-taking.
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ mt: 5 }}>
          <Typography variant="h4" gutterBottom textAlign="center">
            What We Do
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <StyledPaper>
                <Box display="flex" flexDirection="column" height="100%">
                  <NoteAddIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h5" gutterBottom>
                    Note Storage
                  </Typography>
                  <Typography variant="body2" color="text.secondary" flexGrow={1}>
                    Easily create and store notes with our intuitive interface. NoteMate ensures your notes are safely stored and easily retrievable.
                  </Typography>
                </Box>
              </StyledPaper>
            </Grid>
            <Grid item xs={12} md={4}>
              <StyledPaper>
                <Box display="flex" flexDirection="column" height="100%">
                  <DeleteIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h5" gutterBottom>
                    Note Deletion
                  </Typography>
                  <Typography variant="body2" color="text.secondary" flexGrow={1}>
                    Manage your notes effortlessly with our deletion feature. Keep your workspace clutter-free by removing notes you no longer need.
                  </Typography>
                </Box>
              </StyledPaper>
            </Grid>
            <Grid item xs={12} md={4}>
              <StyledPaper>
                <Box display="flex" flexDirection="column" height="100%">
                  <SecurityIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h5" gutterBottom>
                    User Authentication
                  </Typography>
                  <Typography variant="body2" color="text.secondary" flexGrow={1}>
                    Your privacy is our priority. NoteMate offers robust user authentication to keep your notes private and secure.
                  </Typography>
                </Box>
              </StyledPaper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
