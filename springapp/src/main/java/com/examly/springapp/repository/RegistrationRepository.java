package com.examly.springapp.repository;

import com.examly.springapp.model.Registration;
import com.examly.springapp.model.Student;
import com.examly.springapp.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegistrationRepository extends JpaRepository<Registration, Long> {
    List<Registration> findByStudent(Student student);
    List<Registration> findByStudentStudentId(String studentId);
    
    @Query("SELECT COUNT(r) FROM Registration r WHERE r.event.eventId = :eventId")
    long countByEventId(@Param("eventId") Long eventId);
    
    boolean existsByStudentStudentIdAndEventEventId(String studentId, Long eventId);
}
