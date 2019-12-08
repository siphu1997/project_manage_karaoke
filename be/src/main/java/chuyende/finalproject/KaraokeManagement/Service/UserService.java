package chuyende.finalproject.KaraokeManagement.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import chuyende.finalproject.KaraokeManagement.Entity.User;
import chuyende.finalproject.KaraokeManagement.Repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	public List<User> getAll(){
		return (List<User>) userRepository.findAll();
	}
	
	public Optional<User> findById(int id){
		return userRepository.findById(id);
	}
	
	public User save(User u) {
		return userRepository.save(u);
	}
	
	public void delete(int id) {
		userRepository.deleteById(id);
	}

}
