package com.alex.walletapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.time.LocalDate;

@Entity
public class Transaction {
        @Id
        private int id;
        private String name;
        private LocalDate time;
        private double amount;

        public Transaction() {
                this.time = LocalDate.now();
        }

        public int getId() {
                return id;
        }

        public void setId(int id) {
                this.id = id;
        }

        public String getName() {
                return name;
        }

        public void setName(String name) {
                this.name = name;
        }

        public LocalDate getTime() {
                return time;
        }

        public void setTime() {
                this.time = LocalDate.now();
        }

        public double getAmount() {
                return amount;
        }

        public void setAmount(double amount) {
                this.amount = amount;
        }
}
