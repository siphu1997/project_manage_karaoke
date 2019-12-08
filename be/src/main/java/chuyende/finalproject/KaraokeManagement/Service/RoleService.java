package chuyende.finalproject.KaraokeManagement.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import chuyende.finalproject.KaraokeManagement.Entity.Role;
import chuyende.finalproject.KaraokeManagement.Repository.RoleRepository;

@Service
public class RoleService {

	@Autowired
	RoleRepository roleRepository;
	
	public List<Role> getAll(){
		return roleRepository.findAll();
	}
	
	public Optional<Role> findById(int id){
		return roleRepository.findById(id);
	}
	
	public Role findByRoleName(String name){
		return roleRepository.findByName(name);
	}
	
	public Role save(Role r) {
		return roleRepository.save(r);
	}
	
	public void delete(int id) {
		roleRepository.deleteById(id);
	}
}
