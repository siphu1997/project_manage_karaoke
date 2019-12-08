package chuyende.finalproject.KaraokeManagement.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import chuyende.finalproject.KaraokeManagement.Entity.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
	
}
