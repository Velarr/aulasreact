import React from 'react';
import BtnAtrib from './BtnAtrib'
export default class Jogador extends React.Component{
    render(){
        console.log(this.props);
        return(
            <div>
                <h2>{this.props.nome}</h2>
                <h3>{this.props.pontos}</h3>
                <BtnAtrib atribuitPontos={this.props.atribuitPontos} />
            </div>
        )
    }
}