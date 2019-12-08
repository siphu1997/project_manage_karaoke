package chuyende.finalproject.KaraokeManagement.JWT;

import java.util.Date;
import java.util.List;


import org.springframework.stereotype.Component;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JwtTokenProvider {
	private final String JWT_SECRET = "KaraokeManagement";
	
	private final long JWT_EXPIRATION = 604800000L;
	
	
	// Tạo ra jwt từ thông tin user
	public String generateToken(String username, List<String> roles) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + JWT_EXPIRATION);
        
        Claims claims = Jwts.claims().setSubject(username);
        claims.put("roles", roles);
        
        // Tạo chuỗi json web token từ id của user.
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, JWT_SECRET)
                .compact();
    }
	
	// Lấy thông tin user từ jwt
	public String getUserIdFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(JWT_SECRET)
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
	}
	
	public boolean validateToken(String authToken) {
        try {
        	Jws<Claims> claims = Jwts.parser().setSigningKey(JWT_SECRET).parseClaimsJws(authToken);
        	if (claims.getBody().getExpiration().before(new Date())) {
                return false;
            }
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            e.printStackTrace();
        }
        return false;
    }
}
