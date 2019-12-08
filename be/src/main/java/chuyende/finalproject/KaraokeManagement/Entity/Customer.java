package chuyende.finalproject.KaraokeManagement.Entity;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

@Entity
@Table(name = "customer", schema = "public")
public class Customer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "customer_id", nullable = false)
	private int id;
	
	@NotEmpty(message = "Customer name field is required")
	@Column(name = "name", nullable = false)
	private String name;
	
	@NotEmpty(message = "Customer phone number field is required")
	@Column(name = "phone_number", nullable = false)
	private String phone;
	
	@NotEmpty(message = "Customer address field is required")
	@Column(name = "address", nullable = false)
	private String address;
	
	@Column(name = "created_at", nullable = true)
	private String created_at;

	@Column(name = "updated_at", nullable = true)
	private String updated_at;

	public Customer() {}
	
	public Customer(int id, @NotEmpty(message = "Customer name field is required") String name,
			@NotEmpty(message = "Customer phone number field is required") String phone,
			@NotEmpty(message = "Customer address field is required") String address, String created_at,
			String updated_at) {
		this.id = id;
		this.name = name;
		this.phone = phone;
		this.address = address;
		this.created_at = created_at;
		this.updated_at = updated_at;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
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
	
	
}
