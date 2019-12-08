package chuyende.finalproject.KaraokeManagement.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import chuyende.finalproject.KaraokeManagement.Entity.Room;
import chuyende.finalproject.KaraokeManagement.Repository.RoomRepository;

@Service
public class RoomService {
	
	@Autowired
	private RoomRepository roomRepository;
	
	public List<Room> getAll(){
		return roomRepository.findAll();
	}
	
	public Optional<Room> findById(int id){
		return roomRepository.findById(id);
	}
	
	public Room findByRoomName(String name){
		return roomRepository.findByName(name);
	}
	
	public Room save(Room r) {
		return roomRepository.save(r);
	}
	
	public void delete(int id) {
		roomRepository.deleteById(id);
	}
}
