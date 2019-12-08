package chuyende.finalproject.KaraokeManagement.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import chuyende.finalproject.KaraokeManagement.Entity.Menu;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Integer>{	
	List<Menu> findByNameContaining(String name);
}
