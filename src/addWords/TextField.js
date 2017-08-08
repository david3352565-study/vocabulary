import React from 'react'

function TextField (props) {
    const {stateName, inputValue, onChng} = props;

    return (
        <div>
            <input type='text' name={stateName} id={stateName + 'Word'} onChange={onChng(stateName, inputValue)} value={inputValue} />
            <label htmlFor={stateName + 'Word'}>{stateName} words</label>
        </div>
    )
}

export default TextField