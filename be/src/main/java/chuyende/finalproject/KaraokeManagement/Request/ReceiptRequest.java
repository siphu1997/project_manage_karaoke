package chuyende.finalproject.KaraokeManagement.Request;

import java.util.List;

import chuyende.finalproject.KaraokeManagement.Entity.ReceiptDetail;

public class ReceiptRequest {

	private List<ReceiptDetail> rdList;

	public ReceiptRequest() {}
	public ReceiptRequest(List<ReceiptDetail> rdList) {
		super();
		this.rdList = rdList;
	}
	public List<ReceiptDetail> getRdList() {
		return rdList;
	}
	public void setRdList(List<ReceiptDetail> rdList) {
		this.rdList = rdList;
	}
	
}
