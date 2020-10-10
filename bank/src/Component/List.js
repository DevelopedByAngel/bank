import React from 'react';
import '../stylesheets/Main.css'
const List=(props)=>
{
	const {userList,select}=props;
	return (
			userList.map((user,i) =>
			{
				return	<div key={i} className="userdiv" onClick={()=>select(user)}>{user.name}</div>
			})
	  
	    );

}

export default List;