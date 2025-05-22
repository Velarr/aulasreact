import React from 'react';
import Painel from './PainelAvaliacaoContainer';

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

    async componentDidMount() {
        try {
            const [team1, team2, confronto] = await Promise.all([
                this.fetchData('team1'),
                this.fetchData('team2'),
                this.fetchData('confronto')
            ]);

            this.setState({
                loaded: true,
                equipa1: { nome: 'Equipa 1', jogadores: team1 },
                equipa2: { nome: 'Equipa 2', jogadores: team2 },
                confronto
            });
        } catch (error) {
            console.error("Erro ao carregar dados", error);
        }
    }

    // Função genérica para buscar dados
    async fetchData(endpoint) {
        const response = await fetch(`http://localhost:1214/${endpoint}`);
        return response.json();
    }

    // Calcula total de pontos da equipa
    calcularTotalGolos(jogadores) {
        return jogadores.reduce((acc, jogador) => acc + jogador.pontos, 0);
    }

    // Atribui ponto a jogador por ID e recalcula totais
    atribuirPontos = (id, equipaIndex) => {
        this.setState((prevState) => {
            const chaveEquipa = equipaIndex === 1 ? 'equipa1' : 'equipa2';
            const novaEquipa = { ...prevState[chaveEquipa] };
            novaEquipa.jogadores = novaEquipa.jogadores.map(j => ({
                ...j,
                pontos: j.id === id ? j.pontos + 1 : j.pontos
            }));

            const totalEquipa1 = this.calcularTotalGolos(
                chaveEquipa === 'equipa1' ? novaEquipa.jogadores : prevState.equipa1.jogadores
            );
            const totalEquipa2 = this.calcularTotalGolos(
                chaveEquipa === 'equipa2' ? novaEquipa.jogadores : prevState.equipa2.jogadores
            );

            return {
                [chaveEquipa]: novaEquipa,
                totalEquipa1,
                totalEquipa2
            };
        });
    }

    render() {
        const { loaded, confronto, equipa1, equipa2, totalEquipa1, totalEquipa2 } = this.state;

        if (!loaded) {
            return <div>Loading...</div>;
        }

        return (
            <Painel
                confronto={confronto}
                equipa1={equipa1}
                equipa2={equipa2}
                totalEquipa1={totalEquipa1}
                totalEquipa2={totalEquipa2}
                atribuirPontos={this.atribuirPontos}
            />
        );
    }
}
