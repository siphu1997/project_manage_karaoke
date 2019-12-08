package chuyende.finalproject.KaraokeManagement.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import chuyende.finalproject.KaraokeManagement.Entity.Customer;
import chuyende.finalproject.KaraokeManagement.Repository.CustomerRepository;

@Service
public class CustomerService {
	
	@Autowired
	private CustomerRepository customerRepository;
	
	public List<Customer> getAll(){
		return (List<Customer>) customerRepository.findAll();
	}
	
	public Optional<Customer> findById(int id){
		return customerRepository.findById(id);
	}
	
	public Customer save(Customer customer) {
		return customerRepository.save(customer);
	}
	
	public void delete(int id) {
		customerRepository.deleteById(id);
	}
}
