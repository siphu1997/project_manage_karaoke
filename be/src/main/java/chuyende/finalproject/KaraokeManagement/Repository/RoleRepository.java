package chuyende.finalproject.KaraokeManagement.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import chuyende.finalproject.KaraokeManagement.Entity.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
	Role findByName(String name);
}
