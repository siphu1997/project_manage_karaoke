package chuyende.finalproject.KaraokeManagement.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import chuyende.finalproject.KaraokeManagement.Entity.Receipt;
import chuyende.finalproject.KaraokeManagement.Repository.ReceiptRepository;

@Service
public class ReceiptService {
	@Autowired
	private ReceiptRepository receiptRepository;
	
	public List<Receipt> getAll(){
		return receiptRepository.findAll();
	}
	
	public Optional<Receipt> findById(int id){
		return receiptRepository.findById(id);
	}
	
	public Receipt save(Receipt fb) {
		return receiptRepository.save(fb);
	}
	
	public void delete(int id) {
		receiptRepository.deleteById(id);
	}
}
