import React from 'react';
import Aplicacao from './Aplicacao';

import * as $ from 'jquery';
export default class Appgeral extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            loader:false,
        };
    }
    /*
    Antes de renderizar(invocar o metodo render), nesta fase podemos fazer alteracoes de estado ou props, mas apenas em versoes mais antigas, na versao 18+
    esta obsoleto e nao deve ser usado
    */
    componentWillMount(){
        console.log("O componente ja foi instanciado, estou a espera que o metodo ComponentDidMount finalize");
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
        },2000);
    }
    getData(){
        $.getJSON("dados.json",(result) =>{
            console.log(result);
            this.defineState({loader:true,data:result});
        });
    }
    getstate(){
        return this.state;
    }
    render(){
        if(!this.state.loader){
            return(<div>Loading...</div>)
        }else{
            const rows = [];
            //100% dinamico
            for (let i = 0; i < this.state.data.length; i++) {
                rows.push(<Aplicacao confronto={this.state.data[i].confronto} jogador1={this.state.data[i].jogador1} jogador2={this.state.data[i].jogador2} />);
            }
            return(
                rows
            ); 
        }
    }
}