import React from 'react';

import BtnAtrib from './BtnAtrib';

export default class Jogador extends React.Component {
    render() {
        const { id, nome, pontos, atribuirPontos } = this.props;
        return (
            <div>
                <h2>{nome} </h2>
                <h3>Golos :{pontos}</h3>
                <BtnAtrib atribuirPontos={() => atribuirPontos(id)} />
            </div>
        );
    }
}

