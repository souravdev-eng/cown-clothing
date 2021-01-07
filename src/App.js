import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { auth, createUserProfileDocument } from './firebase/firebase.util';
import { setCurrentUser } from './redux/user/user.action';

// Component import
import Header from './components/header/Header';
import HomePage from './pages/home-page/HomePage';
import ShopPage from './pages/shop-page/ShopPage';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    // "auth.onAuthStateChanged" --> this firebase method monitor user authantication state is user login or logout

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      const { setCurrentUser } = this.props;
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUp} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(App);
