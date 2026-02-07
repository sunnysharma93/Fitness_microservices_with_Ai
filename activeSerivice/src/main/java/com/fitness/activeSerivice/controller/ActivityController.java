package com.fitness.activeSerivice.controller;

import com.fitness.activeSerivice.dto.ActivityRequest;
import com.fitness.activeSerivice.dto.ActivityResponse;
import com.fitness.activeSerivice.service.ActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
@RequiredArgsConstructor
public class ActivityController {

    private final ActivityService activityService;

    // ✅ YE MISSING THA: Iske bina frontend par list nahi dikhegi (Fixes 405)
    @GetMapping
    public ResponseEntity<List<ActivityResponse>> getAllActivities(@RequestHeader("X-User-ID") String userId) {
        // Aapki service mein ye method hona chahiye jo user ke hisab se activities laye
        return ResponseEntity.ok(activityService.getActivitiesByUserId(userId));
    }

    @PostMapping
    public ResponseEntity<ActivityResponse> trackActivity(
            @RequestBody ActivityRequest activityRequest,
            @RequestHeader("X-User-ID") String userId) {

        activityRequest.setUserId(userId);
        return ResponseEntity.ok(activityService.trackActivity(activityRequest));
    }
}