package chuyende.finalproject.KaraokeManagement.Entity;

import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

import org.hibernate.validator.constraints.Range;

@Entity
@Table(name = "receipt", schema = "public")
public class Receipt {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "receipt_id", nullable = false)
	private int id;
	
	@Range(min = 1, message = "Room id must be begin with 1")
	@NotNull(message = "Room id must not be null")
	@Column(name = "room_id", nullable = false)
	private Integer room_id;
	
	@Range(min = 1, message = "User id must be begin with 1")
	@NotNull(message = "User id must not be null")
	@Column(name = "user_id", nullable = false)
	private Integer user_id;

	@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="user_id", nullable=false, insertable = false, updatable = false)
    private User user;
	
	@Column(name = "customer_id", nullable = true)
	private Integer customer_id;

	@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="customer_id", nullable=true, insertable = false, updatable = false)
    private Customer customer;
	
	@Column(name = "total_price", nullable = true)
	private Double total_price;
	
	@Column(name = "hours", nullable = true)
	private Integer hours;
	
	@Column(name = "is_paid", nullable = true)
	private Boolean is_paid;
	
	@Column(name = "created_at", nullable = true)
	private String created_at;
	
	@Column(name = "updated_at", nullable = true)
	private String updated_at;
	
	@Column(name = "start_at", nullable = true)
	private String start_at;
	
	@Column(name = "end_at", nullable = true)
	private String end_at;
	
	
	@OneToMany(mappedBy = "receipt", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private List<ReceiptDetail> receip_details;

	public Receipt() {}
	
	public Receipt(int id,
			@Range(min = 1, message = "Room id must be begin with 1") @NotNull(message = "Room id must not be null") Integer room_id,
			@Range(min = 1, message = "User id must be begin with 1") @NotNull(message = "User id must not be null") Integer user_id,
			User user, Integer customer_id, Customer customer, Double total_price, Integer hours, Boolean is_paid,
			String created_at, String updated_at, String start_at, String end_at, List<ReceiptDetail> receip_details) {
		super();
		this.id = id;
		this.room_id = room_id;
		this.user_id = user_id;
		this.user = user;
		this.customer_id = customer_id;
		this.customer = customer;
		this.total_price = total_price;
		this.hours = hours;
		this.is_paid = is_paid;
		this.created_at = created_at;
		this.updated_at = updated_at;
		this.start_at = start_at;
		this.end_at = end_at;
		this.receip_details = receip_details;
	}


	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Integer getRoom_id() {
		return room_id;
	}

	public void setRoom_id(Integer room_id) {
		this.room_id = room_id;
	}

	public Integer getUser_id() {
		return user_id;
	}

	public void setUser_id(Integer user_id) {
		this.user_id = user_id;
	}

	public Integer getCustomer_id() {
		return customer_id;
	}

	public void setCustomer_id(Integer customer_id) {
		this.customer_id = customer_id;
	}

	public String getCreated_at() {
		return created_at;
	}

	public void setCreated_at(String created_at) {
		this.created_at = created_at;
	}

	public String getUpdated_at() {
		return updated_at;
	}

	public void setUpdated_at(String updated_at) {
		this.updated_at = updated_at;
	}
	

	public String getStart_at() {
		return start_at;
	}

	public void setStart_at(String start_at) {
		this.start_at = start_at;
	}

	public String getEnd_at() {
		return end_at;
	}

	public void setEnd_at(String end_at) {
		this.end_at = end_at;
	}
	
	public Double getTotal_price() {
		return total_price;
	}

	public void setTotal_price(Double total_price) {
		this.total_price = total_price;
	}

	public List<ReceiptDetail> getReceip_details() {
		return receip_details;
	}

	public void setReceip_details(List<ReceiptDetail> receip_details) {
		this.receip_details = receip_details;
	}

	public Integer getHours() {
		return hours;
	}

	public void setHours(Integer hours) {
		this.hours = hours;
	}
	

	public Boolean getIs_paid() {
		return is_paid;
	}


	public void setIs_paid(Boolean is_paid) {
		this.is_paid = is_paid;
	}


	public User getUser() {
		return user;
	}


	public void setUser(User user) {
		this.user = user;
	}


	public Customer getCustomer() {
		return customer;
	}


	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
	
}
