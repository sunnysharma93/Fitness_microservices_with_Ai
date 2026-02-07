import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getActivityDetail } from '../services/api';
import { 
  Box, Card, CardContent, Divider, Typography, 
  Grid, Chip, CircularProgress, Stack 
} from '@mui/material';
// Icons for professional look
import TimerIcon from '@mui/icons-material/Timer';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SecurityIcon from '@mui/icons-material/Security';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

const ActivityDetail = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    const fetchActivityDetail = async () => {
      try {
        const response = await getActivityDetail(id);
        setActivity(response.data);
        setRecommendation(response.data.recommendation);
      } catch (error) {
        console.error(error);
      }
    }
    fetchActivityDetail();
  }, [id]);

  if (!activity) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress color="success" />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: { xs: 2, md: 4 } }}>
      
      {/* 1. Main Activity Stats Card */}
      <Card sx={{ mb: 4, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <CardContent sx={{ p: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              Activity Details
            </Typography>
            <Chip 
              label={activity.type} 
              color="primary" 
              sx={{ fontWeight: 'bold', fontSize: '1rem', px: 1 }} 
            />
          </Stack>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <TimerIcon color="primary" />
                <Box>
                  <Typography variant="caption" color="textSecondary">DURATION</Typography>
                  <Typography variant="h6">{activity.duration} Minutes</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <LocalFireDepartmentIcon sx={{ color: '#ff5722' }} />
                <Box>
                  <Typography variant="caption" color="textSecondary">CALORIES</Typography>
                  <Typography variant="h6">{activity.caloriesBurned} kcal</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <CalendarMonthIcon color="action" />
                <Box>
                  <Typography variant="caption" color="textSecondary">DATE</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {new Date(activity.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* 2. AI Recommendation Section */}
      {recommendation && (
        <Card sx={{ 
          borderRadius: 3, 
          background: 'linear-gradient(135deg, #ffffff 0%, #f9fff9 100%)',
          border: '1px solid #e0e0e0',
          boxShadow: '0 8px 30px rgba(76, 175, 80, 0.1)'
        }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <AutoAwesomeIcon sx={{ color: '#4CAF50' }} />
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#2e7d32' }}>
                DharaFit AI Insights
              </Typography>
            </Box>

            <Typography variant="h6" color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              Analysis
            </Typography>
            <Typography paragraph sx={{ lineHeight: 1.7, color: '#444' }}>
              {activity.recommendation}
            </Typography>
            
            <Divider sx={{ my: 3 }} />
            
            <Grid container spacing={4}>
              {/* Improvements Section */}
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TipsAndUpdatesIcon fontSize="small" color="warning" /> Key Improvements
                </Typography>
                {activity?.improvements?.map((improvement, index) => (
                  <Typography key={index} variant="body2" sx={{ mb: 1, pl: 1, borderLeft: '3px solid #ffb74d' }}>
                    {improvement}
                  </Typography>
                ))}
              </Grid>

              {/* Safety Section */}
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SecurityIcon fontSize="small" color="error" /> Safety Guidelines
                </Typography>
                {activity?.safety?.map((safety, index) => (
                  <Typography key={index} variant="body2" sx={{ mb: 1, pl: 1, borderLeft: '3px solid #ef5350' }}>
                    {safety}
                  </Typography>
                ))}
              </Grid>
            </Grid>

            {/* Suggestions */}
            <Box sx={{ mt: 3, p: 2, bgcolor: '#f1f8e9', borderRadius: 2 }}>
               <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>Suggestions</Typography>
               {activity?.suggestions?.map((suggestion, index) => (
                  <Typography key={index} variant="body2" color="textSecondary">• {suggestion}</Typography>
               ))}
            </Box>

          </CardContent>
        </Card>
      )}
    </Box>
  )
}

export default ActivityDetail;