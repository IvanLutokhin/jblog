package jblog.backend.controller;

import jblog.backend.dto.LoginResponseDto;
import jblog.backend.dto.LoginRequestDto;
import jblog.backend.service.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path = "/api/auth")
public class SecurityController {
    private final IAccountService accountService;

    @Autowired
    public SecurityController(IAccountService accountService) {
        this.accountService = accountService;
    }

    @RequestMapping(path = "/login", method = { RequestMethod.POST }, consumes = { "application/json" }, produces = { "application/json" })
    @ResponseBody
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto requestDto) {
        LoginResponseDto responseDto = accountService.login(requestDto);

        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }
}
