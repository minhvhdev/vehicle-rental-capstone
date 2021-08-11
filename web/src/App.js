
import Footer from 'components/layout/Footer';
import Loading from 'components/layout/Loading';
import AboutUsPage from 'pages/AboutUsPage';
import AccountPage from 'pages/AccountPage';
import BlogPage from 'pages/BlogPage';
import FindPage from 'pages/FindPage';
import HomePage from 'pages/HomePage';
import MyAddressPage from 'pages/MyAddressPage';
import MyCardPage from 'pages/MyCardPage';
import MyFavsPage from 'pages/MyFavsPage';
import MyTripsPage from 'pages/MyTripsPage';
import PromoPage from 'pages/PromoPage';
// import ShareCodePage from 'pages/ShareCodePage';
import SignUpPage from 'pages/SignUpPage';
import React, { Suspense } from 'react';
import { Switch } from 'react-router-dom';
import './App.scss';
import NotFound from './components/layout/NotFound';
import ReactNotification from "react-notifications-component";
import OAuth2RedirectHandler from 'pages/OAuth2RedirectHandlerPage';
import { useSelector } from 'react-redux';
import AdminRoute from 'components/AdminRoute';
import UserRoute from 'components/UserRoute';
import AdminPage from 'pages/AdminPage';
import { Route } from 'react-router-dom';
import Header from 'components/header/Header';
import CarPage from 'pages/CarPage';
import BikePage from 'pages/BikePage';
import WithDriverPage from 'pages/WithDriverPage';
import MyVehiclesPage from 'pages/MyVehiclesPage';
import RegisterVehiclePage from 'pages/RegisterVehiclePage';
import MyWalltePage from 'pages/MyWalltePage';
import HowItWorkPage from 'pages/HowItWorkPage';


function App(props) {
  // @ts-ignore
  const isAdmin = useSelector(state => state.isAdmin).status;
  return (
    <div className="App">
      {isAdmin ? null : <Header />}
      <ReactNotification className="fs--1" />
      <Suspense fallback={<Loading />}>
        <Switch>
          <UserRoute exact path="/" component={HomePage} />
          <UserRoute path="/find" component={FindPage} />
          <UserRoute path="/signup" component={SignUpPage} />
          <UserRoute path="/howitwork" component={HowItWorkPage} />
          <UserRoute role={true} path="/account" component={AccountPage} />
          <UserRoute role={true} path="/myfavs" component={MyFavsPage} />
          <UserRoute role={true} path="/mytrips" component={MyTripsPage} />
          <UserRoute role={true} path="/myaddress" component={MyAddressPage} />
          <UserRoute role={true} path="/mycard" component={MyCardPage} />
          <UserRoute role={true} path="/promo" component={PromoPage} />
          <UserRoute path="/aboutus" component={AboutUsPage} />
          <UserRoute path="/oauth2/redirect" component={OAuth2RedirectHandler}></UserRoute>
          <UserRoute path="/blog" component={BlogPage} />
          <UserRoute path="/find" component={FindPage} />
          <UserRoute path="/car" component={CarPage} />
          <UserRoute path="/bike" component={BikePage} />
          <UserRoute path="/withdriver" component={WithDriverPage} />
          <UserRoute path="/myvehicles" component={MyVehiclesPage} />
          <UserRoute path="/registermode" component={RegisterVehiclePage} />
          <UserRoute path="/mywallet" component={MyWalltePage} />
          <AdminRoute exact path="/admin" role="admin" component={AdminPage} />
          <UserRoute component={NotFound} />
          {/* <Route path="/admin" exact component={AdminPage} /> */}
        </Switch>
      </Suspense>
      {isAdmin ? null : <Footer />}
    </div>
  );
}

export default App;
