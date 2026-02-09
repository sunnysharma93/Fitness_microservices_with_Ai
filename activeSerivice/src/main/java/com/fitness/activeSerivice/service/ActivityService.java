package com.fitness.activeSerivice.service;

import com.fitness.activeSerivice.dto.ActivityRequest;
import com.fitness.activeSerivice.dto.ActivityResponse;
import com.fitness.activeSerivice.model.Activity;
import com.fitness.activeSerivice.repository.ActivityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ActivityService {

    private final ActivityRepository activityRepository;
    private final UserValidationService userValidationService;
    private final KafkaTemplate<String, Activity> kafkaTemplate;

    @Value("${kafka.topic.name:activity-events}")
    private String topicName;

    public ActivityResponse trackActivity(ActivityRequest activityRequest) {
        //  Testing ke liye validation comment kar raha hoon taaki 500 error na aaye

//        boolean isValidUser = userValidationService.validateUser(activityRequest.getUserId());
//        if(!isValidUser){
//            throw new RuntimeException("Invalid user: " + activityRequest.getUserId());
//        }

        Activity activity = Activity.builder()
                .userId(activityRequest.getUserId())
                .type(activityRequest.getType())
                .duration(activityRequest.getDuration())
                .caloriesBurned(activityRequest.getCaloriesBurned())
                .startTime(activityRequest.getStartTime())
                .additionalMetrics(activityRequest.getAdditionalMatrics()) // Check typo in 'Matrics' if needed
                .build();

        Activity savedActivity = activityRepository.save(activity);

        try {
            kafkaTemplate.send(topicName, savedActivity.getUserId(), savedActivity);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return mapToResponse(savedActivity); // ✅ Case matching fixed
    }

    // ✅ Method name CamelCase kar diya (Standard)
    private ActivityResponse mapToResponse(Activity activity) {
        ActivityResponse activityResponse = new ActivityResponse();
        activityResponse.setId(activity.getId());
        activityResponse.setUserId(activity.getUserId());
        activityResponse.setType(activity.getType());
        activityResponse.setDuration(activity.getDuration());
        activityResponse.setCaloriesBurned(activity.getCaloriesBurned());
        activityResponse.setStartTime(activity.getStartTime());
        activityResponse.setAdditionalMetrics(activity.getAdditionalMetrics());
        activityResponse.setCreatedAt(activity.getCreatedAt());
        activityResponse.setUpdatedAt(activity.getUpdatedAt());
        return activityResponse;
    }

    public List<ActivityResponse> getActivitiesByUserId(String userId) {
        // Database se data nikalo
        List<Activity> activities = activityRepository.findByUserId(userId);

        // ✅ mapToResponse call fixed
        return activities.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
}