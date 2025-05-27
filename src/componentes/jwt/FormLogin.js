import React from 'react';
export default class FormLogin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pass: '',
            mensagem: '',
            token: null,
        };
    }
    handleChange = (e) => {
        //Usar o nome do input para vincular ao estado
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const {email, pass} = this.state;

        const res = await fetch('http://localhost:4000/contatos', {
            method: 'POST',
            headers: { 'Contect-Type': 'application/json' },
            body: JSON.stringify({ email, pass })
        });

        const data = await res.json();
        if (res.ok) {
            this.setState({ token: data.token, mensagem: 'Login sucesso!' });
        } else {
            this.setState({ mensagem: data.erro });
        }
    };

    render() {
        const { email, pass, mensagem, token } = this.state;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2>Login:</h2>
                    <div>
                        <label>Nome:</label><br />
                        <input type="email" onChange={this.handleChange} name='email' value={this.state.email} />
                    </div>
                    <div>
                        <label>Pass:</label><br />
                        <input type="password" onChange={this.handleChange} name='pass' value={this.state.pass} placeholder='Digita a passe' />
                    </div>
                    <button type="submit">Enviar</button>
                </form>
                <p>mensagem</p>
            </div>
        );
    }
}
