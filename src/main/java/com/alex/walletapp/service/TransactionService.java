package com.alex.walletapp.service;

import com.alex.walletapp.model.Transaction;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

public interface TransactionService {
    public List<Transaction> findAll();
    public Transaction findById(@PathVariable Integer id);
    public Transaction save(Transaction transaction);
    public boolean existsById(Integer id);
    public void delete(@PathVariable Integer id);
}
