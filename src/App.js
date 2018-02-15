import React from 'react';
import Loading from './components/Loading';
import firebase from 'firebase';
import Databasetest from './components/Databasetest';
import Timer from './components/Timer';
import Counter from './components/Counter';
import Login from './pages/Login';
import Graphic from './components/Graphic';
import User from './pages/User';
import {reactLocalStorage} from 'reactjs-localstorage';

reactLocalStorage.set('var', true);
reactLocalStorage.get('var', true);
reactLocalStorage.setObject('var', {'test': 'test'});
reactLocalStorage.getObject('var');

class App extends React.Component {
	constructor (props) {
		super (props)

		this.handleLogout = this.handleLogout.bind(this);

		this.state = {
			user: null,
			logged: false,
			projects: []

		}
	}

	componentWillMount() {
		firebase.auth().onAuthStateChanged(user => {
			this.setState({
				user: user
			});
			console.log(`El user es ${this.state.user}`);
		});
		firebase.database().ref('projects').on('child_added', snapshot => {
			this.setState ({
				projects: this.state.projects.concat(snapshot.val())
			});
			console.log('this.state.projects');
		})
	}

	setUser() {
		this.setState({
			logged:true
		});
	}
	handleLogout () {
		firebase.auth().signOut()
		.then(result => console.log(`${result.user.email} ha salido`))
		.catch(error => console.log(`Error ${error.code}:${error.message}`));
	}

  render() {
		if(this.state.user) {

			return (
      <div className="App">
				<p>Bienvenido/a {this.state.user.displayName}</p>
				<img className="image--user" src={this.state.user.photoURL} alt={this.state.user.displayName} />
				<button onClick={this.handleLogout}>Salir</button>
      	{/* <Loading /> */}
				{/* <Login
					// renderLoginButton={this.renderLoginButton()}
					handleAuthGoogle = {this.handleAuthGoogle}
				/> */}
				<Timer />
				<User projects={this.state.projects}
						  user={this.state.user}/>
				<Counter
					user={this.state.user}
				/>
				{/* <input type="date"></input> */}
        <Databasetest />
				<input className="calendar" type="date" value="today"></input>
				<Graphic />
      </div>
			);
			}
		console.log('Loguéate');
		return (<Login
			onLoginSuccess = {this.setUser}
			handleAuthGoogle = {this.handleAuthGoogle}/>)
  }
}

export default App;
