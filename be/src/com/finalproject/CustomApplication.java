package com.finalproject;

import org.glassfish.jersey.server.ResourceConfig;

public class CustomApplication extends ResourceConfig {
	 public CustomApplication()
	    {
	        packages("com.finalproject");
	        //Register Auth Filter here
	        register(AuthorizationFilter.class);
	    }
}
