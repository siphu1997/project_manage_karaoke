package com.finalproject.Model.User;

import java.util.*;
import org.codehaus.jackson.annotate.*;
@JsonIgnoreProperties("password")
public class User {
	private int userId;
	private String username;
	@JsonIgnore
	private String password; 
	private String token;
	private List<Role> roles;
	
	public User() {}
	public User(int userId, String username, String password, String token, List<Role> roles) {
		this.setUserId(userId);
		this.setUsername(username);
		this.setPassword(password);
		this.setRoles(roles);
		this.setToken(token);
	}
	/**
	 * @return the userId
	 */

	public int getUserId() {
		return userId;
	}
	/**
	 * @param userId the userId to set
	 */
	public void setUserId(int userId) {
		this.userId = userId;
	}
	/**
	 * @return the username
	 */
	public String getUsername() {
		return username;
	}
	/**
	 * @param username the username to set
	 */
	public void setUsername(String username) {
		this.username = username;
	}
	
	/**
	 * @return the password
	 */

	@JsonIgnore
	public String getPassword() {
		return password;
	}
	/**
	 * @param password the password to set
	 */
	public void setPassword(String password) {
		this.password = password;
	}
	/**
	 * @return the roles
	 */
	public List<Role> getRoles() {
		return roles;
	}
	/**
	 * @param roles the roles to set
	 */
	public void setRoles(List<Role> roles) {
		this.roles = roles;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
}
