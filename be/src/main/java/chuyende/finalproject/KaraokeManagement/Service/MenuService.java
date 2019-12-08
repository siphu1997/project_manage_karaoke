package chuyende.finalproject.KaraokeManagement.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import chuyende.finalproject.KaraokeManagement.Entity.Menu;
import chuyende.finalproject.KaraokeManagement.Repository.MenuRepository;

@Service
public class MenuService {

	@Autowired
	private MenuRepository menuRepository;
	
	public List<Menu> getAll(){
		return menuRepository.findAll();
	}
	
	public Optional<Menu> findById(int id){
		return menuRepository.findById(id);
	}
	
	public List<Menu> findByName(String name){
		return menuRepository.findByNameContaining(name);
	}
	
	public Menu save(Menu fb) {
		return menuRepository.save(fb);
	}
	
	public void delete(int id) {
		menuRepository.deleteById(id);
	}
}
