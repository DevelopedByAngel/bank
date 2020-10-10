import React,{Component} from 'react';
import $ from 'jquery';

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
			setTimeout(()=>
			{
				this.setState({trn:r})
			},0);
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
	  			<div className="viewtrn" key={t.id}>
	  			<div className="from det">{t.frome}</div><div className="to det">{t.toe}</div><div className="amt det">{t.amt}</div>
	  			</div>
	  			)
	  	})
	  )
	}
}

export default View;
