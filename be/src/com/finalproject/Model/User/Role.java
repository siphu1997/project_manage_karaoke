package com.finalproject.Model.User;

public class Role {
	private int roleId;
	private String name;
	
	public Role() {}
	public Role(int roleId, String name) {
		this.setRoleId(roleId);
		this.setName(name);
	}
	/**
	 * @return the roleID
	 */
	public int getRoleId() {
		return roleId;
	}
	/**
	 * @param roleID the roleID to set
	 */
	public void setRoleId(int roleId) {
		this.roleId = roleId;
	}
	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}
	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}
}
