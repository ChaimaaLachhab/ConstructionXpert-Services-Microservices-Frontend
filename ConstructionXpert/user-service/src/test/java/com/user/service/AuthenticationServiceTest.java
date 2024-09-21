package com.user.service;

import com.user.dto.AdminDTO;
import com.user.dto.CustomerDTO;
import com.user.dto.LoginUserDto;
import com.user.mapper.UserMapper;
import com.user.model.Admin;
import com.user.model.Customer;
import com.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AuthenticationServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserMapper userMapper;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private AuthenticationService authenticationService;

    private CustomerDTO customerDTO;
    private AdminDTO adminDTO;
    private Customer customer;
    private Admin admin;
    private LoginUserDto loginUserDto;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        customerDTO = new CustomerDTO();
        customerDTO.setUsername("customer");
        customerDTO.setEmail("customer@example.com");
        customerDTO.setPassword("password");

        adminDTO = new AdminDTO();
        adminDTO.setUsername("admin");
        adminDTO.setEmail("admin@example.com");
        adminDTO.setPassword("adminPassword");

        customer = new Customer();
        customer.setUsername("customer");
        customer.setEmail("customer@example.com");
        customer.setPassword("encodedPassword");

        admin = new Admin();
        admin.setUsername("admin");
        admin.setEmail("admin@example.com");
        admin.setPassword("encodedAdminPassword");

        loginUserDto = new LoginUserDto();
        loginUserDto.setUserNameOrEmail("customer");
        loginUserDto.setPassword("password");
    }

    @Test
    void signup() {
        when(userRepository.findByUsername(customerDTO.getUsername())).thenReturn(Optional.empty());
        when(userRepository.findByEmail(customerDTO.getEmail())).thenReturn(Optional.empty());
        when(userMapper.toCustomerEntity(customerDTO)).thenReturn(customer);
        when(passwordEncoder.encode(customerDTO.getPassword())).thenReturn("encodedPassword");
        when(userRepository.save(any(Customer.class))).thenReturn(customer);

        Customer result = (Customer) authenticationService.signup(customerDTO);

        assertNotNull(result);
        assertEquals("customer", result.getUsername());
        verify(userRepository, times(1)).findByUsername(customerDTO.getUsername());
        verify(userRepository, times(1)).findByEmail(customerDTO.getEmail());
        verify(userMapper, times(1)).toCustomerEntity(customerDTO);
        verify(passwordEncoder, times(1)).encode(customerDTO.getPassword());
        verify(userRepository, times(1)).save(any(Customer.class));
    }

    @Test
    void addAdmin() {
        when(userRepository.findByUsername(adminDTO.getUsername())).thenReturn(Optional.empty());
        when(userRepository.findByEmail(adminDTO.getEmail())).thenReturn(Optional.empty());
        when(userMapper.toAdminEntity(adminDTO)).thenReturn(admin);
        when(passwordEncoder.encode(adminDTO.getPassword())).thenReturn("encodedAdminPassword");
        when(userRepository.save(any(Admin.class))).thenReturn(admin);

        Admin result = (Admin) authenticationService.addAdmin(adminDTO);

        assertNotNull(result);
        assertEquals("admin", result.getUsername());
        verify(userRepository, times(1)).findByUsername(adminDTO.getUsername());
        verify(userRepository, times(1)).findByEmail(adminDTO.getEmail());
        verify(userMapper, times(1)).toAdminEntity(adminDTO);
        verify(passwordEncoder, times(1)).encode(adminDTO.getPassword());
        verify(userRepository, times(1)).save(any(Admin.class));
    }

    @Test
    void authenticate() {
        when(userRepository.findByUsernameOrEmail(loginUserDto.getUserNameOrEmail(), loginUserDto.getUserNameOrEmail()))
                .thenReturn(customer);

        authenticationService.authenticate(loginUserDto);

        verify(authenticationManager, times(1)).authenticate(
                new UsernamePasswordAuthenticationToken(loginUserDto.getUserNameOrEmail(), loginUserDto.getPassword())
        );
        verify(userRepository, times(1)).findByUsernameOrEmail(loginUserDto.getUserNameOrEmail(), loginUserDto.getUserNameOrEmail());
    }
}
