import { Box, Button, Typography, AppBar, Toolbar, Container, CssBaseline, Paper } from "@mui/material";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Navigate, Route, Routes, Link } from "react-router-dom"; // router-dom use karein
import { setCredentials } from "./store/authSlice";
import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import ActivityDetail from "./components/ActivityDetail";

const ActvitiesPage = () => {
  return (
    <Box sx={{ mt: 4 }}>
      <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 4, border: '1px solid #e0e0e0' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>Add New Workout</Typography>
        <ActivityForm onActivitiesAdded={() => window.location.reload()} />
      </Paper>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>Your Activities</Typography>
      <ActivityList />
    </Box>
  );
};

function App() {
  const { token, tokenData, logIn, logOut, isAuthenticated } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(setCredentials({ token, user: tokenData }));
      setAuthReady(true);
    }
  }, [token, tokenData, dispatch]);

  return (
    <Router>
      <CssBaseline />
      
      {/* --- PRODUCTION LEVEL NAVBAR --- */}
      <AppBar position="fixed" sx={{ backgroundColor: '#1a1a1a', boxShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', color: 'inherit' }} component={Link} to="/">
              <FitnessCenterIcon sx={{ color: '#4CAF50', fontSize: '2rem' }} />
              <Typography variant="h5" sx={{ fontWeight: 900, letterSpacing: '1px' }}>DHARAFIT</Typography>
            </Box>

            {token && (
              <Button 
                variant="outlined" 
                color="error" 
                onClick={logOut}
                sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 'bold', borderColor: '#ff1744', color: '#ff1744' }}
              >
                Logout
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Toolbar /> {/* Spacer */}

      <Container maxWidth="lg" sx={{ mt: 4, minHeight: '80vh' }}>
        {!token ? (
          /* --- LANDING PAGE (LOGIN) --- */
          <Box
            sx={{
              height: "70vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <FitnessCenterIcon sx={{ fontSize: '5rem', color: '#4CAF50', mb: 2 }} />
            <Typography variant="h2" sx={{ fontWeight: 800, mb: 1 }}>
              DharaFit <span style={{ color: '#4CAF50' }}>AI</span>
            </Typography>
            <Typography variant="h6" color="textSecondary" sx={{ mb: 4, maxWidth: '500px' }}>
              The smartest way to track your fitness journey. Login to sync your activities.
            </Typography>
            <Button 
              variant="contained" 
              size="large" 
              onClick={() => logIn()}
              sx={{ 
                backgroundColor: '#4CAF50', 
                px: 6, py: 1.5, 
                fontSize: '1.1rem', 
                fontWeight: 'bold', 
                borderRadius: '12px',
                '&:hover': { backgroundColor: '#388E3C' }
              }}
            >
              LOGIN TO START
            </Button>
          </Box>
        ) : (
          /* --- LOGGED IN ROUTES --- */
          <Routes>
            <Route path="/activities" element={<ActvitiesPage />} />
            <Route path="/activities/:id" element={<ActivityDetail />} />
            {/* Redirect logic */}
            <Route path="/" element={<Navigate to="/activities" replace />} />
            <Route path="*" element={<Navigate to="/activities" replace />} />
          </Routes>
        )}
      </Container>

      {/* Footer (Optional) */}
      <Box sx={{ py: 4, textAlign: 'center', opacity: 0.5 }}>
        <Typography variant="body2">© 2026 DharaFit AI. Keep Grinding.</Typography>
      </Box>
    </Router>
  );
}

export default App;