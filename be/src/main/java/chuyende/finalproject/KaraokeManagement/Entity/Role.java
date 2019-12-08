package chuyende.finalproject.KaraokeManagement.Entity;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

@Entity
@Table(name = "role", schema="public")
public class Role {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "role_id", nullable = false)
	private int id;
	
	@NotEmpty(message = "Role name field is required")
	@Column(name = "role_name", nullable = false)
	private String name;

	public Role() {}
	
	public Role(int id, @NotEmpty String name) {
		this.id = id;
		this.name = name;
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
}
