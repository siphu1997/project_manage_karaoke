package com.finalproject.Services;

import javax.ws.rs.*;
import javax.ws.rs.core.*;
import javax.ws.rs.core.Response.Status;

import com.finalproject.Auth.Auth;
import com.finalproject.Model.User.User;

@Path("auth")
public class AuthService {
	
	@POST
	@Path("login")
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Consumes({MediaType.APPLICATION_FORM_URLENCODED, MediaType.MULTIPART_FORM_DATA, MediaType.APPLICATION_JSON})
	public Response login(@FormParam("username") String username, @FormParam("password") String password){
		User u = Auth.login(username, password);
		return Response.status(Status.OK.getStatusCode()).entity(u).build();
	}
}
