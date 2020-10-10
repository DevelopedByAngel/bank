import React,{Component} from 'react';
import List from './List';
import '../stylesheets/Transaction.css';
import $ from 'jquery'
class Transaction extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			user:this.props.user,
			amt:0,
			to:{}
		}
	}
	transactionStart=(to)=>
	{
		this.setState({to:to});
		$('.Amount').css('display','block');
		console.log(this.props.user)
		console.log(to)
		console.log(this.state.amt)

	}

	transfer=(from,to,amt)=>
	{
		fetch('https://basicbanksystem.herokuapp.com/',{
			method:'GET',
			headers:{'Content-Type':'application/json'},
		})
		.then(res=>res.json())
		.then(r=>{
			this.setState({users:r})
			this.setState({route:'home'})
		})
	}
	render()
	{
		console.log(this.props.user.name)
		const {user,amt,to}=this.state;
	return (
			<div>
				<div className="Main">
				<h1 className="heading">Transfer Amount to</h1>
	   			 <div className="MainList">
				<List select={this.transactionStart} userList={this.props.userList}/>
				</div>
				</div>
		  		<div className="Amount">
		  		<span className="x" onClick={()=>$('.Amount').css('display', 'none')}>x</span>
			  		<div>
			  			<div>
			  			<p>{user.name}</p>
			  			</div>
			  			<div>
			  			<p>Email</p>
			  			<p>{user.email}</p>
			  			</div>
			  			<div>
			  			<p>Balance</p>
			  			<p>{user.balance}</p>
			  			</div>
			  			<div>
			  			<p>No. of transactions</p>
			  			<p>{user.nooftranscations}</p>
			  			</div>
			  		</div>
			  		<input type="number" onChange={(e)=>this.setState({amt:e.target.value})}/>
			  		
		  		</div>
	  		</div>
	    );
	}

}

export default Transaction;