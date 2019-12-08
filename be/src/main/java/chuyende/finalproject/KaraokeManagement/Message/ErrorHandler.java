package chuyende.finalproject.KaraokeManagement.Message;

import java.util.*;
import java.util.stream.Collectors;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RestController
public class ErrorHandler extends ResponseEntityExceptionHandler{
	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
			HttpHeaders headers, HttpStatus status, WebRequest request) {
		List<String> errors = ex.getBindingResult()
								.getFieldErrors()
								.stream()
								.map(er -> er.getDefaultMessage())
								.collect(Collectors.toList());
		Message<Object> message = new Message<Object>("Something went wrong", null, errors);
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
	} 
}
