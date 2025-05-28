import React from 'react';

export default class FormRegister extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			nome:'',
			email: ''
		};
	}
	
	handleChange = (event) => {
		// usar o nome do input para vincular ao estado
		const { name, value} = event.target;
		this.setState({ [name]: value});
	};
	
	handleSubmit = async (event) => {
	  event.preventDefault();

	  const { nome, email } = this.state;

	  const resposta = await fetch('http://localhost:5000/contatos', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ nome, email })
	  });

	  const resultado = await resposta.json();
	  alert('Mensagem enviada com sucesso!');
	  this.setState({ nome: '', email: ''});
   };


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Contatos</h2>

        <div>
          <label>Nome:</label><br />
          <input
            type="text"
            name="nome"
            value={this.state.nome}
            onChange={this.handleChange}
          />
        </div>

        <div>
          <label>Email:</label><br />
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </div>

        <button type="submit">Enviar</button>
      </form>
    );
  }
}