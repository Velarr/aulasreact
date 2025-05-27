import React from 'react';
export default class FormRegister extends React.Component {

    constructor(props){
        super(props);
        this.state={
            nome:'',
            email:'',
        };
    }
    handleChange = (event)=>{
        //Usar o nome do input para vincular ao estado
        const {name,value} = event.target;
        this.setState({[name]:value});
    }
    handleSubmit = async (event)=>{
        event.preventDefault();
        const {nome,email} = this.state;
        const resposta = await fetch('http://localhost:5000/contatos',{
            method:'POST',
            headers:{'Contect-Type':'application/json'},
            body:JSON.stringify({nome,email})
        });
        const result = await resposta.json();
        this.setState({nome:"",email:""});
        alert("Inserido com sucesso")
    }
    render() {

            return (
                <form onSubmit={this.handleSubmit}>
                    <h2>Formulario de contactos:</h2>
                    <div>
                        <label>Nome:</label><br />
                        <input type="text" onChange={this.handleChange} name='nome' value={this.state.nome}/>
                    </div>
                    <div>
                        <label>Email:</label><br />
                        <input type="email" onChange={this.handleChange} name='email' value={this.state.email}/>
                    </div>
                    <button type="submit">Inserir contato</button>
                </form>
            );
        }
    }
