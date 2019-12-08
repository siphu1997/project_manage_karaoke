package chuyende.finalproject.KaraokeManagement.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import chuyende.finalproject.KaraokeManagement.Entity.CustomUserDetails;
import chuyende.finalproject.KaraokeManagement.Entity.User;
import chuyende.finalproject.KaraokeManagement.Repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {
	
	@Autowired
    private UserRepository userRepository;

    public UserDetails loadUserByUserId(int id) throws UsernameNotFoundException {
    	Optional<User> user = userRepository.findById(id);
        if (user != null) {
        	return new CustomUserDetails(user.get());
        }
        return null;
    }
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    	User user = userRepository.findByUsername(username);
        if (user == null) {
            return null;
        }
        return new CustomUserDetails(user);
    }
}
