package com.capstone.backend.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long startTime;
    private long endTime;
    private long createTime;
    private long returnTime; // Thời gian trả xe
    private int amount;
    @OneToOne
    @JoinColumn(name = "promotion_id")
    private Promotion promotion;
    private String status; // {pending:p,reject:r,accept:a,cancel:c,finish:f}
    @OneToOne
    @JoinColumn(name = "deposit_id")
    private Deposit deposit;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;
}