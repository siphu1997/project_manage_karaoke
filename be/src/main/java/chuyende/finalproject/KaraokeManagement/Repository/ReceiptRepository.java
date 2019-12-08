package chuyende.finalproject.KaraokeManagement.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import chuyende.finalproject.KaraokeManagement.Entity.Receipt;

@Repository
public interface ReceiptRepository extends JpaRepository<Receipt, Integer>{
}
