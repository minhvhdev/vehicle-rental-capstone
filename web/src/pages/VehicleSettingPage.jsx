import vehicleApi from "api/vehicleApi";
import store from "app/store";
import GoogleMaps from "components/homepage/AutoComplete/AutoComplete";
import { formatMoneyK } from "lib/Helper";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
  FormText,
  InputGroup,
  Row,
} from "react-bootstrap";
import FormRange from "react-bootstrap/esm/FormRange";
import { AiFillCar, AiOutlinePlusCircle, AiOutlineRight } from "react-icons/ai";
import { BiWallet } from "react-icons/bi";
import { Link } from "react-router-dom";
import queryString from "query-string";
import Loading from "components/layout/Loading";
import { FiEdit } from "react-icons/fi";

export default function VehicleSettingPage(props) {
  const param = queryString.parse(window.location.search);
  const [register, setRegister] = useState({});
  const [status, setStatus] = useState("loading");
  const [changeLocation, setChangeLocation] = useState(false);
  const [errorLocation, setErrorLocation] = useState(false);
  const [errorPrice, setErrorPrice] = useState(false);
  const [limitEnable, setLimitEnable] = useState(false);
  const [deliveryEnable, setDeliveryEnable] = useState(false);
  const changeData = (data) => {
    register[data.name] = data.data;
    setRegister(register);
    console.log(register);
  };
  const handleChangeLocation = (data) => {
    setErrorLocation(false);
    register.location.strAddress = data;
    setRegister(register);
  };
  const handleChangeOriginPrice = (evt) => {
    const value = evt.target.value;
    changeData({ name: "originPrice", data: +value });
    if (value === "" || value == 0) {
      setErrorPrice(true);
    } else {
      setErrorPrice(false);
    }
  };
  const handleChangeDeliveryEnable = (evt) => {
    changeData({ name: "deliveryEnable", data: evt.target.checked });
    setDeliveryEnable(evt.target.checked);
  };
  const handleChangeLimitEnable = (evt) => {
    changeData({ name: "limitEnable", data: evt.target.checked });
    setLimitEnable(evt.target.checked);
  };
  const handleChangeDeliveryRadius = (evt) => {
    changeData({ name: "deliveryRadius", data: +evt.target.value });
  };
  const handleChangeDeliveryRadiusFree = (evt) => {
    changeData({ name: "deliveryRadiusFree", data: +evt.target.value });
  };
  const handleChangeDeliveryFee = (evt) => {
    changeData({ name: "deliveryFee", data: +evt.target.value });
  };
  const handleChangeLimitDistance = (evt) => {
    changeData({ name: "limitDistance", data: +evt.target.value });
  };
  const handleChangeOutLimitFee = (evt) => {
    changeData({ name: "outLimitFee", data: +evt.target.value });
  };
  const handleSubmit = () => {
    let error = false;
    if (
      register.location.strAddress == null ||
      register.location.strAddress == ""
    ) {
      setErrorLocation(true);
      error = true;
    }
    if (errorPrice || error) {
      return;
    } else {
      if (register.bikeType) {
        vehicleApi.updateBike(register).then(() => {
          props.history.push("/myvehicles");
        });
      } else {
        vehicleApi.updateCar(register).then(() => {
          props.history.push("/myvehicles");
        });
      }
    }
  };
  useEffect(() => {
    vehicleApi.getVehicle({ id: param.id }).then((res) => {
      setRegister(res.data);
      setDeliveryEnable(res.data.deliveryEnable);
      setLimitEnable(res.data.limitEnable);
      setStatus("idle");
    });
  }, []);
  return (
    <>
      <div id="nav-control">
        <ul>
          <li>
            <Link to="/myvehicles">
              <span>
                <i>
                  <AiFillCar />
                </i>
                <span>Danh s??ch xe</span>
              </span>
            </Link>
          </li>
          <li>
            <Link to="/registermode" className="border-left">
              <span style={{ color: "#00a54f" }}>
                <i>
                  <AiOutlinePlusCircle />
                </i>
                <span>????ng k?? xe</span>
              </span>
            </Link>
          </li>
          <li>
            <Link to="/mywallet" className="border-left">
              <span>
                <i>
                  <BiWallet />
                </i>
                <span>
                  S??? d??: <span id="line-bold">0??</span>
                </span>
              </span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="register-vehicle pt-1 page-content">
        {status === "loading" ? (
          <Loading />
        ) : (
          <div className="register-body mt-2">
            <Form className="register-form">
              <h3>??i???u ch???nh th??ng tin xe:</h3>
              <FormGroup className="my-4">
                <FormLabel>????n gi?? thu?? theo ng??y:* (VND)</FormLabel>
                <FormControl
                  type="number"
                  min={0}
                  placeholder="????n gi?? mong mu???n thu?? xe trong 1 ng??y"
                  defaultValue={register.originPrice}
                  onChange={handleChangeOriginPrice}
                />
                <FormText className="text-danger">
                  {errorPrice ? "Vui l??ng nh???p s??? ti???n mu???n cho thu??" : null}
                </FormText>
              </FormGroup>
              <FormGroup className="mb-4">
                <FormLabel>?????a ch??? xe</FormLabel>
                <Row className="address-vehicle px-3">
                  {changeLocation ? (
                    <Col className="border p-0 rounded">
                      <GoogleMaps getLocal={handleChangeLocation} />
                    </Col>
                  ) : (
                    <InputGroup className="p-0">
                      <FormControl
                        type="text"
                        readOnly
                        defaultValue={register.location.strAddress}
                      />
                      <InputGroup.Text
                        className="cursor--pointer"
                        id="basic-addon1"
                        onClick={() => {
                          setChangeLocation(true);
                          handleChangeLocation(null);
                        }}
                      >
                        <FiEdit />
                      </InputGroup.Text>
                    </InputGroup>
                  )}
                </Row>
                <FormText className="text-danger">
                  {errorLocation ? "Vui l??ng nh???p ?????a ch??? xe" : null}
                </FormText>
              </FormGroup>
              <FormGroup className="mb-4">
                <FormLabel>Giao xe t???n n??i</FormLabel>
                <FormCheck
                  className="form-switch"
                  style={{ float: "right", fontSize: "20px" }}
                  defaultChecked={register.deliveryEnable}
                  onChange={handleChangeDeliveryEnable}
                />
                {deliveryEnable ? (
                  <Row>
                    <Col lg={6}>
                      <FormText muted>
                        Qu???ng ???????ng giao xe t???i ??a: {register.deliveryRadius} km
                      </FormText>
                      <FormRange
                        min="1"
                        max="20"
                        step="1"
                        onChange={handleChangeDeliveryRadius}
                        defaultValue={register.deliveryRadius}
                      />
                    </Col>
                    <Col lg={6}>
                      <FormText muted>
                        Ph?? giao nh???n xe cho m???i km:{" "}
                        {formatMoneyK(register.deliveryFee)}
                      </FormText>
                      <FormRange
                        min="5000"
                        max="20000"
                        step="1000"
                        onChange={handleChangeDeliveryFee}
                        defaultValue={register.deliveryFee}
                      />
                    </Col>
                    <Col lg={6}>
                      <FormText muted>
                        Mi???n ph?? giao nh???n xe trong v??ng:{" "}
                        {register.deliveryRadiusFree} km
                      </FormText>
                      <FormRange
                        min="1"
                        max="20"
                        step="1"
                        onChange={handleChangeDeliveryRadiusFree}
                        defaultValue={register.deliveryRadiusFree}
                      />
                    </Col>
                  </Row>
                ) : null}
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel>Gi???i h???n s??? km</FormLabel>
                <FormCheck
                  className="form-switch"
                  style={{ float: "right", fontSize: "20px" }}
                  defaultChecked={register.limitEnable}
                  onChange={handleChangeLimitEnable}
                />
                {limitEnable ? (
                  <Row>
                    <Col lg={6}>
                      <FormText muted>
                        S??? km t???i ??a trong m???t ng??y: {register.limitDistance} km
                      </FormText>
                      <FormRange
                        min="100"
                        max="500"
                        step="25"
                        onChange={handleChangeLimitDistance}
                        defaultValue={register.limitDistance}
                      />
                    </Col>
                    <Col lg={6}>
                      <FormText muted>
                        Ph?? v?????t gi???i h???n (t??nh m???i km):{" "}
                        {formatMoneyK(register.outLimitFee)}
                      </FormText>
                      <FormRange
                        min="1000"
                        max="10000"
                        step="1000"
                        onChange={handleChangeOutLimitFee}
                        defaultValue={register.outLimitFee}
                      />
                    </Col>
                  </Row>
                ) : null}
              </FormGroup>
              <Button onClick={handleSubmit}>L??u thay ?????i</Button>
            </Form>
          </div>
        )}
      </div>
    </>
  );
}
