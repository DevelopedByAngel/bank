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
			routelist:[]
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
	componentDidUpdate()
	{
		if(this.state.route==='home')
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
				$('.userdiv').attr('class','userdiv');

			},0);
		})
		}

	}
	route=(route,selected = 0)=>
	{
		const updatedroute=this.state.routelist
		updatedroute.push(this.state.route)
		this.setState({routelist:updatedroute})
		this.setState({route:route})
		if(route==="login")
		{
			this.setState({user:this.state.users[selected]})
			this.state.users.splice(selected,1)// returns only removed element and updates array
		}
	}
	update=(list)=>
	{
		this.setState({users:list})
		fetch('https://basicbanksystem.herokuapp.com/user/'+this.state.user.email,{
			method:'GET',
			headers:{'Content-Type':'application/json'},
		})
		.then(res=>res.json())
		.then(r=>{

				this.setState({user:r})
			})
	}
	render()
	{
		if(this.state.routelist.length===0)
			$('.backcont').css('display', 'none')
		else
			$('.backcont').css('display','flex')
	  return (
	    <div className="App">
	    <div className="backcont" onMouseOver={()=>$('.backcont span').css({'left':'0px','width':'34px'})} onMouseLeave={()=>$('.backcont span').css({'left':'-34px','width':'0px'})}><div className="back" onClick={()=>this.setState({route:this.state.routelist.splice(-1,1)[0]})}></div><span>Back</span></div>

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
		    ?<Transaction user={this.state.user} userList={this.state.users} route={this.route} update={this.update}/>
		    :
		    <div className="View">
			    <h1 className="heading">{this.state.user.name}'s Transactions</h1>
			    <div className="MainList">
			    <table>
			    <tr className="viewtrn">
			    <th className="det">From</th>
			    <th className="det">To</th>
			    <th className="det">Amount</th>
			    </tr>
		    <View user={this.state.user} trn={this.state.trn}/>
		    </table>
		    </div>
		    </div>
		}
	    </div>
	  )
	}
}

export default App;
