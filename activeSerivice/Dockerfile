# ----------- Stage 1: Build -----------
FROM maven:3.9.6-eclipse-temurin-17 AS build

WORKDIR /app

# First copy pom.xml
COPY pom.xml .

# Download dependencies
RUN mvn -B dependency:go-offline

# Copy source code
COPY src ./src

# Package jar
RUN mvn -B clean package -DskipTests


# ----------- Stage 2: Runtime -----------
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]
