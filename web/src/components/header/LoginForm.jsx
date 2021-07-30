import UserApi from "api/userApi";
import { login } from "app/slice/userSlice";
import store from "app/store";
import { FACEBOOK_AUTH_URL, GOOGLE_AUTH_URL } from "constants/index";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Loading from "components/layout/Loading";
import React, { useState } from "react";
import { Button, Form as BForm, Modal } from "react-bootstrap";
import { AiOutlineGoogle } from "react-icons/ai";
import { GrFacebookOption } from "react-icons/gr";
// import { useDispatch } from "react-redux";
// import Cookies from "universal-cookie";
import * as Yup from "yup";

const LoginForm = (props) => {
  const handleClose = props.handleClose;
  const handleShowSignup = props.handleShowSignup;
  const [status, setStatus] = useState(0);
  const redirect = () => {
    localStorage.setItem("_pathname", window.location.pathname);
    localStorage.setItem("_search", window.location.search);
  };
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string().required("Đây là trường bắt buộc"),
        password: Yup.string().required("Đây là trường bắt buộc"),
      })}
      onSubmit={(values) => {
        setStatus(1);
        UserApi.login(values)
          .then((res) => {
            store.dispatch(login(res));
            handleClose();
            setStatus(0);
          })
          .catch((res) => {
            console.log(res);
            setStatus(-1);
          });
      }}
    >
      <Modal
        show={true}
        onHide={handleClose}
        fullscreen="sm-down"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Đăng nhập</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {status === 1 ? (
              <div className="position-relative">
                <Loading type="inline" />
              </div>
            ) : (
              <p className="text-danger text-center">
                {status === -1 ? "Sai tên đăng nhập hoặc mật khẩu" : null}
              </p>
            )}
            <BForm.Group className="mb-3" controlId="email">
              <BForm.Label>Tên đăng nhập*:</BForm.Label>
              <Field name="email">
                {({ field }) => (
                  <BForm.Control
                    type="text"
                    {...field}
                    placeholder="Nhập email của bạn"
                  />
                )}
              </Field>
              <BForm.Text className="text-danger">
                <ErrorMessage name="email" />
              </BForm.Text>
            </BForm.Group>
            <BForm.Group className="mb-3" controlId="password">
              <BForm.Label>Mật khẩu*:</BForm.Label>
              <Field name="password">
                {({ field }) => (
                  <BForm.Control
                    type="password"
                    {...field}
                    placeholder="Nhập mật khẩu"
                  />
                )}
              </Field>
              <BForm.Text className="text-danger">
                <ErrorMessage name="password" />
              </BForm.Text>
            </BForm.Group>
            <BForm.Text className="text-muted">
              Bạn chưa là thành viên?{" "}
              <span
                className="link-primary text-decoration-underline cursor--pointer"
                onClick={() => {
                  handleClose();
                  handleShowSignup();
                }}
              >
                Hãy đăng ký ngay!
              </span>
            </BForm.Text>
            <Button variant="primary" className="w-100 my-3" type="submit">
              Đăng nhập
            </Button>
            <hr />
            <BForm.Text className="text-muted text-center d-block mb-3">
              Hoặc đăng nhập bằng tài khoản
            </BForm.Text>
            <div className="d-flex gap-2">
              <Button
                href={FACEBOOK_AUTH_URL}
                className="w-50"
                onClick={redirect}
                style={{ backgroundColor: "#285091" }}
              >
                <GrFacebookOption className="icon" />
                Facebook
              </Button>
              <Button
                href={GOOGLE_AUTH_URL}
                variant="danger"
                className="w-50 text-white"
                onClick={redirect}
              >
                <AiOutlineGoogle className="icon" /> Google
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Formik>
  );
};
export default React.memo(LoginForm);
