import React from 'react';

export default class BtnAtrib extends React.Component {
    toogle = (e) => {
        console.log("***********");
        console.log(e);
        console.log("***********");
        e.preventDefault();
        this.props.atribuirPontos();

    }
    render() {
        return (
            <button onClick={this.toogle}>Add golo</button>
        );
    }
}

