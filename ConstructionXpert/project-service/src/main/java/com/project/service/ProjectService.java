package com.project.service;

import com.project.exception.ProjectNotFoundException;
import com.project.model.Project;
import com.project.repository.ProjectRepository;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project getProjectsById(Long projectId) {
        return projectRepository.findById(projectId).get();
    }

    public Page<Project> getAllProjects(int page, int size, String sortField, String sortDirection) {
        Sort.Direction direction = sortDirection.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortField));
        return projectRepository.findAll(pageable);
    }

    public Page<Project> getFilteredProjects(String name, String status, LocalDate startDate, int page, int size, String sortField, String sortDirection) {
        Sort.Direction direction = sortDirection.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortField));

        Specification<Project> spec = (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (name != null && !name.isEmpty()) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), "%" + name.toLowerCase() + "%"));
            }

            if (status != null && !status.isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("status"), status));
            }

            if (startDate != null) {
                predicates.add(criteriaBuilder.equal(root.get("startDate"), startDate));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };

        return projectRepository.findAll(spec, pageable);
    }


    public Project updateProject (Long id, Project projectDetails) throws ProjectNotFoundException {
        Project project = projectRepository.findById(id).orElseThrow(() -> new ProjectNotFoundException(id));
        project.setName(projectDetails.getName());
        project.setDescription(projectDetails.getDescription());
        project.setStartDate(projectDetails.getStartDate());
        project.setEndDate(projectDetails.getEndDate());
        project.setBudget(projectDetails.getBudget());
        project.setStatus(projectDetails.getStatus());
        return projectRepository.save(project);
    }

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
        ResponseEntity.ok().build();
    }

    public Boolean existProject(Long id) {
        return projectRepository.findById(id).isPresent();
    }
}
