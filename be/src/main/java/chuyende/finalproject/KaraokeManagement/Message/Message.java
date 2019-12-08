package chuyende.finalproject.KaraokeManagement.Message;

import java.util.List;

public class Message<T> {
	private String message;
	private T data;
	private List<String> errors;
	
	public Message() {}
	
	public Message(String message){
		this.setMessage(message);
	}
	
	public Message(T data){
		this.setData(data);
	}
	
	public Message(String message, T data){
		this.setMessage(message);
		this.setData(data);
	}
	
	public Message(String message, T data, List<String> errors){
		this.setMessage(message);
		this.setData(data);
		this.setErrors(errors);
	}
	
	
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public T getData() {
		return data;
	}
	public void setData(T data) {
		this.data = data;
	}

	public List<String> getErrors() {
		return errors;
	}

	public void setErrors(List<String> errors) {
		this.errors = errors;
	}
	
}
