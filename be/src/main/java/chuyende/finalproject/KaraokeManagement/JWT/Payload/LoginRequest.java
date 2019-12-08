package chuyende.finalproject.KaraokeManagement.JWT.Payload;

import javax.validation.constraints.*;

public class LoginRequest {
	@NotEmpty(message = "Username field is required")
	private String username;
	
	@NotEmpty(message = "Password field is required")
	private String password;
	
	public LoginRequest() {}
	public LoginRequest(String username, String password) {
		super();
		this.username = username;
		this.password = password;
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
}
