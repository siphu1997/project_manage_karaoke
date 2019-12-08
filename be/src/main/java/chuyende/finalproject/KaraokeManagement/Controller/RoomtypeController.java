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
import org.springframework.web.bind.annotation.RestController;

import chuyende.finalproject.KaraokeManagement.Entity.RoomType;
import chuyende.finalproject.KaraokeManagement.Message.Message;
import chuyende.finalproject.KaraokeManagement.Service.RoomtypeService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/roomtypes")
public class RoomtypeController {
	
	@Autowired
	RoomtypeService roomtypeService;
	
	//Get all room types
	@GetMapping
	public ResponseEntity<Message<List<RoomType>>> getAll() {
		List<RoomType> rtypeList = roomtypeService.getAll();
		if(rtypeList.isEmpty()) {
			Message<List<RoomType>> message = new Message<List<RoomType>>("Room type list is empty", null);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
		}
		Message<List<RoomType>> message = new Message<List<RoomType>>("", rtypeList);
		return ResponseEntity.ok(message);
	}
	
	//Get rooom type by id
	@GetMapping("/{id}")
	public ResponseEntity<Message<RoomType>> findById(@PathVariable int id) {
		Optional<RoomType> rtype = roomtypeService.findById(id);
		if(!rtype.isPresent()) {
			Message<RoomType> message = new Message<RoomType>("Roomtype not found");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
		}
		Message<RoomType> message = new Message<RoomType>("", rtype.get());
		return ResponseEntity.ok(message);
	}
	
	//Store room type
	@PostMapping
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<Message<RoomType>> save(@Valid @RequestBody RoomType rtype){
		List<RoomType> roomtypeList = roomtypeService.getAll();
		if(!roomtypeList.isEmpty()) {
			for(RoomType r: roomtypeList) {
				if(r.getName().toLowerCase().equals(rtype.getName().toLowerCase())) {
					Message<RoomType> mess = new Message<RoomType>("\'" + rtype.getName() + "\' already exists");
					return ResponseEntity.badRequest().body(mess);
				}
			}
		}

		Date date = new Date();
		DateFormat df = new SimpleDateFormat("hh:mm:ss dd-MM-yyyy");
		String now = df.format(date);
		rtype.setCreated_at(now);
		rtype.setUpdated_at(now);
		
		roomtypeService.save(rtype);
		Message<RoomType> mess = new Message<RoomType>("Create new RoomType successful", rtype);
		return ResponseEntity.ok(mess);
	}
	
	//Update roomtype
	@PutMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<Message<RoomType>> edit(@PathVariable int id, @Valid @RequestBody RoomType rtype){
		Optional<RoomType> ro = roomtypeService.findById(id);
		if(!ro.isPresent()) {
			Message<RoomType> mess = new Message<RoomType>("RoomType not found");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mess);
		}
		
		List<RoomType> roomtypeList = roomtypeService.getAll();
		if(!roomtypeList.isEmpty()) {
			for(RoomType r: roomtypeList) {
				if(r.getName().toLowerCase().equals(rtype.getName().toLowerCase())
						&& !r.getName().toLowerCase().equals(rtype.getName().toLowerCase())) {
					Message<RoomType> mess = new Message<RoomType>("\'" + rtype.getName() + "\' already exists");
					return ResponseEntity.badRequest().body(mess);
				}
			}
		}

		Date date = new Date();
		DateFormat df = new SimpleDateFormat("hh:mm:ss dd-MM-yyyy");
		String now = df.format(date);
		
		ro.get().setName(rtype.getName());
		ro.get().setPrice(rtype.getPrice());
		ro.get().setUpdated_at(now);
		roomtypeService.save(ro.get());
		Message<RoomType> mess = new Message<RoomType>("Edit RoomType successful", ro.get());
		return ResponseEntity.ok(mess);
	}
	
	//Delete room type
	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<Message<RoomType>> delete(@PathVariable int id) {
		Optional<RoomType> roomType = roomtypeService.findById(id);
		if (!roomType.isPresent()) {
			Message<RoomType> mess = new Message<RoomType>("RoomType not found");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mess);
		}
		roomtypeService.delete(id);
		Message<RoomType> mess = new Message<RoomType>("Delete RoomType successful", roomType.get());
		return ResponseEntity.ok(mess);
	}
}
