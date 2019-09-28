package com.finalproject.Auth;

import java.sql.*;
import java.util.List;

import com.finalproject.DbConnector;
import com.finalproject.Model.User.Role;
import com.finalproject.Model.User.User;
import com.finalproject.Model.User.UserDAO;

public class Authentication {
	public static User login(String username, String password) {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		User u = null;
		List<Role> rList;
		try {
			String sql = "SELECT * FROM users WHERE users.username = ? AND users.password = ?";
			conn = DbConnector.connectDB();
			ps = conn.prepareStatement(sql);
			ps.setString(1, username);
			ps.setString(2, password);
			rs = ps.executeQuery();
			if(rs.next()) {
				rList = UserDAO.getRoleByUserId(rs.getInt("user_id"));
				String pwd = PasswordEncryptor.decrypt(rs.getString("password"));
				if(username.equals(rs.getString("username")) && password.equals(pwd)) {
					u = new User(rs.getInt("user_id"), rs.getString("username"), rs.getString("password"), 
							rs.getString("token"), rList);
				}
			}
		} catch(Exception e) {
			e.printStackTrace();
		} finally {
			DbConnector.closeConnection(conn);
			DbConnector.closePreparedStatement(ps);
			DbConnector.closeResultSet(rs);
		}
		return u;
	}
}
