package com.capstone.backend.model;

import java.sql.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@JsonIgnoreProperties
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String licensePlates;
    private Date yom; // năm sản xuất
    private char fuelType;
    private int fuelConsumption; // tiêu thụ nhiên liệu/100km
    private int rentalPrice;
    private String description;
    private boolean discountEnable;
    private int weekDiscount; // giảm giá theo tuần (%)
    private int monthDiscount;
    private boolean quickBooking; // chế độ đặt xe nhanh
    private boolean deliveryEnable;
    private int deliveryRadius; // Khoảng cách giao xe tối đa(km)
    private int deliveryRadiusFree; // khoảng cách miễn phí giao xe(km)
    private int deliveryFee; // (*1000đ/km)
    private int limitDistance; // giới hạn quãng đường tối đa(km)
    private int outLimitFee; // giá vượt giới hạn(*1000đ/km)
    @Transient
    private int distance;
    @OneToOne
    @JoinColumn(name = "model_id")
    private Model model;
    @OneToMany(mappedBy = "vehicle", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Image> images;
    @OneToMany(mappedBy = "vehicle", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Rating> rating;
    @ManyToMany(mappedBy = "likedVehicles")
    @EqualsAndHashCode.Exclude
    @JsonIgnore
    private Set<User> userLiked;
}