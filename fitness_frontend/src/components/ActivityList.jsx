import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getActivities } from '../services/api';
import { 
  Card, CardContent, Typography, Box, Stack, 
  Skeleton, Chip, CardActionArea, Grid // Standard Grid import
} from '@mui/material';
import TimerIcon from '@mui/icons-material/Timer';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const ActivityList = () => {
  const [activities, setActivities] = useState([]); 
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await getActivities();
        setActivities(Array.isArray(response.data) ? response.data : []); 
      } catch (error) {
        console.error("Fetch Error:", error);
        setActivities([]); 
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  if (loading) {
    return (
      <Grid container spacing={3}>
        {[1, 2, 3].map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item}>
            <Skeleton variant="rounded" height={140} sx={{ borderRadius: 3 }} />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, mt: 2 }}>
      <Grid container spacing={3}>
        {activities.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary" align="center">
              No activities found. Start your journey by adding one!
            </Typography>
          </Grid>
        ) : (
          activities.map((activity) => (
            <Grid item xs={12} sm={6} md={4} key={activity.id}>
              <Card 
                sx={{ 
                  borderRadius: 4, 
                  transition: '0.3s',
                  border: '1px solid #eee',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                  '&:hover': { 
                    transform: 'translateY(-5px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                    borderColor: 'primary.light'
                  } 
                }}
              >
                <CardActionArea onClick={() => navigate(`/activities/${activity.id}`)}>
                  <CardContent sx={{ p: 3 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <FitnessCenterIcon color="primary" />
                        <Typography variant='h6' sx={{ fontWeight: 800 }}>
                          {activity.type}
                        </Typography>
                      </Box>
                      <Chip 
                        label="AI Insights" 
                        size="small" 
                        color="success" 
                        variant="outlined" 
                        sx={{ fontSize: '0.7rem', fontWeight: 'bold' }}
                      />
                    </Stack>

                    <Stack direction="row" spacing={3}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <TimerIcon fontSize="small" sx={{ color: '#1976d2' }} />
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {activity.duration}m
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <LocalFireDepartmentIcon fontSize="small" sx={{ color: '#ff5722' }} />
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {activity.caloriesBurned} kcal
                        </Typography>
                      </Box>
                    </Stack>
                    
                    <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 2 }}>
                      {activity.createdAt ? new Date(activity.createdAt).toLocaleDateString() : 'Recent'}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default ActivityList;