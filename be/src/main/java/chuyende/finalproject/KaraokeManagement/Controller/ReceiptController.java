package chuyende.finalproject.KaraokeManagement.Controller;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import chuyende.finalproject.KaraokeManagement.Entity.Receipt;
import chuyende.finalproject.KaraokeManagement.Entity.ReceiptDetail;
import chuyende.finalproject.KaraokeManagement.Entity.Room;
import chuyende.finalproject.KaraokeManagement.Message.Message;
import chuyende.finalproject.KaraokeManagement.Request.ReceiptRequest;
import chuyende.finalproject.KaraokeManagement.Service.ReceiptDetailService;
import chuyende.finalproject.KaraokeManagement.Service.ReceiptService;
import chuyende.finalproject.KaraokeManagement.Service.RoomService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api")
public class ReceiptController {

	@Autowired
	private ReceiptService receiptService;
	
	@Autowired
	private ReceiptDetailService rdService;
	
	@Autowired
	private RoomService roomService;
	
	//get all receipts
	@GetMapping("/receipts")
	public ResponseEntity<Message<List<Receipt>>> getAll(){
		List<Receipt> receiptList = receiptService.getAll();
		if(receiptList.isEmpty()) {
			Message<List<Receipt>> message = new Message<List<Receipt>>("Receipt list is empty");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
		}
		Message<List<Receipt>> message = new Message<List<Receipt>>(receiptList);
		return ResponseEntity.ok(message);
	}
	
	//get receipt by id
	@GetMapping("/receipts/{id}")
	public ResponseEntity<Message<Receipt>> findById(@PathVariable int id) throws Exception {
		Optional<Receipt> receipt = receiptService.findById(id);
		if(!receipt.isPresent()) {
			Message<Receipt> message = new Message<Receipt>("Receipt not found");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
		}
		if(receipt.get().getIs_paid() != true) {
			Date date = new Date();
			DateFormat df = new SimpleDateFormat("hh:mm:ss dd-MM-yyyy");
			String now = df.format(date);
			int hours = CalDate(receipt.get().getStart_at(), now);
			receipt.get().setHours(hours);
			receipt.get().setTotal_price(totalPrice(receipt.get()));
		}
		Message<Receipt> message = new Message<Receipt>(receipt.get());
		return ResponseEntity.ok(message);
	}
	
	@GetMapping("/receiptdetail/{rid}/{mid}")
	public ResponseEntity<Message<ReceiptDetail>> getReceiptDetail(@PathVariable("rid") int rid, @PathVariable("mid") int mid) {
		ReceiptDetail receipt = rdService.findByReceiptIdAndMenuId(rid, mid);
		Message<ReceiptDetail> message = new Message<ReceiptDetail>(receipt);
		return ResponseEntity.ok(message);
	}
	
	//Check in room
	@PutMapping("rooms/{id}/checkin")
	public ResponseEntity<Message<Room>> checkin(@PathVariable int id, @RequestBody Receipt receipt){
		Optional<Room> ro = roomService.findById(id);
		if(!ro.isPresent()) {
			Message<Room> mess = new Message<Room>("Room not found");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mess);
		}
		
		if(ro.get().getActive() == 1 || ro.get().getReceipt_id() != null) {
			Message<Room> mess = new Message<Room>("Room \'" + ro.get().getName() + "\' has already been used");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(mess);
		}
		Date date = new Date();
		DateFormat df = new SimpleDateFormat("hh:mm:ss dd-MM-yyyy");
		String now = df.format(date);
		

		Receipt re = new Receipt();
		re.setRoom_id(receipt.getRoom_id());
		re.setCustomer_id(receipt.getCustomer_id());
		re.setUser_id(receipt.getUser_id());
		re.setCreated_at(now);
		re.setUpdated_at(now);
		re.setStart_at(now);
		re.setEnd_at("null");
		re.setTotal_price((double) 0);
		re.setHours(0);
		re.setIs_paid(false);
		Receipt newReceipt = receiptService.save(re);
		
		ro.get().setActive(1);
		ro.get().setReceipt_id(newReceipt.getId());
		roomService.save(ro.get());
		Message<Room> mess = new Message<Room>("Check in room successful", ro.get());
		return ResponseEntity.ok(mess);
	}
	
	//Add menu to receipt detail
	@PutMapping("rooms/{id}/addMenu")
	public ResponseEntity<Message<List<ReceiptDetail>>> addMenu(@PathVariable int id, @RequestBody ReceiptRequest receiptRequest){
		Optional<Room> ro = roomService.findById(id);
		if(!ro.isPresent()) {
			Message<List<ReceiptDetail>> mess = new Message<List<ReceiptDetail>>("Room not found");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mess);
		}
		
		if(ro.get().getActive() == 0 || ro.get().getReceipt_id() == null) {
			Message<List<ReceiptDetail>> mess = new Message<List<ReceiptDetail>>("Room is inactive");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(mess);
		}
		
		Integer rId = ro.get().getReceipt_id();
		for(ReceiptDetail rd: receiptRequest.getRdList()) {
			rd.setReceipt_id(rId);
			ReceiptDetail r = rdService.findByReceiptIdAndMenuId(rId, rd.getMenu_id());
			if(r != null) {
				if(r.getMenu_id() == rd.getMenu_id() && r.getReceipt_id() == rd.getReceipt_id()) {
					r.setQty(r.getQty() + rd.getQty());
					rdService.save(r);
				}
			} else {
				rdService.save(rd);
			}
		}
		List<ReceiptDetail> rdList = rdService.findByReceiptId(rId);
		Message<List<ReceiptDetail>> mess = new Message<List<ReceiptDetail>>("Order successful", rdList);
		return ResponseEntity.ok(mess);
	}
	
	//Checkout
	@PutMapping("rooms/{id}/checkout")
	public ResponseEntity<Message<Room>> checkout(@PathVariable int id){
		try {
			Optional<Room> ro = roomService.findById(id);
			if(!ro.isPresent()) {
				Message<Room> mess = new Message<Room>("Room not found");
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mess);
			}
			
			if(ro.get().getActive() == 0 || ro.get().getReceipt_id() == null) {
				Message<Room> mess = new Message<Room>("Room \'" + ro.get().getName() + "\' is unable to checked out");
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(mess);
			}

			Receipt receipt = receiptService.findById(ro.get().getReceipt_id()).get();
			
			Date date = new Date();
			DateFormat df = new SimpleDateFormat("hh:mm:ss dd-MM-yyyy");
			String now = df.format(date);
			int hours = CalDate(receipt.getStart_at(), now);
			receipt.setEnd_at(now);
			receipt.setHours(hours);
			receipt.setTotal_price(totalPrice(receipt));
			receipt.setIs_paid(true);
			Receipt editReceipt = receiptService.save(receipt);
			
			ro.get().setReceipt_id(null);
			ro.get().setActive(0);
			roomService.save(ro.get());
			ro.get().setReceipt(editReceipt);
			Message<Room> mess = new Message<Room>("Checkout room successful", ro.get());
			return ResponseEntity.ok(mess);
		} catch (Exception e) {
			Message<Room> mess = new Message<Room>(e.getMessage());
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(mess);
		}
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
