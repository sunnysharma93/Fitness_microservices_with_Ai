package com.fitness.activeSerivice.service;

import com.fitness.activeSerivice.dto.ActivityRequest;
import com.fitness.activeSerivice.dto.ActivityResponse;
import com.fitness.activeSerivice.model.Activity;
import com.fitness.activeSerivice.repository.ActivityRepository;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ActivityService {

    private final ActivityRepository activityRepository;
    private final UserValidationService  userValidationService;

    public ActivityResponse tractActivity(ActivityRequest activityRequest) {

      boolean isValidUser =   userValidationService.validateUser(activityRequest.getUserId());
      if(!isValidUser){
          throw new RuntimeException("Invalid user" + activityRequest.getUserId());
      }

        Activity activity = Activity.builder()
                .userId(activityRequest.getUserId())
                .type(activityRequest.getType())
                .duration(activityRequest.getDuration())
                .caloriesBurned(activityRequest.getCaloriesBurned())
                .startTime(activityRequest.getStartTime())
                .additionalMetrics(activityRequest.getAdditionalMatrics())
                .build();

        Activity savedActivity = activityRepository.save(activity);

        return maptoResponse(savedActivity);
    }
    private ActivityResponse maptoResponse(Activity activity) {

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
}
