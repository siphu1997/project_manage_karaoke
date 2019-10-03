package com.finalproject.Model.User;

import java.sql.*;
import java.util.*;

import com.finalproject.DbConnector;

public class UserDAO {
	public static List<Role> getRoleByUserId(int user_id){
		Connection conn = null;
		Statement sm = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		List<Role> rList = new ArrayList<Role>();
		try {
			String sql = "SELECT * FROM roles" 
					+ " LEFT JOIN user_role"
					+ " ON roles.role_id = user_role.role_id"
					+ " WHERE user_role.user_id = ?";
			conn = DbConnector.connectDB();
			ps = conn.prepareStatement(sql);
			ps.setInt(1, user_id);
			rs = ps.executeQuery();
			while(rs.next()) {
				Role role = new Role(rs.getInt("role_id"), rs.getString("name"));
				rList.add(role);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			DbConnector.closeConnection(conn);
			DbConnector.closeStatement(sm);
			DbConnector.closeResultSet(rs);
		}
		return rList;
	}
	public static List<User> getAllUser(){
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		List<User> uList = new ArrayList<User>();
		List<Role> rList;
		try {
			String sql = "SELECT * FROM `users`" + 
							" LEFT JOIN `user_role`" + 
							"	INNER JOIN `roles`" + 
							"    ON `roles`.`role_id` = `user_role`.`role_id`" + 
							" ON `users`.`user_id` = `user_role`.`user_id`;";
			conn = DbConnector.connectDB();
			ps = conn.prepareStatement(sql);
			rs = ps.executeQuery();
			while(rs.next()) {
				rList = getRoleByUserId(rs.getInt("user_id"));
				User user = new User(rs.getInt("user_id"), rs.getString("username"), rs.getString("password"), 
						rs.getString("token"),rList);
				uList.add(user);
			}
		} catch(Exception e) {
			e.printStackTrace();
		} finally {
			DbConnector.closeConnection(conn);
			DbConnector.closePreparedStatement(ps);
			DbConnector.closeResultSet(rs);
		}
		return uList;
	}
	
	public static User getUserByToken(String token){
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		User user = null;
		List<Role> rList = null;
		try {
			String sql = "SELECT * FROM `users`" + 
					" LEFT JOIN `user_role`" + 
					"	INNER JOIN `roles`" + 
					"    ON `roles`.`role_id` = `user_role`.`role_id`" + 
					" ON `users`.`user_id` = `user_role`.`user_id`"
					+ " WHERE user.token = ?";
			conn = DbConnector.connectDB();
			ps = conn.prepareStatement(sql);
			ps.setString(1, token);
			rs = ps.executeQuery();
			while(rs.next()) {
				rList = getRoleByUserId(rs.getInt("user_id"));
				user = new User(rs.getInt("user_id"), rs.getString("username"), rs.getString("password"), rs.getString("token"), rList);
			}
		} catch(Exception e) {
			e.printStackTrace();
		} finally {
			DbConnector.closeConnection(conn);
			DbConnector.closePreparedStatement(ps);
			DbConnector.closeResultSet(rs);
		}
		return user;
	}
}
