package com.finalproject;

import java.lang.reflect.*;
import java.util.*;

import javax.annotation.security.*;
import javax.ws.rs.container.*;
import javax.ws.rs.core.*;
import javax.ws.rs.ext.Provider;

import org.glassfish.jersey.internal.util.Base64;

import com.finalproject.Auth.PasswordEncryptor;
import com.finalproject.Model.User.Role;
import com.finalproject.Model.User.User;
import com.finalproject.Model.User.UserDAO;

@Provider
public class AuthorizationFilter implements ContainerRequestFilter{
	@Context
    private ResourceInfo resourceInfo;
     
    private static final String AUTHORIZATION_PROPERTY = "Authorization";
    private static final String AUTHENTICATION_SCHEME = "Basic";
    private static final String PATH = "secured";
    @Override
    public void filter(ContainerRequestContext requestContext)
    {
        Method method = resourceInfo.getResourceMethod();
        if(requestContext.getUriInfo().getPath().contains(PATH)) {
	        //Access allowed for all
	        if( ! method.isAnnotationPresent(PermitAll.class))
	        {
	            //Access denied for all
	            if(method.isAnnotationPresent(DenyAll.class))
	            {
	                requestContext.abortWith(Response.status(Response.Status.FORBIDDEN)
	                         .entity("Access blocked for all users !!").build());
	                return;
	            }
	              
	            //Get request headers
	            final MultivaluedMap<String, String> headers = requestContext.getHeaders();
	              
	            //Fetch authorization header
	            final List<String> authorization = headers.get(AUTHORIZATION_PROPERTY);
	              
	            //If no authorization information present; block access
	            if(authorization == null || authorization.isEmpty())
	            {
	                requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED)
	                    .entity("You cannot access this resource").build());
	                return;
	            }
	              
	            //Get encoded username and password
	            final String encodedUserPassword = authorization.get(0).replaceFirst(AUTHENTICATION_SCHEME + " ", "");
	
	            //Decode username and password
	            String token = new String(Base64.decode(encodedUserPassword.getBytes()));
	            //Split username and password tokens
	            final StringTokenizer tokenizer = new StringTokenizer(token, ":");
	            final String username = tokenizer.nextToken();
	            final String password = tokenizer.nextToken();
	              
	            //Verify user access
	            if(method.isAnnotationPresent(RolesAllowed.class))
	            {
	                RolesAllowed rolesAnnotation = method.getAnnotation(RolesAllowed.class);
	                Set<String> rolesSet = new HashSet<String>(Arrays.asList(rolesAnnotation.value()));
	                  
	                //Is user valid?
	                try {
						if( ! isUserAllowed(username, password, rolesSet))
						{
						    requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED)
						        .entity("You cannot access this resource").build());
						    return;
						}
						
					} catch (Exception e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
	            }
	        }
        }
    }
    
    private boolean isUserAllowed(final String username, final String password, final Set<String> rolesSet) throws Exception
    {
        boolean isAllowed = false;
    	List<User> uList = UserDAO.getAllUser();

    	for(User u: uList) {
    		String decodedPwd = PasswordEncryptor.decrypt(u.getPassword());
    		if(username.equals(u.getUsername()) && password.equals(decodedPwd)) {
    			for(Role r: u.getRoles()) {
    				if(rolesSet.contains(r.getName())){
    					isAllowed = true;
    				}
    			}
    		}
    	}
          
        return isAllowed;
    }
}
