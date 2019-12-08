package chuyende.finalproject.KaraokeManagement.Controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import chuyende.finalproject.KaraokeManagement.Entity.Role;
import chuyende.finalproject.KaraokeManagement.Entity.User;
import chuyende.finalproject.KaraokeManagement.Message.Message;
import chuyende.finalproject.KaraokeManagement.Service.RoleService;
import chuyende.finalproject.KaraokeManagement.Service.UserService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/users")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class UserController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private RoleService roleService;
	
	@GetMapping
	public ResponseEntity<Message<List<User>>> findAll() {
		List<User> userList = userService.getAll();
		if(userList.isEmpty()) {
			Message<List<User>> message = new Message<List<User>>("User list is empty");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
		}
		Message<List<User>> message = new Message<List<User>>(null, userList);
		return ResponseEntity.ok(message);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Message<User>> findById(@PathVariable int id) {
		Optional<User> user = userService.findById(id);
		if (!user.isPresent()) {
			Message<User> message = new Message<User>("User not found");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
		}
		Message<User> message = new Message<User>(user.get());
		return ResponseEntity.ok(message);
	}

//	@GetMapping("/search")
//	public ResponseEntity<List<User>> search(@RequestParam String term) {
//		List<User> contacts = userService.search(term);
//		return ResponseEntity.ok(contacts);
//	}

	@PostMapping
	public ResponseEntity<Message<User>> save(@Valid @RequestBody User user) {
		List<User> userList = userService.getAll();
		for(User u: userList) {
			if(u.getUsername().toLowerCase().equals(user.getUsername().toLowerCase())) {
				Message<User> message = new Message<User>("\'" + user.getUsername() + "\' already exists", null);
				return ResponseEntity.badRequest().body(message);
			}
		}		
		Date date = new Date();
		DateFormat df = new SimpleDateFormat("hh:mm:ss dd-MM-yyyy");
		String now = df.format(date);
		String encryptePassword = passwordEncoder().encode(user.getPassword());
		Optional<Role> role = roleService.findById(user.getRole_id());
		if(!role.isPresent()) {
			Message<User> message = new Message<User>("Role not found");
			return ResponseEntity.badRequest().body(message);
		}
		user.setPassword(encryptePassword);
		user.setCreated_at(now);
		user.setUpdated_at(now);
//		user.getRoles().add(roleService.findByRoleName("staff"));
		user.setRole(role.get());
		User newUser = userService.save(user);
		Message<User> message = new Message<User>("Create new user successfully", newUser);
		
		return ResponseEntity.ok(message);		
	}

	@PutMapping("/{id}")
	public ResponseEntity<Message<User>> update(@PathVariable int id, @Valid @RequestBody User user) {
		Message<User> message = null;
		Optional<User> us = userService.findById(id);
		if (!us.isPresent()) {
			message = new Message<User>("User not found", null);
			return  ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
		}
		List<User> userList = userService.getAll();
		if(!userList.isEmpty()) {
			for(User u: userList) {
				if(u.getUsername().toLowerCase().equals(user.getUsername().toLowerCase()) && 
						!u.getUsername().toLowerCase().equals(us.get().getUsername().toLowerCase())) {
	
					message = new Message<User>("\'" + user.getUsername() + "\' already exists", null);
					return ResponseEntity.badRequest().body(message);
				}
			}
		}		
		
		Date date = new Date();
		DateFormat df = new SimpleDateFormat("hh:mm:ss dd-MM-yyyy");
		String now = df.format(date);
		String encryptePassword = passwordEncoder().encode(user.getPassword());
		Optional<Role> role = roleService.findById(user.getRole_id());
		if(!role.isPresent()) {
			message = new Message<User>("Role not found");
			return ResponseEntity.badRequest().body(message);
		}
		us.get().setPassword(encryptePassword);
		us.get().setUsername(user.getUsername());
		us.get().setDisplay_name(user.getDisplay_name());
		us.get().setPhone(user.getPhone());
		us.get().setAddress(user.getAddress());
		us.get().setUpdated_at(now);
		us.get().setRole_id(user.getRole_id());
		us.get().setRole(role.get());
		
		User editUser = userService.save(us.get());
		message = new Message<User>("Edit user successfully", editUser);
		return ResponseEntity.ok(message);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Message<User>> delete(@PathVariable int id) {
		Optional<User> user = userService.findById(id);
		if (!user.isPresent()) {
			Message<User> mess = new Message<User>("User not found");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mess);
		}
		userService.delete(id);
		Message<User> mess = new Message<User>("Delete user successful", user.get());
		return ResponseEntity.ok(mess);
	}
	
	public PasswordEncoder passwordEncoder() {
		// Password encoder, để Spring Security sử dụng mã hóa mật khẩu người dùng
		return new BCryptPasswordEncoder();
      
	}
}
