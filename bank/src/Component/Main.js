import React from 'react';
import '../stylesheets/Main.css'
const Main=(props)=>
{
	var {userList,route}=props;
	if(userList.length===0)
		userList=[
	{name:'...'},
	{name:'...'},
	{name:'...'},
	{name:'...'},
	{name:'...'},
	{name:'...'},
	{name:'...'},
	{name:'...'},
	{name:'...'},
	{name:'...'},
	{name:'...'},
	{name:'...'},
	]
	return (
			userList.map((user,i) =>
			{
				return	<div key={i} className="userdiv nocontent" onClick={()=>route("login",i)}>{user.name}</div>
			})
	  
	    );

}

export default Main;