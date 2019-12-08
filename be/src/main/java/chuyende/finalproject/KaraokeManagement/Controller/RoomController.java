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

import chuyende.finalproject.KaraokeManagement.Entity.Receipt;
import chuyende.finalproject.KaraokeManagement.Entity.ReceiptDetail;
import chuyende.finalproject.KaraokeManagement.Entity.Room;
import chuyende.finalproject.KaraokeManagement.Entity.RoomType;
import chuyende.finalproject.KaraokeManagement.Message.Message;
import chuyende.finalproject.KaraokeManagement.Service.RoomService;
import chuyende.finalproject.KaraokeManagement.Service.RoomtypeService;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(origins = "*")
public class RoomController {

	@Autowired
	RoomService roomService;
	
	@Autowired
	RoomtypeService rtypeService;
	
	//Get All rooms
	@GetMapping
	public ResponseEntity<Message<List<Room>>> getAll() {
		List<Room> roomList = roomService.getAll();
		if(roomList.isEmpty()) {
			Message<List<Room>> message = new Message<List<Room>>("Room list is empty");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
		}
		Message<List<Room>> message = new Message<List<Room>>(roomList);
		return ResponseEntity.ok(message);
	}
	
	//Get room by id
	@GetMapping("/{id}")
	public ResponseEntity<Message<Room>> findById(@PathVariable int id) throws Exception {
		Optional<Room> room = roomService.findById(id);
		if(!room.isPresent()) {
			Message<Room> message = new Message<Room>("Room not found", null);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
		}
		if(room.get().getReceipt() != null) {
			Date date = new Date();
			DateFormat df = new SimpleDateFormat("hh:mm:ss dd-MM-yyyy");
			String now = df.format(date);

			int hours = CalDate(room.get().getReceipt().getStart_at(), now);
			
			room.get().getReceipt().setHours(hours);
			room.get().getReceipt().setTotal_price(totalPrice(room.get().getReceipt()));
		}
		Message<Room> message = new Message<Room>(room.get());
		return ResponseEntity.ok(message);
	}
	
	//Store room
	@PostMapping
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<Message<Room>> save(@Valid @RequestBody Room room){
		List<Room> roomList = roomService.getAll();
		if(!roomList.isEmpty()) {
			for(Room r: roomList) {
				if(r.getName().toLowerCase().equals(room.getName().toLowerCase())) {
					Message<Room> mess = new Message<Room>("\'" + room.getName() + "\' is already existed");
					return ResponseEntity.badRequest().body(mess);
				}
			}
		}

		Date date = new Date();
		DateFormat df = new SimpleDateFormat("hh:mm:ss dd-MM-yyyy");
		String now = df.format(date);
		
		Optional<RoomType> rtype = rtypeService.findById(room.getRoomtype_id());
		if(!rtype.isPresent()) {
			Message<Room> message = new Message<Room>("Room type not found");
			return ResponseEntity.badRequest().body(message);
		}
		room.setRoomtype(rtype.get());
		room.setCreated_at(now);
		room.setUpdated_at(now);
		room.setActive(0);
		room.setStatus(1);
		
		roomService.save(room);
		Message<Room> mess = new Message<Room>("Create new Room successful", room);
		return ResponseEntity.ok(mess);
	}
	
	//Update room
	@PutMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<Message<Room>> edit(@PathVariable int id, @Valid @RequestBody Room room){
		Optional<Room> ro = roomService.findById(id);
		if(!ro.isPresent()) {
			Message<Room> mess = new Message<Room>("Room not found");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mess);
		}
		
		List<Room> roomList = roomService.getAll();
		if(!roomList.isEmpty()) {
			for(Room r: roomList) {
				if(r.getName().toLowerCase().equals(room.getName().toLowerCase())
						&& !r.getName().toLowerCase().equals(room.getName().toLowerCase())) {
					Message<Room> mess = new Message<Room>("\'" + room.getName() + "\' is already existed");
					return ResponseEntity.badRequest().body(mess);
				}
			}
		}

		Date date = new Date();
		DateFormat df = new SimpleDateFormat("hh:mm:ss dd-MM-yyyy");
		String now = df.format(date);
		Optional<RoomType> rtype = rtypeService.findById(room.getRoomtype_id());
		if(!rtype.isPresent()) {
			Message<Room> message = new Message<Room>("Room type not found");
			return ResponseEntity.badRequest().body(message);
		}
		ro.get().setRoomtype(rtype.get());
		ro.get().setName(room.getName());
		ro.get().setStatus(room.getStatus());
		ro.get().setActive(room.getActive());
		ro.get().setRoomtype_id(room.getRoomtype_id());
		ro.get().setUpdated_at(now);
		roomService.save(ro.get());
		Message<Room> mess = new Message<Room>("Edit room successful", ro.get());
		return ResponseEntity.ok(mess);
	}
	
	//Delete room
	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<Message<Room>> delete(@PathVariable int id) {
		Optional<Room> room = roomService.findById(id);
		if(!room.isPresent()) {
			Message<Room> message = new Message<Room>("Room not found", null);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
		}
		roomService.delete(id);
		Message<Room> message = new Message<Room>("Delete room successful", room.get());
		return ResponseEntity.ok(message);
	}
	
	//Checkout
	@PutMapping("/{id}/book")
	public ResponseEntity<Message<Room>> book(@PathVariable int id){
		Optional<Room> ro = roomService.findById(id);
		if(!ro.isPresent()) {
			Message<Room> mess = new Message<Room>("Room not found");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mess);
		}
		
		if(ro.get().getActive() == 1) {
			Message<Room> mess = new Message<Room>("Room has already been booked");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(mess);
		}
		
		ro.get().setActive(1);
		roomService.save(ro.get());
		Message<Room> mess = new Message<Room>("Book room successful", ro.get());
		return ResponseEntity.ok(mess);
	}
	
	//Checkout
//	@PutMapping("/{id}/checkout")
//	public ResponseEntity<Message<Room>> checkout(@PathVariable int id){
//		Optional<Room> ro = roomService.findById(id);
//		if(!ro.isPresent()) {
//			Message<Room> mess = new Message<Room>("Room not found");
//			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mess);
//		}
//		
//		if(ro.get().getActive() == 0) {
//			Message<Room> mess = new Message<Room>("Room has already been checked out");
//			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(mess);
//		}
//		
//		ro.get().setActive(0);
//		roomService.save(ro.get());
//		Message<Room> mess = new Message<Room>("Checkout room successful", ro.get());
//		return ResponseEntity.ok(mess);
//	}
	
	//Set room into active status
	@PutMapping("/{id}/active")
	public ResponseEntity<Message<Room>> active(@PathVariable int id){
		Optional<Room> ro = roomService.findById(id);
		if(!ro.isPresent()) {
			Message<Room> mess = new Message<Room>("Room not found");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mess);
		}
		
		if(ro.get().getStatus() == 1) {
			Message<Room> mess = new Message<Room>("Room has already been active");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(mess);
		}
		
		ro.get().setStatus(1);
		roomService.save(ro.get());
		Message<Room> mess = new Message<Room>("Active room successful", ro.get());
		return ResponseEntity.ok(mess);
	}
	
	//Set room into maintain status
	@PutMapping("/{id}/maintain")
	public ResponseEntity<Message<Room>> maintain(@PathVariable int id){
		Optional<Room> ro = roomService.findById(id);
		if(!ro.isPresent()) {
			Message<Room> mess = new Message<Room>("Room not found");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mess);
		}
		if(ro.get().getStatus() == 0) {
			Message<Room> mess = new Message<Room>("Room has already been maintained");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(mess);
		}
		ro.get().setStatus(0);
		roomService.save(ro.get());
		Message<Room> mess = new Message<Room>("Maintain room successful", ro.get());
		return ResponseEntity.ok(mess);
	}
	
	public int CalDate(String start, String end) throws Exception {
	    Date startDate = new SimpleDateFormat("hh:mm:ss dd-MM-yyyy").parse(start);  
	    Date endDate = new SimpleDateFormat("hh:mm:ss dd-MM-yyyy").parse(end);  
		int result = (int)( (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60) );
		if(result < 1) {
			result = 1;
		}
		return result;
	}
	
	public double totalPrice(Receipt receipt) {
		int hours = receipt.getHours();
		Room room = roomService.findById(receipt.getRoom_id()).get();
		Double room_price = room.getRoomtype().getPrice();
		double sum = hours * room_price;
		if(!receipt.getReceip_details().isEmpty()) {
			for(ReceiptDetail rd : receipt.getReceip_details()) {
				sum += rd.getMenu().getPrice() * rd.getQty();
			}
		}
		return sum;
	}
}
