package com.resource.service;

import com.resource.enums.ResourceType;
import com.resource.exception.ResourceNotFoundException;
import com.resource.feign.TaskClient;
import com.resource.model.Resource;
import com.resource.repository.ResourceRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ResourceServiceTest {

    @Mock
    private ResourceRepository resourceRepository;

    @Mock
    private TaskClient taskClient;

    @InjectMocks
    private ResourceService resourceService;

    private Resource resource;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        resource = new Resource();
        resource.setId(1L);
        resource.setTaskId(1L);
        resource.setName("Test Resource");
        resource.setQuantity(5);
        resource.setType(ResourceType.SERVICE);
        resource.setProvider("Test Provider");
    }

    @Test
    void createResource() {
        when(taskClient.existTask(resource.getTaskId())).thenReturn(true);
        when(resourceRepository.save(any(Resource.class))).thenReturn(resource);

        Resource createdResource = resourceService.createResource(resource);

        assertNotNull(createdResource);
        assertEquals("Test Resource", createdResource.getName());
        verify(resourceRepository, times(1)).save(any(Resource.class));
        verify(taskClient, times(1)).existTask(resource.getTaskId());
    }

    @Test
    void getResourcesByTaskId() throws ResourceNotFoundException {
        List<Resource> resources = new ArrayList<>();
        resources.add(resource);
        when(taskClient.existTask(resource.getTaskId())).thenReturn(true);
        when(resourceRepository.findByTaskId(resource.getTaskId())).thenReturn(resources);

        List<Resource> resourceList = resourceService.getResourcesByTaskId(resource.getTaskId());

        assertNotNull(resourceList);
        assertEquals(1, resourceList.size());
        verify(resourceRepository, times(1)).findByTaskId(resource.getTaskId());
        verify(taskClient, times(1)).existTask(resource.getTaskId());
    }

    @Test
    void getAllResources() {
        List<Resource> resources = new ArrayList<>();
        resources.add(resource);
        when(resourceRepository.findAll()).thenReturn(resources);

        List<Resource> allResources = resourceService.getAllResources();

        assertEquals(1, allResources.size());
        verify(resourceRepository, times(1)).findAll();
    }

    @Test
    void updateResource() throws ResourceNotFoundException {
        Resource updatedResource = new Resource();
        updatedResource.setName("Updated Resource");
        updatedResource.setQuantity(10);
        updatedResource.setType(ResourceType.TOOL);
        updatedResource.setProvider("Updated Provider");

        when(resourceRepository.findById(resource.getId())).thenReturn(Optional.of(resource));
        when(resourceRepository.save(any(Resource.class))).thenReturn(updatedResource);

        Resource result = resourceService.updateResource(resource.getId(), updatedResource);

        assertNotNull(result);
        assertEquals("Updated Resource", result.getName());
        assertEquals(10, result.getQuantity());
        verify(resourceRepository, times(1)).findById(resource.getId());
        verify(resourceRepository, times(1)).save(any(Resource.class));
    }

    @Test
    void deleteResource() {
        doNothing().when(resourceRepository).deleteById(resource.getId());

        resourceService.deleteResource(resource.getId());

        verify(resourceRepository, times(1)).deleteById(resource.getId());
    }
}
