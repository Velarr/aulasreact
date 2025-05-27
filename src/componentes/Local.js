import React from 'react';

import Painel from './PainelAvaliacaoContainer';
import * as $ from 'jquery';
export default class Aplicacao extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {
			loaded: false,
			equipa1: null,
			equipa2: null,
			confronto: null,
			totalEquipa1: 0,
			totalEquipa2: 0
		};
	}
	
	getState(){
		return this.state;
	}
	
	componentDidMount(){
		setTimeout(()=>{
			this.getData();
		},0);
	}
	
	getData(){
		$.getJSON("dados.json", (result) => {
			this.setState({
				loaded: true,
				confronto: result.confronto,
				equipa1: result.equipa1,
				equipa2: result.equipa2
			});
		});
	}
	
	// reduce()
	calcularTotalGolos(equipa){
		let pontosEquipa = 0;
		equipa.jogadores.map((jogador)=>{
			pontosEquipa += jogador.pontos;
		});
		return pontosEquipa;
	}
	
	// metodo de atrib golo ao jogador e equipa
	atribuirPontos = (id, equipa)=> {
		this.setState((prevState)=>{
			// obter a equipa
			let goloEquipa = equipa===1 ? prevState.equipa1 : prevState.equipa2;
			// update dos pontos do jogador 
			goloEquipa.jogadores.forEach((jogador)=>{
				if(jogador.id===id)
					jogador.pontos +=1;
			});
			// Calcular os pontos da equipa
			const totalEquipa1 = this.calcularTotalGolos(prevState.equipa1);
			const totalEquipa2 = this.calcularTotalGolos(prevState.equipa2);
			return {
				totalEquipa1,
				totalEquipa2
			};
		});
	}
	
	
	
	render(){
		const {loaded, confronto, equipa1, equipa2,totalEquipa1,totalEquipa2} = this.state;
		if(!this.state.loaded){
			return (<div>Loading...</div>);
		}else{
			return (<Painel confronto={confronto} 
				       equipa1={this.state.equipa1}
					   equipa2={this.state.equipa2}
					   totalEquipa1={this.state.totalEquipa1}
					   totalEquipa2={this.state.totalEquipa2}
					   atribuirPontos={this.atribuirPontos}
					/>);
		}
	}
}




