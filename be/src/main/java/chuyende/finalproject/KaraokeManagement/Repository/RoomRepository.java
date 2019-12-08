package chuyende.finalproject.KaraokeManagement.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import chuyende.finalproject.KaraokeManagement.Entity.Room;

@Repository
public interface RoomRepository extends JpaRepository<Room, Integer> {
	Room findByName(String name);
}
