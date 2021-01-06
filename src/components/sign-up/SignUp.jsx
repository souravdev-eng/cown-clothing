import React from 'react';
import CustomButton from '../custom-button/CustomButton';
import FormInput from '../form-input/FormInput';
import { auth, createUserProfileDocument } from '../../firebase/firebase.util';
import './sign-up.style.scss';

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: '',
      email: '',
      password: '',
      passwordConforim: '',
    };
  }

  handelSubmit = async (e) => {
    e.preventDefault();
    const { displayName, email, password, passwordConforim } = this.state;
    if (password !== passwordConforim) {
      alert("Password don't match ");
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await createUserProfileDocument(user, { displayName });
      this.setState({
        displayName: '',
        email: '',
        password: '',
        passwordConforim: '',
      });
    } catch (error) {
      console.error(error);
    }
  };

  handelChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, passwordConforim } = this.state;
    return (
      <div className='sign-up'>
        <h2 className='title'>I don not have a account</h2>
        <span>Sign up with your email and password</span>

        <form className='sign-up-form' onSubmit={this.handelSubmit}>
          <FormInput
            type='text'
            name='displayName'
            value={displayName}
            onChange={this.handelChange}
            label='Display name'
            required
          />
          <FormInput
            type='email'
            name='email'
            value={email}
            onChange={this.handelChange}
            label='Email'
            required
          />
          <FormInput
            type='password'
            name='password'
            value={password}
            onChange={this.handelChange}
            label='Password'
            required
          />
          <FormInput
            type='password'
            name='passwordConforim'
            value={passwordConforim}
            onChange={this.handelChange}
            label='Password Conforim'
            required
          />
          <CustomButton type='submit'>Sign Up</CustomButton>
        </form>
      </div>
    );
  }
}

export default SignUp;
