package com.task.service;

import com.task.enums.Status;
import com.task.exception.TaskNotFoundException;
import com.task.feign.ProjectClient;
import com.task.model.Task;
import com.task.repository.TaskRepository;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final ProjectClient projectClient;
    private final TaskRepository taskRepository;

    public Task createTask(Task task) {
        Boolean existProject = projectClient.existProject(task.getProjectId());
        if (Boolean.TRUE.equals(existProject)) {
            return taskRepository.save(task);
        } else {
            throw new RuntimeException("Project not found");
        }
    }

    public List<Task> getTasksByProjectId(Long projectId) throws TaskNotFoundException {
        Boolean existProject = projectClient.existProject(projectId);
        if (Boolean.TRUE.equals(existProject)){
            return taskRepository.findByProjectId(projectId);
        }
        throw new TaskNotFoundException(projectId);
    }


    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Page<Task> getAllTasks(Long projectId, int page, int size, String sortField, String sortDirection) throws TaskNotFoundException  {
        Boolean existProject = projectClient.existProject(projectId);
        if (Boolean.TRUE.equals(existProject)){
            Sort.Direction direction = sortDirection.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
            Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortField));
            return taskRepository.findAllByProjectId(projectId, pageable);
        }
        throw new TaskNotFoundException(projectId);
    }

    public Page<Task> getFilteredTasks(Long projectId, LocalDate startDate, LocalDate endDate, Status status, int page, int size, String sortField, String sortDirection) throws TaskNotFoundException {
        Boolean existTask = projectClient.existProject(projectId);
        if (Boolean.TRUE.equals(existTask)){
            Sort.Direction direction = sortDirection.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
            Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortField));

            Specification<Task> spec = (root, query, criteriaBuilder) -> {
                List<Predicate> predicates = new ArrayList<>();

                predicates.add(criteriaBuilder.equal(root.get("projectId"), projectId));

                if (startDate != null) {
                    predicates.add(criteriaBuilder.equal(root.get("startDate"), startDate));
                }

                if (endDate != null) {
                    predicates.add(criteriaBuilder.equal(root.get("endDate"), endDate));
                }

                if (status != null) {
                    predicates.add(criteriaBuilder.equal(root.get("status"), status));
                }


                predicates.add(criteriaBuilder.equal(root.get("projectId"), projectId));

                return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
            };

            return taskRepository.findAll(spec, pageable);
        }
        throw new TaskNotFoundException(projectId);
    }

    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    public Task updateTask (Long id, Task resourceDetails) throws TaskNotFoundException {
        Task task = taskRepository.findById(id).orElseThrow(() -> new TaskNotFoundException(id));
        task.setDescription(resourceDetails.getDescription());
        task.setStartDate(resourceDetails.getStartDate());
        task.setEndDate(resourceDetails.getEndDate());
        task.setStatus(resourceDetails.getStatus());
        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
        ResponseEntity.ok().build();
    }

    public Boolean existTask(Long id) {
        return taskRepository.findById(id).isPresent();
    }
}
