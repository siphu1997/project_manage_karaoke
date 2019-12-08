package chuyende.finalproject.KaraokeManagement.Entity;



import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Range;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;


@Entity
@Table(name = "user", schema="public")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false)
	private int id;
	
	@NotEmpty(message = "Username field is required")
	@Column(name = "username", nullable = false, unique = true)
	private String username;

	@NotEmpty(message = "Password field is required")
	@JsonIgnore
	@JsonProperty("password")
	@Column(name = "password", nullable = false)
	private String password;

	@NotEmpty(message = "Display_name field is required")
	@NotNull(message = "Display_name field must not be null")
	@Column(name = "display_name", nullable = false)
	private String display_name;
	
	@Column(name = "phone", nullable = true)
	private String phone;
	
	@Column(name = "address", nullable = true)
	private String address;
	
	@Range(min = 1, message = "role_id must be begin with 1")
	@NotNull(message = "role_id must not be null")
	@Column(name = "role_id", nullable = false, insertable = false, updatable = false)
	private Integer role_id;

	@Column(name = "created_at", nullable = true)
	private String created_at;

	@Column(name = "updated_at", nullable = true)
	private String updated_at;
	
//	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
//	@JoinTable(name = "user_role", joinColumns = {
//			@JoinColumn(name = "role_id")}, inverseJoinColumns = {
//			@JoinColumn(name = "user_id")})
//	private Collection<Role> roles = new ArrayList<Role>();
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "role_id", nullable = false)
	private Role role;

	public User() {}

	public User(int id,
			@NotEmpty(message = "Username field is required") @NotNull(message = "Username field must not be null") String username,
			@NotEmpty(message = "Password field is required") @NotNull(message = "Password field must not be null") String password,
			@NotEmpty(message = "Display_name field is required") @NotNull(message = "Display_name field must not be null") String display_name,
			String phone, String address, @Min(1) @NotNull(message = "role_id must not be null") int role_id,
			String created_at, String updated_at) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.display_name = display_name;
		this.phone = phone;
		this.address = address;
		this.role_id = role_id;
		this.created_at = created_at;
		this.updated_at = updated_at;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

//	public Collection<Role> getRoles() {
//		return roles;
//	}
//
//	public void setRoles(Collection<Role> roles) {
//		this.roles = roles;
//	}
	


	public int getRole_id() {
		return role_id;
	}
	public void setRole_id(int role_id) {
		this.role_id = role_id;
	}
	
	public Role getRole() {
		return role;
	}
	public void setRole(Role role) {
		this.role = role;
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

	public String getDisplay_name() {
		return display_name;
	}

	public void setDisplay_name(String display_name) {
		this.display_name = display_name;
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


}
