package chuyende.finalproject.KaraokeManagement.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import chuyende.finalproject.KaraokeManagement.Entity.ReceiptDetail;
import chuyende.finalproject.KaraokeManagement.Repository.ReceiptDetailRepository;

@Service
public class ReceiptDetailService {
	@Autowired
	private ReceiptDetailRepository rdRepository;
	
	public List<ReceiptDetail> getAll(){
		return rdRepository.findAll();
	}
	
	public Optional<ReceiptDetail> findById(int id){
		return rdRepository.findById(id);
	}
	
	public ReceiptDetail findByReceiptIdAndMenuId(Integer rId, Integer mId){
		return rdRepository.findByReceiptIdAndMenuId(rId, mId);
	}
	
	public List<ReceiptDetail> findByReceiptId(Integer rId){
		return rdRepository.findByReceiptId(rId);
	}
	
	public ReceiptDetail save(ReceiptDetail fb) {
		return rdRepository.save(fb);
	}
	
	public void delete(int id) {
		rdRepository.deleteById(id);
	}
	
	public void deleteByReceiptId(int rId) {
		rdRepository.deleteByReceiptId(rId);
	}
}
