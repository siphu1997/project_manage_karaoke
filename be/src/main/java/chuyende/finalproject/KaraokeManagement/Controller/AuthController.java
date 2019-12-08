package chuyende.finalproject.KaraokeManagement.Controller;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.*;
import org.springframework.security.crypto.password.*;
import org.springframework.web.bind.annotation.*;

import chuyende.finalproject.KaraokeManagement.Entity.User;
import chuyende.finalproject.KaraokeManagement.JWT.JwtTokenProvider;
import chuyende.finalproject.KaraokeManagement.JWT.Payload.LoginRequest;
import chuyende.finalproject.KaraokeManagement.JWT.Payload.LoginResponse;
import chuyende.finalproject.KaraokeManagement.Message.Message;
import chuyende.finalproject.KaraokeManagement.Repository.UserRepository;
import chuyende.finalproject.KaraokeManagement.Service.RoleService;
import chuyende.finalproject.KaraokeManagement.Service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtTokenProvider jwtTokenProvider;
	
	@Autowired
    UserRepository userRepository;
	
	@Autowired
    RoleService roleService;
	
	@Autowired
	UserService userService;
	
	@PostMapping("/login")
    public ResponseEntity<Message<LoginResponse>> authenticateUser(@Valid @RequestBody LoginRequest loginRequest){
		
		List<User> userList = userService.getAll();
		for(User u: userList) {
			if(u.getUsername().toLowerCase().equals(loginRequest.getUsername().toLowerCase()) &&
					passwordEncoder().matches(loginRequest.getPassword(), u.getPassword())){

				User user = userRepository.findByUsername(loginRequest.getUsername());
				List<String> roles = new ArrayList<String>();
				roles.add(user.getRole().getName());
				
		        // Xác thực từ username và password.
		        Authentication authentication = authenticationManager.authenticate(
		                new UsernamePasswordAuthenticationToken(
		                		loginRequest.getUsername(),
		                		loginRequest.getPassword()
		                )
		        );
		        System.out.println("Auth: "+authentication);

		        SecurityContextHolder.getContext().setAuthentication(authentication);
		        // Trả về jwt cho người dùng.
		        String jwt = jwtTokenProvider.generateToken(loginRequest.getUsername(), roles);
		        System.out.println("jwt: " + jwt);
		        LoginResponse loginResponse = new LoginResponse(jwt);
		        Message<LoginResponse> mess = new Message<LoginResponse>("Login successful", loginResponse);
		        return ResponseEntity.ok(mess);
		        
			}
		}
		Message<LoginResponse> message = new Message<LoginResponse>("Username or password doesn\'t exist");
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
    }
	
	@GetMapping("/me")
    public ResponseEntity<Message<Map<Object, Object>>> currentUser(@AuthenticationPrincipal UserDetails userDetails){
		User user = userRepository.findByUsername(userDetails.getUsername());
		
		Map<Object, Object> model = new HashMap<>();
        model.put("user", user);
        model.put("roles", userDetails.getAuthorities()
        		.stream()
        		.map(a -> ((GrantedAuthority) a).getAuthority())
        		.collect(Collectors.toList()));

		Message<Map<Object, Object>> mess = new Message<Map<Object, Object>>("Current user info", model);
        return ResponseEntity.ok(mess);
    }
	
	public PasswordEncoder passwordEncoder() {
		// Password encoder, để Spring Security sử dụng mã hóa mật khẩu người dùng
		return new BCryptPasswordEncoder();
      
	}

}
