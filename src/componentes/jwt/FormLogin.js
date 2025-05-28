import React from 'react';

export default class FormLogin extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			email:'',
			pass: '',
			mensagem: '',
			token: null
		};
	}
	
	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value});
	};
	
	handleSubmit = async (event) => {
	  event.preventDefault();

	  const { email, pass } = this.state;

	  const res = await fetch('http://localhost:4000/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, pass })
	  });

	  const data = await res.json();
	  if(res.ok){
		  this.setState({ token: data.token, mensagem: 'Login sucesso!'});
	  }else{
		   this.setState({mensagem: data.erro});
	  }
   };


  render() {
	const {email,pass,mensagem,token} = this.state;
    return (
	<div>
		<h2>Login:</h2>
      <form onSubmit={this.handleSubmit}>
         <div>
          <label>Email:</label><br />
          <input
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
			required
          />
        </div>

        <div>
          <input
            type="passsword"
            name="pass"
            value={pass}
			placeholder="Digita a pass"
            onChange={this.handleChange}
			required
          />
        </div>

        <button type="submit">Enviar</button>
      </form>
	  <p>{mensagem}</p>
	  </div>
    );
  }
}