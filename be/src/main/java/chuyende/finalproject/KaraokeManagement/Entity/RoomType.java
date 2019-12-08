package chuyende.finalproject.KaraokeManagement.Entity;

import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Range;

@Entity
@Table(name = "room_type", schema="public")
public class RoomType {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "roomtype_id", nullable = false)
	private int id;
	
	@NotEmpty(message = "Roomtype name field is required")
	@Column(name = "roomtype_name", nullable = false)
	private String name;
	
	@Positive(message = "Roomtype price must be a positive number")
	@Range(min = 0)
	@Column(name = "roomtype_price", nullable = false)
	private Double price;
	
	@Column(name = "created_at", nullable = true)
	private String created_at;
	
	@Column(name = "updated_at", nullable = false)
	private String updated_at;

	@OneToMany(mappedBy="roomtype", cascade = CascadeType.ALL)
	private Collection<Room> rooms = new ArrayList<Room>();
	public RoomType() {}


	public RoomType(int id, @NotEmpty(message = "Roomtype name field is required") String name,
			@Positive @Size(min = 0, message = "Roomtype price field is required") Double price, String created_at,
			String updated_at) {
		super();
		this.id = id;
		this.name = name;
		this.price = price;
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

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
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
