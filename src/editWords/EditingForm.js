import React, {Component} from 'react'

class EditingForm extends Component {

    state = {
        russian: '',
        english: ''
    }

    render() {
        const {componentId, seccessEdit} = this.props;

        return (
            <div className="edit-word-form-wrapper">
                <label><input onChange={this.onRusChenge} value={this.state.russian} type="text" name="newRussian"/> Edited russian words</label>
                <div className="clear"></div>
                <label><input onChange={this.onEngChenge} value={this.state.english} type="text" name="newEnglish"/> Edited english words</label>
                <div className="clear"></div>
                <button onClick={this.submitEditing(componentId, seccessEdit)}>Submit</button>
            </div>
        )
    }

    onRusChenge = (ev) => {
        this.setState({
            russian: ev.target.value
        })
    }

    onEngChenge = (ev) => {
        this.setState({
            english: ev.target.value
        })
    }

    submitEditing = (id, onSeccess) => ev => {


        var xhr = new XMLHttpRequest();

        var body = 'russian=' + encodeURIComponent(this.state.russian) +
        '&english=' + encodeURIComponent(this.state.english);

        this.setState({
            russian: '',
            english: ''
        })

        xhr.open("PUT", '/notes/' + id, true)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

        xhr.send(body);

        xhr.onreadystatechange = function() { // (3)
            if (xhr.readyState != 4) return;
            
            onSeccess(id)
        }.bind(this)
    }
}



export default EditingForm