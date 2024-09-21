package com.task.service;

import com.task.enums.Status;
import com.task.exception.TaskNotFoundException;
import com.task.feign.ProjectClient;
import com.task.model.Task;
import com.task.repository.TaskRepository;
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

class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @Mock
    private ProjectClient projectClient;

    @InjectMocks
    private TaskService taskService;

    private Task task;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        task = new Task();
        task.setId(1L);
        task.setProjectId(1L);
        task.setDescription("Test Task");
        task.setStartDate(null);
        task.setEndDate(null);
        task.setStatus(Status.IN_PROGRESS);
    }

    @Test
    void createTask() {
        when(projectClient.existProject(task.getProjectId())).thenReturn(true);
        when(taskRepository.save(any(Task.class))).thenReturn(task);

        Task createdTask = taskService.createTask(task);

        assertNotNull(createdTask);
        assertEquals("Test Task", createdTask.getDescription());
        verify(taskRepository, times(1)).save(any(Task.class));
        verify(projectClient, times(1)).existProject(task.getProjectId());
    }

    @Test
    void getTasksByProjectId() throws TaskNotFoundException {
        List<Task> tasks = new ArrayList<>();
        tasks.add(task);
        when(projectClient.existProject(task.getProjectId())).thenReturn(true);
        when(taskRepository.findByProjectId(task.getProjectId())).thenReturn(tasks);

        List<Task> taskList = taskService.getTasksByProjectId(task.getProjectId());

        assertNotNull(taskList);
        assertEquals(1, taskList.size());
        verify(taskRepository, times(1)).findByProjectId(task.getProjectId());
        verify(projectClient, times(1)).existProject(task.getProjectId());
    }

    @Test
    void getAllTasks() {
        List<Task> tasks = new ArrayList<>();
        tasks.add(task);
        when(taskRepository.findAll()).thenReturn(tasks);

        List<Task> allTasks = taskService.getAllTasks();

        assertEquals(1, allTasks.size());
        verify(taskRepository, times(1)).findAll();
    }

    @Test
    void getTaskById() {
        when(taskRepository.findById(task.getId())).thenReturn(Optional.of(task));

        Optional<Task> foundTask = taskService.getTaskById(task.getId());

        assertTrue(foundTask.isPresent());
        assertEquals("Test Task", foundTask.get().getDescription());
        verify(taskRepository, times(1)).findById(task.getId());
    }

    @Test
    void updateTask() throws TaskNotFoundException {
        Task updatedTask = new Task();
        updatedTask.setDescription("Updated Task");
        updatedTask.setStatus(Status.DONE);

        when(taskRepository.findById(task.getId())).thenReturn(Optional.of(task));
        when(taskRepository.save(any(Task.class))).thenReturn(updatedTask);

        Task result = taskService.updateTask(task.getId(), updatedTask);

        assertNotNull(result);
        assertEquals("Updated Task", result.getDescription());
        verify(taskRepository, times(1)).findById(task.getId());
        verify(taskRepository, times(1)).save(any(Task.class));
    }

    @Test
    void deleteTask() {
        doNothing().when(taskRepository).deleteById(task.getId());

        taskService.deleteTask(task.getId());

        verify(taskRepository, times(1)).deleteById(task.getId());
    }

    @Test
    void existTask() {
        when(taskRepository.findById(task.getId())).thenReturn(Optional.of(task));

        Boolean exists = taskService.existTask(task.getId());

        assertTrue(exists);
        verify(taskRepository, times(1)).findById(task.getId());
    }
}
