import React,{Component} from 'react';
import '../stylesheets/View.css'

class View extends Component 
{ 
	constructor(props)
	{
		super(props);
		this.state = {
			trn:[]		
		}
	}
	componentDidMount()
	{
		console.log(this.props.user.email)
		if(this.state.trn.length===0)
		{
		fetch('https://basicbanksystem.herokuapp.com/'+this.props.user.email,{
			method:'GET',
			headers:{'Content-Type':'application/json'},
		})
		.then(res=>res.json())
		.then(r=>{
			console.log(r)
			this.setState({trn:r})
		})
	}
	}
	render()
	{
		console.log(this.state.trn)
	  return (
	  	this.state.trn.map(t=>
	  	{
	  		return(
	  			<tr className="viewtrn" key={t.id}>
	  			<td className="from det">{t.frome}</td><td className="to det">{t.toe}</td><td className="amt det">{t.amt}</td>
	  			</tr>
	  			)
	  	})
	  )
	}
}

export default View;
