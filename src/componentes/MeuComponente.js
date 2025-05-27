import React from 'react';

export default class MeuComponente extends React.Component {
    render() {
        return (
            <React.Fragment>
                <header>Header</header>
                <main>Main</main>
            </React.Fragment>
        );
    }
}

/*

Não produz alteração no html
<header>Header</header>
<main>Main</main>


*/