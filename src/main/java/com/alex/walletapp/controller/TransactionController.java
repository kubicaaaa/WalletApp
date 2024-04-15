package com.alex.walletapp.controller;

import com.alex.walletapp.model.Transaction;
import com.alex.walletapp.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transaction")
@CrossOrigin // to make request from React work
public class TransactionController {
    @Autowired
    private TransactionService transactionService;

    @PostMapping("/add")
    public String add(@RequestBody Transaction transaction){
        transactionService.saveTransaction(transaction);
        return "Transaction added successfully";
    }

    @GetMapping("/getAll")
    public List<Transaction> getAllTransactions(){
       return transactionService.getAllTransactions();
    }
}
