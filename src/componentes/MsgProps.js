import React from 'react';

import PropTypes from 'prop-types';


/*
Prop Types.-> bib. para nos ajudar a prevenir erros, garantir tipos de dados e valores por defeito.
Nota: na versao 19 como ainda é experimental os avisos não aparecem, na versão 18 sim 


*/


export default function MsgProps(props) {
    return (
        <span>
            <b>Msg:</b>{props.name} <br />
        </span >
    );
}

// Tipos de dados

MsgProps.propType = {
    name: PropTypes.string.isRequired
}

//default
MsgProps.defaultProps = {
    name: 'Valor default'
}