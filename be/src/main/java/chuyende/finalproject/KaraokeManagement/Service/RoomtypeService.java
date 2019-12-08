package chuyende.finalproject.KaraokeManagement.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import chuyende.finalproject.KaraokeManagement.Entity.RoomType;
import chuyende.finalproject.KaraokeManagement.Repository.RoomtypeRepository;

@Service
public class RoomtypeService {
	
	@Autowired
	private RoomtypeRepository roomtypeRepository;
	
	public List<RoomType> getAll(){
		return roomtypeRepository.findAll();
	}
	
	public Optional<RoomType> findById(int id){
		return roomtypeRepository.findById(id);
	}
	
	public RoomType findByRoomTypeName(String name){
		return roomtypeRepository.findByName(name);
	}
	
	public RoomType save(RoomType r) {
		return roomtypeRepository.save(r);
	}
	
	public void delete(int id) {
		roomtypeRepository.deleteById(id);
	}
}
