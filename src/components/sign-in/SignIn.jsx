import React, { Component } from 'react';
import CustomButton from '../custom-button/CustomButton';
import FormInput from '../form-input/FormInput';
import { signInWithGoogle } from '../../firebase/firebase.util';
import './sign-in.style.scss';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handelSubmit = (e) => {
    e.preventDefault();
    this.setState({ email: '', password: '' });
  };

  handelChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className='sign-in'>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={this.handelSubmit}>
          <FormInput
            type='email'
            name='email'
            value={this.state.email}
            handelChange={this.handelChange}
            label='email'
            required
          />
          <FormInput
            type='password'
            name='password'
            value={this.state.password}
            handelChange={this.handelChange}
            label='password'
            required
          />
          <div className='buttons'>
            <CustomButton type='submit'>Sign In</CustomButton>
            <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
              sign In With Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
