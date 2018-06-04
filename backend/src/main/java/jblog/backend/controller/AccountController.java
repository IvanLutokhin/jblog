package jblog.backend.controller;

import jblog.backend.entity.Account;
import jblog.backend.service.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path = "/api/accounts")
public class AccountController {
    private final IAccountService accountService;

    @Autowired
    public AccountController(IAccountService accountService) {
        this.accountService = accountService;
    }

    @RequestMapping(path = "", method = { RequestMethod.POST }, consumes = { "application/json" }, produces = { "application/json" })
    @ResponseStatus(value = HttpStatus.CREATED)
    @ResponseBody
    public Account createAccount(@RequestBody Account account) {
        return accountService.createAccount(account);
    }

    @RequestMapping(path = "/{id}", method = { RequestMethod.GET }, produces = { "application/json" } )
    @ResponseBody
    public Account getAccount(@PathVariable Long id) {
        return accountService.getAccount(id);
    }
}
