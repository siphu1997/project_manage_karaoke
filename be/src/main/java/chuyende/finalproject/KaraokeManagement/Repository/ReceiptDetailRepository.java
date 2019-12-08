package chuyende.finalproject.KaraokeManagement.Repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import chuyende.finalproject.KaraokeManagement.Entity.ReceiptDetail;

@Repository
public interface ReceiptDetailRepository extends JpaRepository<ReceiptDetail, Integer> {
	
	@Query("SELECT rd FROM ReceiptDetail rd WHERE rd.receipt_id = :rId and rd.menu_id = :mId")
    ReceiptDetail findByReceiptIdAndMenuId(@Param("rId") Integer rid, @Param("mId") Integer mId);
	
	@Query("SELECT rd FROM ReceiptDetail rd WHERE rd.receipt_id = :rId")
    List<ReceiptDetail> findByReceiptId(@Param("rId") Integer rid);
	
	@Transactional
	@Modifying
	@Query("DELETE FROM ReceiptDetail rd WHERE rd.receipt_id = :rId")
    void deleteByReceiptId(@Param("rId") Integer rid);
}
