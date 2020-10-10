import React from 'react';
import '../stylesheets/Login.css'
const Login=(props)=>
{
	const {user,route}=props;
	return (
		<div className="Login">
			<div className="left">
			</div>
			<img alt="" src={require("../assets/logo.PNG")} className="center" title="Open Bank" />
			<div className="right">
				<div className="intro info">Welcome Home,</div>
				<div className="userName info">{user.name}</div>
				<div className="infodiv">
			  	<div className="userEmail info"><span>Email: </span><span><a href={"mailto:"+user.email}>{user.email}</a></span></div>
			  	<div className="userBalance info"><span>Available Balance:</span><span>{user.balance}</span></div>
			  	<div className="userTrn info"><span>Number of Transactions done: </span><span>{user.nooftranscations}</span></div>
	  			</div>
	  			<button className="transfer button" onClick={()=>route("transfer")}>Transfer</button>
	  			<button className="view button" onClick={()=>route("view")}>View Transactions</button>

	  		</div>
	  	</div>
	    );

}

export default Login;