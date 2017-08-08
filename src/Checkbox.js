import React from 'react'

function Checkbox (props) {
    const {state, flag, toggler} = props
    const phrase = {test: 'Wanna test youself?', addWords: 'Wanna add new words?', editWords: 'Wanna edit your vocabulary?'}

    return (
        <div>
            <label><input checked={flag ? true : false} onChange={toggler(state)} name="pageRadio" type="checkbox" id="toTest" /> {phrase[state]}</label>
        </div>
    )
}
export default Checkbox