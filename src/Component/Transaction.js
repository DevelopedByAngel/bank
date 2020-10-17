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
			to:{},
			list:this.props.userList
		}
	}
	transactionStart=(to)=>
	{
		this.setState({to:to});
		this.setState({amt:0})
		$('.Amountcontainer').css({'top':'0%','background':'rgba(0,0,0,0.5)'});
		$('.x').css('top','50%')
		console.log(this.props.user)
		console.log(to)
		console.log(this.state.amt)

	}

	transfer=(from,to,amt)=>
	{
		if(this.state.amt>0)
		{
			    
			$('.input').css('display','none');
			$('.loader').css('display','block');
			fetch('https://basicbanksystem.herokuapp.com/transaction/'+from+'/'+to+'/'+amt,{
				method:'GET',
				headers:{'Content-Type':'application/json'},
			})
			.then(res=>res.json())
			.then(r=>{
				console.log(r)
				this.props.update(r)
				$('.input').css('display','none');
				$('.loader').css('display','block');
				setTimeout(()=>
				{
					$('.loader').css('display','none');
					$('.tick').css({'width': '39px','height': '100px','border-bottom':' 5px solid green','border-right': '5px solid red','transform': 'rotateZ(45deg)'})
				},6000)
				setTimeout(()=>
				{

					this.props.route('login',this.props.userList.findIndex(x =>  x.email===this.props.user.email))
				},7000);
				})
			.catch(err=>alert('Error occured.Retry'))
		}
		else
		{
			alert('Please transact a valid amount (not 0 or negative)')
		}

		
	}
	close=()=>
	{
		if($('.x').css('z-index')==15)
		{
			$('.Amountcontainer').css({'top':'100%','background':'rgba(0,0,0,0)'});
		}
		else
		{
			$('.Amountcontainer').css({'top':'-100%','background':'rgba(0,0,0,0)'});
		}
		$('.x').css('top','0%');
	}
	render()
	{
		
		const index=this.props.userList.findIndex(x =>  x.email===this.props.user.email)
		if(index>-1)
		this.state.list.splice(index,1)
		console.log(this.props.user.name)
		const {user,to}=this.state;
	return (
			<div>
				<div className="Main">
				<h1 className="heading">Transfer Amount to</h1>
	   			 <div className="MainList">
				<List select={this.transactionStart} userList={this.state.list}/>
				</div>
				</div>
				<div className="Amountcontainer">
			  		
			  		<span className="x" onClick={()=>this.close()}>x</span>
			  		<div className="Amount">
				  		<div className="userAmount">
				  			<div className="amountdet useramt amtname">
				  			<p>{user.name}</p>
				  			</div>
				  			<div className="amountdet useramt amtemail">
				  			<p>Email</p>
				  			<p>{user.email}</p>
				  			</div>
				  			<div className="amountdet useramt amtbalance">
				  			<p>Balance</p>
				  			<p>{user.balance}</p>
				  			</div>
				  			<div className="amountdet useramtamttrn">
				  			<p>No. of transactions</p>
				  			<p>{user.nooftranscations}</p>
				  			</div>
				  		</div>
				  		
				  		<div className="toAmount">
				  			<div className="amountdet  amtname">
				  			<p>{to.name}</p>
				  			</div>
				  			<div className="amountdet  amtemail">
				  			<p>Email</p>
				  			<p>{to.email}</p>
				  			</div>
				  			<div className="amountdet  amtbalance">
				  			<p>Balance</p>
				  			<p>{to.balance}</p>
				  			</div>
				  			<div className="amountdet amttrn">
				  			<p>No. of transactions</p>
				  			<p>{to.nooftranscations}</p>
				  			</div>
				  		</div>

				 		  		
			  		</div>
			  		<div className="input">
			  		<img alt="bunny" src={require("../assets/bunny.png")}/>
			  		<input type="number" placeholder="Enter Amount" min="0" onChange={(e)=>this.setState({amt:e.target.value})}></input>
			  		<span onClick={()=>this.transfer(this.state.user.email,this.state.to.email,this.state.amt)}>➤</span>
			  		</div>
			  		<div className="loadercontainer">
			  		<div className="loader">
			  		<p className="load"></p>
					<p className="load"></p>
					<p className="load"></p>
					<p className="load"></p>
					<p className="load"></p>
					<p className="load"></p>
					<p className="load"></p>
					<div className="shade"></div>
			  		</div>
			  		</div>

	  		</div>
	  		</div>

	    );
	}

}

export default Transaction;