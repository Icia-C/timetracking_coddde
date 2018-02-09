import React from 'react';
import firebase from 'firebase';

class Login extends React.Component {
	constructor (props) {
		super (props)
		this.state = {
			email: '',
			password: ''
		}
		this.handleAuthGoogle = this.handleAuthGoogle.bind(this);
		this.handleAuthEmail = this.handleAuthEmail.bind(this);
	}

	handleAuthGoogle () {
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(provider)
			.then(result => console.log(result, 'ha iniciado sesión'))
			.catch(error => console.log(`Error ${error.code}:${error.message}`));
	}

	handleAuthEmail () {
		const email = this.state.email;
		const password = this.state.password;
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(result => console.log(result, 'ha iniciado sesión'))
		  .catch(error => console.log(`Error ${error.code}:${error.message}`));
			console.log(email, password)
	}

	handleInputChange(input, value) {
		this.setState({
			[input]: value
		});
	}

  render() {
    return (
      <div className="Form">
        <header className="Form-header">
          <h1 className="Form-title">Time tracker</h1>
        </header>
				<form className="login__form">
					<input name="onLoginSuccess" value={this.state.email} className="login__input" type="text" placeholder="E-mail" ref="email" onChange={e => this.handleInputChange('email', e.target.value)}/>
					<input value={this.state.password} className="login__input" type="password"  placeholder="Password" ref="password" onChange={e => this.handleInputChange('password', e.target.value)}/>
					<button className="login__button" type="button" onClick={this.handleAuthEmail}>Log-in</button>

					<button className="login__button" type="button" onClick={this.handleAuthGoogle}>Log in con Google
					</button>
				</form>
      </div>
    );
  }
}

export default Login;