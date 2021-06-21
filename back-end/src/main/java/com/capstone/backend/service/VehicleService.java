package com.capstone.backend.service;

import com.capstone.backend.model.Bike;
import com.capstone.backend.model.Car;
import com.capstone.backend.payload.ResponseData;


public interface VehicleService {
    ResponseData getAllVehiclesByUserId(long id);
    ResponseData saveCar(Car car);
    ResponseData saveBike(Bike bike);
    ResponseData getVehicleById(long id);
    //Tìm xe dựa trên vị trí
    ResponseData findCarDriver(String location);
    ResponseData findCarSelfDriver(String location);
    ResponseData findBike(String location);
}