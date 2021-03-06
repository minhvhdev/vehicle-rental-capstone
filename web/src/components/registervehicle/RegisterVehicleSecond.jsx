import React from "react";
import { AiFillCar, AiOutlinePlusCircle, AiOutlineRight } from "react-icons/ai";
import { BiWallet } from "react-icons/bi";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  FormCheck,
  FormText,
} from "react-bootstrap";
import FormRange from "react-bootstrap/esm/FormRange";
import { FaMap } from "react-icons/fa";
import Address from "./Address";
import { useSelector } from "react-redux";
import store from "app/store";
import { changeData, changeLocation, changePrice } from "app/slice/registerSlice";
import { formatMoneyK } from "lib/Helper";
import GoogleMaps from "components/homepage/AutoComplete/AutoComplete";
import { DistanceMatrixService } from "@react-google-maps/api";

export default function RegisterVehicleSecond() {
  const [isShowAddress, setIsShowAddress] = React.useState(false);
  const register = useSelector((state) => state.register);
  const handleChangeLocation = (data) => {
    store.dispatch(changeLocation({ id: 0, strAddress: data }));
  };
  const handleChangeOriginPrice = (evt) => {
    store.dispatch(changePrice(evt.target.value));
  };
  const handleChangeDeliveryEnable = (evt) => {
    store.dispatch(
      changeData({ name: "deliveryEnable", data: evt.target.checked })
    );
  };
  const handleChangeLimitEnable = (evt) => {
    store.dispatch(
      changeData({ name: "limitEnable", data: evt.target.checked })
    );
  };
  const handleChangeDeliveryRadius = (evt) => {
    store.dispatch(
      changeData({ name: "deliveryRadius", data: +evt.target.value })
    );
  };
  const handleChangeDeliveryRadiusFree = (evt) => {
    store.dispatch(
      changeData({ name: "deliveryRadiusFree", data: +evt.target.value })
    );
  };
  const handleChangeDeliveryFee = (evt) => {
    store.dispatch(
      changeData({ name: "deliveryFee", data: +evt.target.value })
    );
  };
  const handleChangeLimitDistance = (evt) => {
    store.dispatch(
      changeData({ name: "limitDistance", data: +evt.target.value })
    );
  };
  const handleChangeOutLimitFee = (evt) => {
    store.dispatch(
      changeData({ name: "outLimitFee", data: +evt.target.value })
    );
  };
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
      <div className="register-vehicle">
        <div className="register-heading">
          <Row>
            <Col lg={4} className="register-heading-tab">
              <div className="tab-number">1</div>
              <p>Th??ng tin</p>
              <i className="icon-after">
                <AiOutlineRight />
              </i>
            </Col>
            <Col lg={4} className="register-heading-tab">
              <div
                className="tab-number"
                style={{ backgroundColor: "#00A54F" }}
              >
                2
              </div>
              <p>Cho thu??</p>
              <i className="icon-after">
                <AiOutlineRight />
              </i>
            </Col>
            <Col lg={4} className="register-heading-tab">
              <div className="tab-number">3</div>
              <p>H??nh ???nh</p>
            </Col>
          </Row>
        </div>
        <div className="register-body mt-2">
          <Form className="register-form">
            <FormGroup className="mb-4">
              <FormLabel>????n gi?? thu?? theo ng??y:* (VND)</FormLabel>
              <FormControl
                type="number"
                placeholder="????n gi?? mong mu???n thu?? xe trong 1 ng??y"
                className="mt-3"
                defaultValue={register.data.originPrice}
                onChange={handleChangeOriginPrice}
              />
              <FormText className="text-danger">
                {register.error.filter((item) => {
                  return item === "originPrice";
                }).length
                  ? "Vui l??ng nh???p s??? ti???n mu???n cho thu??"
                  : null}
              </FormText>
            </FormGroup>
            <FormGroup className="mb-3">
              <FormLabel>?????a ch??? xe</FormLabel>
              <Row className="address-vehicle p-3">
                <Col className="border p-0 rounded">
                  <GoogleMaps getLocal={handleChangeLocation} />
                </Col>
              </Row>
              <FormText className="text-danger">
                {register.error.filter((item) => {
                  return item === "location";
                }).length
                  ? "Vui l??ng nh???p ?????a ch??? xe"
                  : null}
              </FormText>
            </FormGroup>
            <FormGroup className="mb-3">
              <FormLabel>Giao xe t???n n??i</FormLabel>
              <FormCheck
                className="form-switch"
                style={{ float: "right", fontSize: "20px" }}
                defaultChecked={register.data.deliveryEnable}
                onChange={handleChangeDeliveryEnable}
              />
              {register.data.deliveryEnable ? (
                <Row>
                  <Col lg={6}>
                    <FormText muted>
                      Qu???ng ???????ng giao xe t???i ??a: {register.data.deliveryRadius}{" "}
                      km
                    </FormText>
                    <FormRange
                      min="1"
                      max="20"
                      step="1"
                      onChange={handleChangeDeliveryRadius}
                      defaultValue={register.data.deliveryRadius}
                    />
                  </Col>
                  <Col lg={6}>
                    <FormText muted>
                      Ph?? giao nh???n xe cho m???i km:{" "}
                      {formatMoneyK(register.data.deliveryFee)}
                    </FormText>
                    <FormRange
                      min="5000"
                      max="20000"
                      step="1000"
                      onChange={handleChangeDeliveryFee}
                      defaultValue={register.data.deliveryFee}
                    />
                  </Col>
                  <Col lg={6}>
                    <FormText muted>
                      Mi???n ph?? giao nh???n xe trong v??ng:{" "}
                      {register.data.deliveryRadiusFree} km
                    </FormText>
                    <FormRange
                      min="1"
                      max="20"
                      step="1"
                      onChange={handleChangeDeliveryRadiusFree}
                      defaultValue={register.data.deliveryRadiusFree}
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
                defaultChecked={register.data.limitEnable}
                onChange={handleChangeLimitEnable}
              />
              {register.data.limitEnable ? (
                <Row>
                  <Col lg={6}>
                    <FormText muted>
                      S??? km t???i ??a trong m???t ng??y: {register.data.limitDistance}{" "}
                      km
                    </FormText>
                    <FormRange
                      min="100"
                      max="500"
                      step="25"
                      onChange={handleChangeLimitDistance}
                      defaultValue={register.data.limitDistance}
                    />
                  </Col>
                  <Col lg={6}>
                    <FormText muted>
                      Ph?? v?????t gi???i h???n (t??nh m???i km):{" "}
                      {formatMoneyK(register.data.outLimitFee)}
                    </FormText>
                    <FormRange
                      min="1000"
                      max="10000"
                      step="1000"
                      onChange={handleChangeOutLimitFee}
                      defaultValue={register.data.outLimitFee}
                    />
                  </Col>
                </Row>
              ) : null}
            </FormGroup>
          </Form>
        </div>
      </div>
    </>
  );
}
