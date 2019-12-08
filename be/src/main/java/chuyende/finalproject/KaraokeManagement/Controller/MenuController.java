package chuyende.finalproject.KaraokeManagement.Controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import chuyende.finalproject.KaraokeManagement.Entity.Menu;
import chuyende.finalproject.KaraokeManagement.Message.Message;
import chuyende.finalproject.KaraokeManagement.Service.MenuService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/menu")
public class MenuController {

	@Autowired
	private MenuService menuService;
	
	//Get all 
	@GetMapping
	public ResponseEntity<Message<List<Menu>>> getAll(){
		List<Menu> menuList = menuService.getAll();
		if(menuList.isEmpty()) {
			Message<List<Menu>> message = new Message<List<Menu>>("Menu list is empty");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
		}
		Message<List<Menu>> message = new Message<List<Menu>>(menuList);
		return ResponseEntity.ok(message);
	}
	
	//get menu by id
	@GetMapping("/{id}")
	public ResponseEntity<Message<Menu>> findById(@PathVariable int id) {
		Optional<Menu> menu = menuService.findById(id);
		if(!menu.isPresent()) {
			Message<Menu> message = new Message<Menu>("Menu not found", null);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
		}
		Message<Menu> message = new Message<Menu>(menu.get());
		return ResponseEntity.ok(message);
	}
	
	//search menu by name
	@GetMapping("/search")
	public ResponseEntity<Message<List<Menu>>> findByName(@RequestParam("term") String name) {
		List<Menu> menu = menuService.findByName(name);
		if(menu.isEmpty()) {
			Message<List<Menu>> message = new Message<List<Menu>>("Menu list is empty", null);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
		}
		Message<List<Menu>> message = new Message<List<Menu>>(menu);
		return ResponseEntity.ok(message);
	}
	
	//store menu
	@PostMapping
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<Message<Menu>> save(@Valid @RequestBody Menu menu){
		Date date = new Date();
		DateFormat df = new SimpleDateFormat("hh:mm:ss dd-MM-yyyy");
		String now = df.format(date);
		menu.setCreated_at(now);
		menu.setUpdated_at(now);
		menu.setStatus(1);
		Menu newMenu = menuService.save(menu);
		if(newMenu == null) {
			Message<Menu> message = new Message<Menu>("Something went wrong");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message); 
		}
		Message<Menu> mess = new Message<Menu>("Create new menu successful", newMenu);
		return ResponseEntity.ok(mess);
	}
	
	//update menu
	@PutMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<Message<Menu>> update(@PathVariable int id, @Valid @RequestBody Menu menu) {
		Optional<Menu> me = menuService.findById(id);
		if (!me.isPresent()) {
			Message<Menu> message = new Message<Menu>("Menu not found", null);
			return  ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
		}
		
		Date date = new Date();
		DateFormat df = new SimpleDateFormat("hh:mm:ss dd-MM-yyyy");
		String now = df.format(date);
		me.get().setUpdated_at(now);
		me.get().setName(menu.getName());
		me.get().setType(menu.getType());
		me.get().setUnit(menu.getUnit());
		me.get().setPrice(menu.getPrice());
		me.get().setStatus(menu.getStatus());
		
		Menu editMenu = menuService.save(me.get());
		if(editMenu == null) {
			Message<Menu> message = new Message<Menu>("Something went wrong");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message); 
		}
		
		Message<Menu> message = new Message<Menu>("Update menu successful", editMenu);
		return ResponseEntity.ok(message);
	}
	
	//delete menu
	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<Message<Menu>> delete(@PathVariable int id) {
		Optional<Menu> menu = menuService.findById(id);
		if (!menu.isPresent()) {
			Message<Menu> mess = new Message<Menu>("Menu not found");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mess);
		}
		menuService.delete(id);
		Message<Menu> mess = new Message<Menu>("Delete menu successful", menu.get());
		return ResponseEntity.ok(mess);
	}
}
