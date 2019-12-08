package chuyende.finalproject.KaraokeManagement.Entity;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Range;

@Entity
@Table(name="room", schema = "public")
public class Room {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "room_id", nullable = false)
	private int id;
	
	@NotEmpty(message = "Room name field is required")
	@Column(name = "room_name", nullable = false)
	private String name;
	
	@Range(min = 1, message = "roomtype_id must be begin with 1")
	@NotNull(message = "roomtype_id must not be null")
	@Column(name = "roomtype_id", nullable = false, insertable = false, updatable = false)
	private Integer roomtype_id;
	
	@Column(name = "status", nullable = false)
	private int status;
	
	@Column(name = "active", nullable = false)
	private int active;
	
	@Column(name = "created_at", nullable = true)
	private String created_at;
	
	@Column(name = "updated_at", nullable = false)
	private String updated_at;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "roomtype_id", nullable = false)
	private RoomType roomtype;
	
	@Column(name = "receipt_id", nullable = true)
	private Integer receipt_id;
	
	@OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "receipt_id", nullable = true, insertable = false, updatable = false)
    private Receipt receipt;

	public Room() {}

	public Room(int id, @NotEmpty(message = "Room Name field is required") String name,
			@NotEmpty(message = "Roomtype_id field is required") int roomtype_id, int status, int active,
			String created_at, String updated_at) {
		super();
		this.id = id;
		this.name = name;
		this.roomtype_id = roomtype_id;
		this.status = status;
		this.active = active;
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

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public int getActive() {
		return active;
	}

	public void setActive(int active) {
		this.active = active;
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

	public RoomType getRoomtype() {
		return roomtype;
	}

	public void setRoomtype(RoomType roomtype) {
		this.roomtype = roomtype;
	}

	public int getRoomtype_id() {
		return roomtype_id;
	}

	public void setRoomtype_id(int roomtype_id) {
		this.roomtype_id = roomtype_id;
	}

	public Integer getReceipt_id() {
		return receipt_id;
	}

	public void setReceipt_id(Integer receipt_id) {
		this.receipt_id = receipt_id;
	}

	public Receipt getReceipt() {
		return receipt;
	}

	public void setReceipt(Receipt receipt) {
		this.receipt = receipt;
	}
	
}
