package com.fitness.activeSerivice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class ActiveSeriviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ActiveSeriviceApplication.class, args);
	}

}
