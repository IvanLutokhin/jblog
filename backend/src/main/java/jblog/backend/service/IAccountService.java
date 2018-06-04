package jblog.backend.service;

import jblog.backend.dto.LoginRequestDto;
import jblog.backend.dto.LoginResponseDto;
import jblog.backend.entity.Account;
import jblog.backend.exception.AccountExistsException;
import jblog.backend.exception.InvalidCredentialsException;
import jblog.backend.exception.ResourceNotFoundException;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface IAccountService {
    LoginResponseDto login(LoginRequestDto requestDto) throws InvalidCredentialsException;

    Account createAccount(Account account) throws AccountExistsException;

    Account getAccount(Long id) throws ResourceNotFoundException;
}
