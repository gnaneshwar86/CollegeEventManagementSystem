# Use a JDK 21 image to build the app
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Use a lightweight JRE 21 image to run the app
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

# Expose the port (Spring Boot default is 8080)
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
