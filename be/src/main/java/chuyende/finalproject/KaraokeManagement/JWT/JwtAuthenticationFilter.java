package chuyende.finalproject.KaraokeManagement.JWT;

import java.io.IOException;

import javax.servlet.*;
import javax.servlet.http.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import chuyende.finalproject.KaraokeManagement.JWT.JwtTokenProvider;
import chuyende.finalproject.KaraokeManagement.Service.CustomUserDetailsService;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter{
	@Autowired
	private JwtTokenProvider jwtTokenProvider;
	
	@Autowired
    private CustomUserDetailsService customUserDetailsService;
	
	@Override
	 protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
			 FilterChain filterChain) throws ServletException, IOException {
		try {
		// Lấy jwt từ request
			String jwt = getJwtFromRequest(request);
	        if (jwt != null && jwtTokenProvider.validateToken(jwt)) {
	            // Lấy id user từ chuỗi jwt
	            String username = jwtTokenProvider.getUserIdFromJWT(jwt);
	            // Lấy thông tin người dùng từ id
	            UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);
	            if(userDetails != null) {
	                // Nếu người dùng hợp lệ, set thông tin cho Seturity Context
	                UsernamePasswordAuthenticationToken
	                        authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
	
	                SecurityContextHolder.getContext().setAuthentication(authentication);
	            }
	        }
	    } catch (Exception ex) {
	        ex.printStackTrace();
	    }
	
	    filterChain.doFilter(request, response);
    }
	
	private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        // Kiểm tra xem header Authorization có chứa thông tin jwt không
        if (bearerToken == null || !bearerToken.startsWith("Bearer ")) {
            return null;
        }
        return bearerToken.substring(7, bearerToken.length());
    }
	
}
