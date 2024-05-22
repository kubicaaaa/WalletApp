package com.alex.walletapp.service;

import com.alex.walletapp.model.Transaction;
import java.util.List;

public interface TransactionService {
    public Transaction saveTransaction(Transaction transaction);
    public List<Transaction> getAllTransactions();
}
