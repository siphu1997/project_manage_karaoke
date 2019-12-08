package chuyende.finalproject.KaraokeManagement.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import chuyende.finalproject.KaraokeManagement.Entity.RoomType;

@Repository
public interface RoomtypeRepository extends JpaRepository<RoomType, Integer>{
	RoomType findByName(String name);
}
