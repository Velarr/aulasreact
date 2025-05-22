import React from 'react';

import MsgProps from './MsgProps'

const valor = 12;

export default function MsgMain() {
    return (
        <div>
            <MsgProps name="Fábio" />
            <MsgProps name="Prog22" />
            <MsgProps name={valor} />
            <MsgProps />
        </div>
    );
}

