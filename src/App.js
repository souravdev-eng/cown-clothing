import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
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
          <Route
            exact
            render={() =>
              this.props.currentUser ? <Redirect to='/' /> : <SignInAndSignUp />
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});
//*----------------------------------- mapDispatchToProps in explain notes-----------------------------
// 1) "mapDispatchToProps"--> return a funcation which call dispatch.
// 2) And dispatch return a object.
// 3) Inside this object we call our props which is creating into our action file. and this props hold a    obect that's is usr.
// 4) User call dispach and here we call whole object and passdown payload property.

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
