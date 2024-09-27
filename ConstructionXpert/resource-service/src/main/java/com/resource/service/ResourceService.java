package com.resource.service;

import com.resource.enums.ResourceType;
import com.resource.exception.ResourceNotFoundException;
import com.resource.feign.TaskClient;
import com.resource.model.Resource;
import com.resource.repository.ResourceRepository;
import jakarta.persistence.criteria.Predicate;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ResourceService {

    private final TaskClient taskClient;
    private final ResourceRepository resourceRepository;

    public Resource createResource(Resource resource) {
        if (resource.getTaskId() == null) {
            throw new IllegalArgumentException("Task ID must not be null");
        }

        System.out.println("Task Id :" + resource.getTaskId());

        Boolean existTask = taskClient.existTask(resource.getTaskId());
        if (Boolean.TRUE.equals(existTask)) {
            return resourceRepository.save(resource);
        } else {
            throw new RuntimeException("Task not found");
        }
    }

    public Page<Resource> getAllResources(Long taskId, int page, int size, String sortField, String sortDirection) throws ResourceNotFoundException  {
        Boolean existProject = taskClient.existTask(taskId);
        if (Boolean.TRUE.equals(existProject)){
            Sort.Direction direction = sortDirection.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
            Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortField));
            return resourceRepository.findAllByTaskId(taskId, pageable);
        }
        throw new ResourceNotFoundException(taskId);
    }

    public Page<Resource> getFilteredResources(Long taskId, String name, Integer quantity, ResourceType type, String provider, int page, int size, String sortField, String sortDirection) throws ResourceNotFoundException {
        Boolean existTask = taskClient.existTask(taskId);
        if (Boolean.TRUE.equals(existTask)){
            Sort.Direction direction = sortDirection.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
            Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortField));

            Specification<Resource> spec = (root, query, criteriaBuilder) -> {
                List<Predicate> predicates = new ArrayList<>();

                predicates.add(criteriaBuilder.equal(root.get("taskId"), taskId));

                if (name != null && !name.isEmpty()) {
                    predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), "%" + name.toLowerCase() + "%"));
                }

                if (quantity != null) {
                    predicates.add(criteriaBuilder.equal(root.get("quantity"), quantity));
                }

                if (type != null) {
                    predicates.add(criteriaBuilder.equal(root.get("type"), type));
                }

                if (provider != null && !provider.isEmpty()) {
                    predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("provider")), "%" + provider.toLowerCase() + "%"));
                }

                predicates.add(criteriaBuilder.equal(root.get("taskId"), taskId));

                return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
            };

            return resourceRepository.findAll(spec, pageable);
        }
        throw new ResourceNotFoundException(taskId);
    }

    public List<Resource> getResourcesByTaskId(Long taskId) throws ResourceNotFoundException {
        Boolean existTask = taskClient.existTask(taskId);
        if (Boolean.TRUE.equals(existTask)) {
            return resourceRepository.findByTaskId(taskId);
        }
        throw new ResourceNotFoundException(taskId);
    }

    public List<Resource> getAllResources() {
        return resourceRepository.findAll();
    }

    public Resource updateResource (Long id, Resource resourceDetails) throws ResourceNotFoundException {
        Resource resource = resourceRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(id));
        resource.setName(resourceDetails.getName());
        resource.setQuantity(resourceDetails.getQuantity());
        resource.setType(resourceDetails.getType());
        resource.setProvider(resourceDetails.getProvider());
        return resourceRepository.save(resource);
    }

    public void deleteResource(Long id) {
        resourceRepository.deleteById(id);
        ResponseEntity.ok().build();
    }
}
