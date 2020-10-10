import React,{Component} from 'react';
import './App.css';
import Main from './Component/Main';
import Login from './Component/Login';
import './stylesheets/Main.css'
import Transaction from './Component/Transaction';
import View from './Component/View';
import $ from 'jquery';

class App extends Component 
{ 
	constructor(props)
	{
		super(props);
		this.state = {
			user:
			{
				name:'none',
				email:'',
				balance:0,
				nooftranscations:0
			},
			users:[],
			route:'home',
		}
	}
	componentDidMount()
	{
		if(this.state.users.length===0)
		{
		fetch('https://basicbanksystem.herokuapp.com/',{
			method:'GET',
			headers:{'Content-Type':'application/json'},
		})
		.then(res=>res.json())
		.then(r=>{
			setTimeout(()=>
			{
				this.setState({users:r})
				this.setState({route:'home'})
				$('.userdiv').attr('class','userdiv');

			},0);
		})
	}
	}
	route=(route,selected = 0)=>
	{
		this.setState({route:route})
		if(route==="login")
		{
			this.setState({user:this.state.users[selected]})
			this.state.users.splice(selected,1)// returns only removed element and updates array
		}
	}
	render()
	{
		console.log(this.state.route)
	  return (
	    <div className="App">
	    {
	    (this.state.route==='home')
	    ?
	    <div className="Main">
	    <h1 className="heading">User List</h1>
	    <div className="MainList">
	    <Main userList={this.state.users} route={this.route}/>
	    </div>
	    </div>
	    :(this.state.route==='login')
	    ?<Login user={this.state.user} route={this.route}/>
	    :(this.state.route==='transfer')
	    ?<Transaction user={this.state.user} userList={this.state.users} route={this.route}/>
	    :<View user={this.state.user} trn={this.state.trn}/>
	}
	    </div>
	  )
	}
}

export default App;
