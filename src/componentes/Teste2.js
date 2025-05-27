import React from 'react';
import Painel from './PainelAvaliacaoContainer2';

import * as $ from 'jquery';
import Jogador from './JogadorEquipa';
export default class Appgeral extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            loader:false,
            equipa1:null,
            equipa2:null,
            confronto:null,
            total1:0,
            total2:0,
        };
    }
    /*
    Antes de renderizar(invocar o metodo render), nesta fase podemos fazer alteracoes de estado ou props, mas apenas em versoes mais antigas, na versao 18+
    esta obsoleto e nao deve ser usado
    */
    componentWillMount(){
        console.log("O componente ja foi instanciado, estou a espera que o metodo ComponentDidMount finalize");
    }
    atribuitPontosUm(){
        this.setState({pontos_jogador_um:this.state.pontos_jogador_um+1})
    }
    atribuitPontosDois(){
        this.setState({pontos_jogador_dois:this.state.pontos_jogador_dois+1})
    }
    //arg obj
    defineState(obj){
        console.log("getState-Antes");
        console.log(this.getstate());//Saida:{ loaded:false}
        this.setState(obj);
        console.log("getState-Depois");
        console.log(this.getstate());//Saida: {loaded:false, data:{...}}
    }
    /*Metodo invocado apos o render ter renderizado os componentes(finalizou o processo)
    Nesta fase realizamos toda a parte assincrona ou as chamadas API/webservice, alterando estados/fluxos. */
    componentDidMount(){
        setTimeout( ()=>{
            this.getData();
        },0);
    }
    getData(){
        $.getJSON("dadosjogadores.json",(result) =>{
            this.setState({loader:true,
                confronto:result.confronto,
                equipa1:result.equipa1,
                equipa2:result.equipa2,
                total1:this.calcularTotalGolos(result.equipa1),
                total2:this.calcularTotalGolos(result.equipa2)});
                
        });
    }
    calcularTotalGolos(equipa){
        let pontosequipa = 0;
        equipa.jogadores.map((jogador)=>{
            pontosequipa+=jogador.pontos;
        })
        return pontosequipa;
    }
    atribuitPontos = (id,equipa)=>{
        this.setState((prevState)=>{
            let goloEquipa = equipa===1?+prevState.equipa1 : prevState.equipa2;
            //update dos golos dos jogadores
            goloEquipa.jogadores.forEach(jogador => {
                if(jogador.id===id){
                    jogador.pontos +=1
                }
            });
            const totalEquipa1 = this.calcularTotalGolos(prevState.equipa1);
            const totalEquipa2 = this.calcularTotalGolos(prevState.equipa2);
            return{
                totalEquipa1,
                totalEquipa2
            };
        });
    }
    getstate(){
        return this.state;
    }
    render(){
        const{loader, confronto, equipa1, equipa2, total1, total2} = this.state; 
        if(!this.state.loader){
            return(<div>Loading...</div>)
        }else{
            const rows = [];
            /*for (let i = 0; i < this.state.data.length; i++) {
                rows.push(<Aplicacao confronto={this.state.data[i].confronto} jogador1={this.state.data[i].equipa1} jogador2={this.state.data[i].equipa2} />);
                for(let e = 0;e < this.state.data[i].equipa1.jogadores.length; e++){
                    rows.push(<Jogador nome={this.state.data[i].equipa1.jogadores[e].nome}  pontos={this.state.data[i].equipa1.jogadores[e].numero} />);
                }
                for(let e = 0;e < this.state.data[i].equipa2.jogadores.length; e++){
                    rows.push(<Jogador nome={this.state.data[i].equipa2.jogadores[e].nome}  pontos={this.state.data[i].equipa2.jogadores[e].numero} />);
                }
            }*/
            return(/*
                <><div>
                    <Jogador nome={this.state.data1.confronto} pontos={this.state.data1.jogador1}/>
                </div>
                <div>
                    <Aplicacao confronto={this.state.data2.confronto} jogador1={this.state.data2.jogador1} jogador2={this.state.data2.jogador2}/>
                </div></>*/
                //rows
                <Painel confronto={confronto}
                    equipa1={this.state.equipa1}
                    equipa2={this.state.equipa2}
                    total1={this.state.equipa1}
                    total2={this.state.equipa2}
                    atribuitPontos={this.atribuitPontos}/>
            ); 
        }
    }
}