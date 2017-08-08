import React, {Component} from 'react'
import TextField from './TextField'

class AddWords extends Component {
    state = {
        russian: '',
        english: ''
    }

    render () {

        const inputs = Object.keys(this.state).map(val => { return [val, this.state[val]] }).map(textField => <TextField key={textField[0]} 
                                                                                                                            stateName={textField[0]} 
                                                                                                                            inputValue={textField[1]}
                                                                                                                            onChng={this.reloadField}/>)       

        return (
            <div className="center">
                <div className="mainForm">
                    {inputs}
                    <div>
                        <button id='submitForm' onClick={this.postReq}>Submit</button>
                    </div>
                </div>
            </div>
        )
    }

    reloadField = (stateName, stateValue) => ev => {
        this.setState({
            [stateName]: ev.target.value
        })
    }

    postReq = ev => {
        var xhr = new XMLHttpRequest();

        var body = 'russian=' + encodeURIComponent(this.state.russian) +
        '&english=' + encodeURIComponent(this.state.english);

        this.setState({
            russian: '',
            english: ''
        })

        xhr.open("POST", '/notes', true)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

        xhr.send(body);

        xhr.onreadystatechange = function() { // (3)
            if (xhr.readyState != 4) return;

            console.log('success')
        }
    }
}

export default AddWords