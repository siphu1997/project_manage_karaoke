package chuyende.finalproject.KaraokeManagement.Entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Range;

@Entity
@Table(name = "receipt_detail", schema = "public")
public class ReceiptDetail {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "receipt_detail_id", nullable = false)
	private int id;
	
	@Range(min = 1, message = "Receipt id must be begin with 1")
	@NotNull(message = "Receipt id must not be null")
	@Column(name = "receipt_id", nullable = false)
	private Integer receipt_id;
	
	@Range(min = 1, message = "Menu id must be begin with 1")
	@NotNull(message = "Menu id must not be null")
	@Column(name = "menu_id", nullable = false)
	private Integer menu_id;
	
	@Range(min = 0, message = "Quantity must be begin with 0")
	@NotNull(message = "Quantity must not be null")
	@Column(name = "qty", nullable = false)
	private Integer qty;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="receipt_id", nullable=false, insertable = false, updatable = false)
    private Receipt receipt;
	
	@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="menu_id", nullable=false, insertable = false, updatable = false)
    private Menu menu;

	public ReceiptDetail() {}
	public ReceiptDetail(int id,
			@Range(min = 1, message = "Receipt id must be begin with 1") @NotNull(message = "Receipt id must not be null") Integer receipt_id,
			@Range(min = 1, message = "Menu id must be begin with 1") @NotNull(message = "Menu id must not be null") Integer menu_id,
			@Range(min = 0, message = "Quantity must be begin with 0") @NotNull(message = "Quantity must not be null") Integer qty) {
		super();
		this.id = id;
		this.receipt_id = receipt_id;
		this.menu_id = menu_id;
		this.qty = qty;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Integer getReceipt_id() {
		return receipt_id;
	}
	public void setReceipt_id(Integer receipt_id) {
		this.receipt_id = receipt_id;
	}
	public Integer getMenu_id() {
		return menu_id;
	}
	public void setMenu_id(Integer menu_id) {
		this.menu_id = menu_id;
	}
	public Integer getQty() {
		return qty;
	}
	public void setQty(Integer qty) {
		this.qty = qty;
	}
	public Menu getMenu() {
		return menu;
	}
	public void setMenu(Menu menu) {
		this.menu = menu;
	}
}
