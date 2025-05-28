import React from 'react';

import Painel from './PainelAvaliacaoContainer';
/*
    Propriedades:
        ->Nada mais é que informação que passamos entre os componentes,essa informação pode ser
            string,numero ,uma função ,um objeto.
            Caracterizada pela palavra (PROPS)
        ->As propriedades são passadas com atributos das tags,ex:
            <Pessoa idade={30} />
        ->Acesso é feito acedendo á propriedade : props
            Ex: {this.props.idade}
        ->No ECMAScript6 a criação de variaveis passa a ter:
            const: a variavel é definida na criação e não pode ser alterada
            let: poderão existir alterações na variavel
*/

/*
NOTA 2
USAR O Jquery em React:
    ->Instalação via npm
    ->Etapas:
        ->Posicionar na raiz do projeto, onde compilamos o projeto
        ->npm install jquery
        ->usar o pacote com a marcação que atribuimos
*/

import * as $ from 'jquery';
/*
NOTA 3:
Ciclo de vida de um Componente
    1ª fase-> São montados no app(render)
    2ª fase-> Podem sofrer alterações(componentDidMount)
    3ª fase-> São desmontados ou libertados.
*/

export default class Aplicacao extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            equipa1: null,
            equipa2: null,
            confronto: null,
            totalEquipa1: 0,
            totalEquipa2: 0,
        };
    }

    getState() {
        return this.state;
    }
    /*
    Antes de renderizar(invocar o metodo render), nesta fase podemos fazer alterações de estado ou props,
    mas apenas em versões mais antigas, na versão +18 está obsoleto e não deve ser usado.
    
    componentWillMount(){
        console.log("O componente já foi instanciado, estou á espera que o metodo ComponentDidMount finalize.");
    }
*/
    /*
        defineState(obj){
            console.log("getState-Antes");
            console.log(this.getState()); //Saida: {loaded:false}
            this.setState(obj);
            console.log("getState-Depois");
            console.log(this.getState()); //Saida: {loaded:false,data: {...}}
        }
        */
    /* 
    Metodo invocado após o render ter renderizado os componentes(finalizou o processo).
    Nesta fase realizamos toda a parte assincrona ou as chamadas API/Webservice, alterando estados/fluxos
    */
    componentDidMount() {
        setTimeout(() => {
            this.getDataTeam(1);
            this.getDataTeam(2);
            this.getDataConfronto();
        }, 0);
    }
    /*Metodo responsavel pela requisição ao arquivo externo.
    getJSON(arquivo a requisitar, callback de resposta)
    */
    /*constructList = (data) => {
        this.setState({
            loaded: true,
            confronto: data.confronto,
            equipa1: data.equipa1,
            equipa2: data.equipa2
        });
    }*/


    async getDataTeam(team) {
        try {
            console.log(team);
            const response = await fetch('http://localhost:1214/team',{
		    method: 'POST',
            body: team});
            const data = await response.json();
            const equipa1 = { nome: `Equipa ${team}`, jogadores: data };
            this.setState({
                loaded: true,
                equipa1
            });
        } catch (error) {
            console.error("Erro na resposta da API", error)
        }
    }
    async getDataConfronto() {
        try {
            const response = await fetch('http://localhost:1214/confronto');
            const confronto = await response.json();
            this.setState({
                loaded: true,
                confronto
            });
        } catch (error) {
            console.error("Erro na resposta da API", error)
        }
    }
    //reduce()
    calcularTotalGolos(equipa) {
        let pontosEquipa = 0;
        equipa.jogadores.map((jogador) => {
            pontosEquipa += jogador.pontos;
        });
        return pontosEquipa;
    }

    //metodo de atrib golo ao jogador e equipa
    atribuirPontos = (id, equipa) => {
        this.setState((prevState) => {
            // obter a equipa
            let goloEquipa = equipa === 1 ? prevState.equipa1 : prevState.equipa2;
            //update dos pontos do jogador
            goloEquipa.jogadores.forEach((jogador) => {
                if (jogador.id === id)
                    jogador.pontos += 1;
            });
            //Calcular ps pontos das equipas
            const totalEquipa1 = this.calcularTotalGolos(prevState.equipa1);
            const totalEquipa2 = this.calcularTotalGolos(prevState.equipa2);
            return {
                totalEquipa1,
                totalEquipa2
            };
        });
    }


    render() {
        //constante por contexto    
        const { loaded, confronto, equipa1, equipa2, totalEquipa1, totalEquipa2 } = this.state;


        if (!this.state.loaded) {
            return (<div>Loading...</div>);
        } else {
            return <Painel
                confronto={confronto}
                equipa1={this.state.equipa1}
                equipa2={this.state.equipa2}
                totalEquipa1={this.state.totalEquipa1}
                totalEquipa2={this.state.totalEquipa2}
                atribuirPontos={this.atribuirPontos}
            /*
                                        confronto2={this.state.data.confronto2}
                                        confronto3={this.state.data.confronto3}
                                        jogador1={this.state.data.j1}
                                        jogador2={this.state.data.j2}
            */
            /* 
            maneira antiga
              jogador3={this.state.data.j3}
              jogador4={this.state.data.j4}
              jogador5={this.state.data.j5}
              jogador6={this.state.data.j6}
              equipa1={this.state.data.equipa1}
              equipa2={this.state.data.equipa2}
          */
            />;
        }
    }
}
