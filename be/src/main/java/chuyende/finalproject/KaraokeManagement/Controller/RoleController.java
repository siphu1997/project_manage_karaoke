package chuyende.finalproject.KaraokeManagement.Controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import chuyende.finalproject.KaraokeManagement.Entity.Role;
import chuyende.finalproject.KaraokeManagement.Message.Message;
import chuyende.finalproject.KaraokeManagement.Service.RoleService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/roles")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class RoleController {
	
	@Autowired
	private RoleService roleService;
	
	//get all roles
	@GetMapping
	public ResponseEntity<List<Role>> getAll(){
		List<Role> roleList = roleService.getAll();
		if(roleList.isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.ok(roleList);
	}
	
	//get role by id
	@GetMapping("/{id}")
	public ResponseEntity<Message<Role>> findById(@PathVariable int id) {
		Optional<Role> role = roleService.findById(id);
		if(!role.isPresent()) {
			Message<Role> message = new Message<Role>("Role not found", null);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
		}
		Message<Role> message = new Message<Role>(role.get());
		return ResponseEntity.ok(message);
	}
	
	//get role by name
	@GetMapping("/name/{name}")
	public ResponseEntity<Message<Role>> findByName(@PathVariable String name) {
		Role role = roleService.findByRoleName(name);
		if(role == null) {
			Message<Role> message = new Message<Role>("Role not found", null);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
		}
		Message<Role> message = new Message<Role>(role);
		return ResponseEntity.ok(message);
	}
	
	@PostMapping
	public ResponseEntity<Message<Role>> save(@Valid @RequestBody Role role){
		List<Role> roleList = roleService.getAll();
		if(!roleList.isEmpty()) {
			for(Role r: roleList) {
				if(r.getName().toLowerCase().equals(role.getName().toLowerCase())) {
					Message<Role> mess = new Message<Role>("\'" + role.getName() + "\' is already existed");
					return ResponseEntity.badRequest().body(mess);
				}
			}
		}
		roleService.save(role);
		Message<Role> mess = new Message<Role>("Create new role successful", role);
		return ResponseEntity.ok(mess);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Message<Role>> edit(@PathVariable int id, @Valid @RequestBody Role role){
		Optional<Role> ro = roleService.findById(id);
		if(!ro.isPresent()) {
			Message<Role> mess = new Message<Role>("Role not found");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mess);
		}
		
		List<Role> roleList = roleService.getAll();
		if(!roleList.isEmpty()) {
			for(Role r: roleList) {
				if(r.getName().toLowerCase().equals(role.getName().toLowerCase())
						&& !r.getName().toLowerCase().equals(role.getName().toLowerCase())) {
					Message<Role> mess = new Message<Role>("\'" + role.getName() + "\' is already existed");
					return ResponseEntity.badRequest().body(mess);
				}
			}
		}

		ro.get().setName(role.getName());
		roleService.save(ro.get());
		Message<Role> mess = new Message<Role>("Edit role successful", ro.get());
		return ResponseEntity.ok(mess);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Message<Boolean>> delete(@PathVariable int id) {
		Optional<Role> role = roleService.findById(id);
		if (!role.isPresent()) {
			Message<Boolean> mess = new Message<Boolean>("Role not found", false);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mess);
		}
		roleService.delete(id);
		Message<Boolean> mess = new Message<Boolean>("Delete role successful", true);
		return ResponseEntity.ok(mess);
	}
}
