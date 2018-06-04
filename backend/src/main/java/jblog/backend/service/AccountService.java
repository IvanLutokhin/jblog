package jblog.backend.service;

import jblog.backend.dto.LoginRequestDto;
import jblog.backend.dto.LoginResponseDto;
import jblog.backend.entity.Account;
import jblog.backend.exception.AccountExistsException;
import jblog.backend.exception.InvalidCredentialsException;
import jblog.backend.exception.ResourceNotFoundException;
import jblog.backend.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.Date;

@Service
public class AccountService implements IAccountService {
    private final AccountRepository accountRepository;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AccountService(AccountRepository accountRepository, PasswordEncoder passwordEncoder) {
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public LoginResponseDto login(LoginRequestDto requestDto) throws InvalidCredentialsException {
        Account account = accountRepository.findByUsername(requestDto.getUsername()).orElseThrow(() -> new InvalidCredentialsException("Unknown username"));

        if (!passwordEncoder.matches(requestDto.getPassword(), account.getPassword())) {
            throw new InvalidCredentialsException("Invalid credentials");
        }

        String token = Base64.getEncoder().encodeToString(String.format("%s:%s", requestDto.getUsername(), requestDto.getPassword()).getBytes());

        return new LoginResponseDto(new Date(), "200","User logged in", account.getId(), token);
    }

    @Override
    public Account createAccount(Account account) throws AccountExistsException {
        if (isUsernameExists(account.getUsername())) {
            throw new AccountExistsException(String.format("Username '%s' is already exists", account.getUsername()));
        }

        String passwordEncoded = passwordEncoder.encode(account.getPassword());

        account.setPassword(passwordEncoded);

        return accountRepository.save(account);
    }

    @Override
    public Account getAccount(Long id) throws ResourceNotFoundException {
        return accountRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Account not found"));
    }

    private boolean isUsernameExists(String username) {
        return accountRepository.findByUsername(username).isPresent();
    }
}
