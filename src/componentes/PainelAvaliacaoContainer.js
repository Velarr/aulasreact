import React from 'react';

import Jogador from './Jogador';
import Confronto from './Confronto';

//Import Css

import '../css/App.css';

export default class PainelAvaliacaoContainer extends React.Component {



    render() {
        const { confronto, equipa1, equipa2 } = this.props;

        if (!confronto || !equipa1 || !equipa2) {
            return (<div>Loading...</div>);
        }

        return (
            <div>
                <div className='floatLeft'>
                    <h2>{equipa1.nome}</h2>
                    <h3>Total de golos : {this.props.totalEquipa1}</h3>
                    {equipa1.jogadores.map((jogador) => (
                        <Jogador id={jogador.id} nome={jogador.nome} pontos={jogador.pontos} atribuirPontos={(id) => this.props.atribuirPontos(id, 1)} />

                    ))}
                </div>

                <div className='floatLeft'>
                    <Confronto local={this.props.confronto.local} data={this.props.confronto.data} hora={this.props.confronto.hora} />
                </div>

                <div className='floatLeft'>
                    <h2>{equipa2.nome}</h2>
                    <h3>Total de golos : {this.props.totalEquipa2}</h3>
                    {equipa2.jogadores.map((jogador) => (
                        <Jogador id={jogador.id} nome={jogador.nome} pontos={jogador.pontos} atribuirPontos={(id) => this.props.atribuirPontos(id, 2)} />

                    ))}
                </div>

            </div>
        );
    }
}

