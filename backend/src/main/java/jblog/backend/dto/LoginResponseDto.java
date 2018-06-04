package jblog.backend.dto;

import java.util.Date;

public class LoginResponseDto {
    private final Date timestamp;

    private final String status;

    private final String message;

    private final Long accountId;

    private final String token;

    public LoginResponseDto(Date timestamp, String status, String message, Long accountId, String token) {
        this.timestamp = timestamp;
        this.status = status;
        this.message = message;
        this.accountId = accountId;
        this.token = token;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public String getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }

    public Long getAccountId() {
        return accountId;
    }

    public String getToken() {
        return token;
    }
}
