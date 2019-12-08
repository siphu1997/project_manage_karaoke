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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import chuyende.finalproject.KaraokeManagement.Entity.Customer;
import chuyende.finalproject.KaraokeManagement.Message.Message;
import chuyende.finalproject.KaraokeManagement.Service.CustomerService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/customers")
public class CustomerController {
	
	@Autowired
	private CustomerService customerService;
	
	@GetMapping
	public ResponseEntity<Message<List<Customer>>> findAll() {
		List<Customer> cusList = customerService.getAll();
		if(cusList.isEmpty()) {
			Message<List<Customer>> message = new Message<List<Customer>>("Customer list is empty");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
		}
		Message<List<Customer>> message = new Message<List<Customer>>(cusList);
		return ResponseEntity.ok(message);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Message<Customer>> findById(@PathVariable int id) {
		Optional<Customer> customer = customerService.findById(id);
		if (!customer.isPresent()) {
			Message<Customer> message = new Message<Customer>("Customer not found");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
		}
		Message<Customer> message = new Message<Customer>(customer.get());
		return ResponseEntity.ok(message);
	}
	
	@PostMapping
	public ResponseEntity<Message<Customer>> save(@Valid @RequestBody Customer customer) {
		Date date = new Date();
		DateFormat df = new SimpleDateFormat("hh:mm:ss dd-MM-yyyy");
		String now = df.format(date);
		
		customer.setCreated_at(now);
		customer.setUpdated_at(now);
		Customer newCustomer = customerService.save(customer);
		if(newCustomer == null) {
			Message<Customer> message = new Message<Customer>("Something went wrong");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message); 
		}
		
		Message<Customer> message = new Message<Customer>("Create new customer successful", newCustomer);
		return ResponseEntity.ok(message);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Message<Customer>> update(@PathVariable int id, @Valid @RequestBody Customer customer) {
		Optional<Customer> cus = customerService.findById(id);
		if (!cus.isPresent()) {
			Message<Customer> message = new Message<Customer>("Customer not found", null);
			return  ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
		}
		
		Date date = new Date();
		DateFormat df = new SimpleDateFormat("hh:mm:ss dd-MM-yyyy");
		String now = df.format(date);
		cus.get().setUpdated_at(now);
		cus.get().setName(customer.getName());
		cus.get().setPhone(customer.getPhone());
		cus.get().setAddress(customer.getAddress());
		
		Customer editCustomer = customerService.save(cus.get());
		if(editCustomer == null) {
			Message<Customer> message = new Message<Customer>("Something went wrong");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message); 
		}
		
		Message<Customer> message = new Message<Customer>("Update customer successful", cus.get());
		return ResponseEntity.ok(message);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Message<Customer>> delete(@PathVariable int id) {
		Optional<Customer> customer = customerService.findById(id);
		if (!customer.isPresent()) {
			Message<Customer> mess = new Message<Customer>("Customer not found");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mess);
		}
		customerService.delete(id);
		Message<Customer> mess = new Message<Customer>("Delete customer successful", customer.get());
		return ResponseEntity.ok(mess);
	}
}
