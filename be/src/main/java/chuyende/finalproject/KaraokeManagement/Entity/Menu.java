package chuyende.finalproject.KaraokeManagement.Entity;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Positive;

import org.hibernate.validator.constraints.Range;

@Entity
@Table(name = "menu", schema = "public")
public class Menu {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "menu_id", nullable = false)
	private int id;
	
	@NotEmpty(message = "Menu name is required")
	@Column(name = "menu_name", nullable = false)
	private String name;
	
	@NotEmpty(message = "Menu type is required")
	@Column(name = "menu_type", nullable = false)
	private String type;
	
	@Positive(message = "Menu price must be a positive number")
	@Range(min = 0)
	@Column(name = "menu_price", nullable = false)
	private Long price;
	
	@NotEmpty(message = "Menu unit is required")
	@Column(name = "menu_unit", nullable = false)
	private String unit;
	
	@Column(name = "menu_status", nullable = false)
	private int status;
	
	@Column(name = "created_at", nullable = true)
	private String created_at;
	
	@Column(name = "updated_at", nullable = false)
	private String updated_at;

	public Menu() {}
	public Menu(int id, @NotEmpty(message = "Menu name is required") String name,
			@NotEmpty(message = "Menu type is required") String type,
			@Positive(message = "Menu price must be a positive number") @Range(min = 0) Long price,
			@NotEmpty(message = "Menu unit is required") String unit, int status, String created_at,
			String updated_at) {
		super();
		this.id = id;
		this.name = name;
		this.type = type;
		this.price = price;
		this.unit = unit;
		this.status = status;
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

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Long getPrice() {
		return price;
	}

	public void setPrice(Long price) {
		this.price = price;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
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
