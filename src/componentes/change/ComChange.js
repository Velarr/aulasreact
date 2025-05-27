import React from 'react';
export default class ComChange extends React.Component {

    constructor(props){
        super(props);
        this.state={
            texto:'',
        };
    }
    inputChange = (event)=>{
        this.setState({texto:event.target.value});
    }
    render() {

            return (
                <div>
                    <h2>Digita:</h2>
                    <input type="text" onChange={this.inputChange}/>
                    <p>Texto: {this.state.texto}</p>
                </div>
            );
        }
    }
