import React, { useState } from 'react';
import { 
  Box, Button, FormControl, InputLabel, MenuItem, 
  Select, TextField, Typography, Paper, InputAdornment, Grid // Standard Grid import
} from '@mui/material';
import { addActivity } from '../services/api';
import AddTaskIcon from '@mui/icons-material/AddTask';
import TimerIcon from '@mui/icons-material/Timer';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

const ActivityForm = ({ onActivitiesAdded }) => {
    const [activity, setActivity] = useState({
        type: "RUNNING", 
        duration: '', 
        caloriesBurned: '',
        additionalMetrics: {}
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!activity.duration || !activity.caloriesBurned) {
            alert("Please fill all details!");
            return;
        }

        try {
            await addActivity(activity);
            if (onActivitiesAdded) onActivitiesAdded();
            setActivity({ type: "RUNNING", duration: '', caloriesBurned: '', additionalMetrics: {} });
        } catch (error) {
            console.error("Error adding activity:", error);
        }
    }
    
    return (
        <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #e0e0e0', bgcolor: '#fafafa', mb: 4 }}>
            <Box component="form" onSubmit={handleSubmit}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AddTaskIcon color="success" /> Log New Activity
                </Typography>

                <Grid container spacing={2}>
                    
                    {/* xs, md props use kiye hain standard Grid ke liye */}
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <InputLabel id="activity-type-label">Activity Type</InputLabel>
                            <Select
                                labelId="activity-type-label"
                                value={activity.type}
                                label="Activity Type"
                                onChange={(e) => setActivity({...activity, type: e.target.value})}
                            >
                                <MenuItem value="RUNNING">Running 🏃</MenuItem>
                                <MenuItem value="WALKING">Walking 🚶</MenuItem>
                                <MenuItem value="CYCLING">Cycling 🚴</MenuItem>
                                <MenuItem value="SWIMMING">Swimming 🏊</MenuItem>
                                <MenuItem value="YOGA">Yoga 🧘</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TextField 
                            fullWidth
                            label="Duration"
                            type='number'
                            placeholder="Minutes"
                            value={activity.duration}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <TimerIcon fontSize="small" />
                                    </InputAdornment>
                                ),
                            }}
                            onChange={(e) => setActivity({...activity, duration: e.target.value})}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TextField 
                            fullWidth
                            label="Calories"
                            type='number'
                            placeholder="Burned"
                            value={activity.caloriesBurned}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LocalFireDepartmentIcon fontSize="small" sx={{ color: '#ff5722' }} />
                                    </InputAdornment>
                                ),
                            }}
                            onChange={(e) => setActivity({...activity, caloriesBurned: e.target.value})}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button 
                            type='submit' 
                            variant='contained' 
                            fullWidth
                            size="large"
                            sx={{ 
                                mt: 1, 
                                py: 1.5, 
                                fontWeight: 'bold', 
                                borderRadius: 2,
                                backgroundColor: '#4CAF50',
                                '&:hover': { backgroundColor: '#388E3C' }
                            }}
                        >
                            Save Activity
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
}

export default ActivityForm;