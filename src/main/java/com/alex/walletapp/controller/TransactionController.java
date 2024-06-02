package com.alex.walletapp.controller;

import com.alex.walletapp.model.Transaction;
import com.alex.walletapp.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/wallet/transaction")
@CrossOrigin
public class TransactionController {

    @Autowired
    private TransactionService service;

    @GetMapping("")
    public List<Transaction> getAll(){
        return service.findAll();
    }

    @GetMapping("/{id}")
    public Transaction getById(@PathVariable Integer id) {
        return service.findById(id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("")
    public void add(@RequestBody Transaction transaction){
        service.save(transaction);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/{id}")
    public void update(@RequestBody Transaction transaction, @PathVariable Integer id) {
        if (!service.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Content not found");
        }
        service.save(transaction);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }
}
