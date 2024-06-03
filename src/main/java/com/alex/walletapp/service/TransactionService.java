package com.alex.walletapp.service;

import com.alex.walletapp.model.Transaction;
import com.alex.walletapp.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class TransactionService{
    @Autowired
    private TransactionRepository repository;

    public List<Transaction> findAll() {
        return repository.findAll();
    }

    public Transaction findById(@PathVariable Integer id) {
        return repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Content not found"));
    }

    public Transaction save(Transaction transaction){
        return repository.save(transaction);
    }

    public boolean existsById(Integer id) {
        return repository.existsById(id);
    }

    public void delete(@PathVariable Integer id) {
        repository.delete(findById(id));
    }
}
