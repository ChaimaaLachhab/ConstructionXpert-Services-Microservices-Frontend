package com.project.service;

import com.project.enums.Status;
import com.project.exception.ProjectNotFoundException;
import com.project.model.Project;
import com.project.repository.ProjectRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProjectServiceTest {

    @Mock
    private ProjectRepository projectRepository;

    @InjectMocks
    private ProjectService projectService;

    private Project project;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        project = new Project();
        project.setId(1L);
        project.setName("Project 1");
        project.setDescription("Test Project");
        project.setStartDate(null);
        project.setEndDate(null);
        project.setBudget(BigDecimal.valueOf(1000.0));
        project.setStatus(Status.TO_DO);
    }

    @Test
    void createProject() {
        when(projectRepository.save(any(Project.class))).thenReturn(project);

        Project createdProject = projectService.createProject(project);

        assertNotNull(createdProject);
        assertEquals("Project 1", createdProject.getName());
        verify(projectRepository, times(1)).save(any(Project.class));
    }

    @Test
    void getAllProjects() {
        List<Project> projects = new ArrayList<>();
        projects.add(project);
        when(projectRepository.findAll()).thenReturn(projects);

        List<Project> allProjects = projectService.getAllProjects();

        assertEquals(1, allProjects.size());
        verify(projectRepository, times(1)).findAll();
    }

    @Test
    void getProjectsById() {
        when(projectRepository.findById(1L)).thenReturn(Optional.of(project));

        Project foundProject = projectService.getProjectsById(1L);

        assertNotNull(foundProject);
        assertEquals("Project 1", foundProject.getName());
        verify(projectRepository, times(1)).findById(1L);
    }

    @Test
    void updateProject() throws ProjectNotFoundException {
        Project updatedProject = new Project();
        updatedProject.setName("Updated Project");

        when(projectRepository.findById(1L)).thenReturn(Optional.of(project));
        when(projectRepository.save(any(Project.class))).thenReturn(updatedProject);

        Project result = projectService.updateProject(1L, updatedProject);

        assertNotNull(result);
        assertEquals("Updated Project", result.getName());
        verify(projectRepository, times(1)).findById(1L);
        verify(projectRepository, times(1)).save(any(Project.class));
    }

    @Test
    void deleteProject() {
        doNothing().when(projectRepository).deleteById(1L);

        projectService.deleteProject(1L);

        verify(projectRepository, times(1)).deleteById(1L);
    }

    @Test
    void existProject() {
        when(projectRepository.findById(1L)).thenReturn(Optional.of(project));

        Boolean exists = projectService.existProject(1L);

        assertTrue(exists);
        verify(projectRepository, times(1)).findById(1L);
    }
}
