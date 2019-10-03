package com.finalproject;

import java.sql.*;

public class DbConnector {
	public static Connection connectDB() {
		Connection conn = null;
		try {
			Class.forName("com.mysql.jdbc.Driver");
			String connectionUrl = "jdbc:mysql://localhost:3306/project_karaoke_management";
			String connectionUser = "root";
			String connectionPassword = "";
			conn = DriverManager.getConnection(connectionUrl, connectionUser, connectionPassword);
			return conn;
		} catch(Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public static void closeConnection(Connection conn) {
		try { if(conn != null) conn.close(); } catch (SQLException e) { e.printStackTrace();}
	}
	
	public static void closeStatement(Statement sm) {
		try { if(sm != null) sm.close(); } catch (SQLException e) { e.printStackTrace();}
	}
	
	public static void closePreparedStatement(PreparedStatement ps) {
		try { if(ps != null) ps.close(); } catch (SQLException e) { e.printStackTrace();}
	}
	
	public static void closeResultSet(ResultSet rs) {
		try { if(rs != null) rs.close(); } catch (SQLException e) { e.printStackTrace();}
	}
}
