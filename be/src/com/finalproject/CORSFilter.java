package com.finalproject;

import java.io.IOException;
import javax.ws.rs.container.*;
import javax.ws.rs.ext.Provider;

@Provider
public class CORSFilter implements ContainerResponseFilter {

	@Override
	public void filter(ContainerRequestContext requestContext, ContainerResponseContext responseContext) throws IOException {
		responseContext.getHeaders().add("Accept", "application/json");
		responseContext.getHeaders().add("Access-Control-Allow-Origin", "*");
		responseContext.getHeaders().add("Access-Control-Allow-Headers", "*");
		responseContext.getHeaders().add("Access-Control-Allow-Methods", "*");
		
	}
	
}