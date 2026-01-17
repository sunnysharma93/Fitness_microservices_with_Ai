package com.fitness.activeSerivice.repository;

import com.fitness.activeSerivice.model.Activity;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ActivityRepository extends MongoRepository<Activity,String> {
}
