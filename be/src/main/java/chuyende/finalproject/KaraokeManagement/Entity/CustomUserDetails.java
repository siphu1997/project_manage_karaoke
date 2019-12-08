package chuyende.finalproject.KaraokeManagement.Entity;

import java.util.*;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
public class CustomUserDetails implements UserDetails {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private User user;
	private List<GrantedAuthority> roles = new ArrayList<GrantedAuthority>();
	String ROLE_PREFIX = "ROLE_";

	
	public CustomUserDetails(User user) {
		this.user = user;
	}

	@Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
		this.roles.add(new SimpleGrantedAuthority(ROLE_PREFIX + this.user.getRole().getName().toUpperCase()));
        return this.roles;
    }

    public User getUser() {
        return user;
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
