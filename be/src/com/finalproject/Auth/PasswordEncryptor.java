package com.finalproject.Auth;

import java.util.Base64;
public class PasswordEncryptor {
    public static String encrypt(String valueToEnc) throws Exception {
        String encryptedValue = new String(Base64.getEncoder().encode(valueToEnc.getBytes()));
        return encryptedValue;
    }
    
    public static String decrypt(String encryptedValue) throws Exception {
        byte[] decordedValue = Base64.getDecoder().decode(encryptedValue.getBytes());
        String decryptedValue = new String(decordedValue);
        return decryptedValue;
   }
}
