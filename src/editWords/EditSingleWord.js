import React, {Component} from 'react'
import EditingButtons from './EditingButtons'
import EditingForm from './EditingForm'

class EditSingleWord extends Component {

    state = {
        edit: false,
        deleted: false,
        edited: false,
        newWord: []
    }


    render() {
        const {rus, eng, componentId} = this.props;
        const editWord = null
        const rusString = rus.join(', ')
        const engString = eng.join(', ')
        const phrase = 'You have seccessefuly changed word'

        return (
            <div>
                <div className="margin-bottom">
                    <div>
                        <p>{this.showWord(rusString, engString)}</p>
                    </div>
                    {this.showButtons(componentId)}
                    {this.showEditingForm(componentId)}
                    {this.state.edited ? phrase : null}
                </div>
                <div className="clear"></div>
            </div>
        )
    }

    showWord = (rus, eng) => {
        return !this.state.edited ? rus + ' -- ' + eng : this.state.newWord[0] + ' -- ' + this.state.newWord[1]
    }


    showButtons = (id) => {
        return !this.state.deleted ? <EditingButtons componentId={id} onDel={this.deleteWord} onEdit={this.editWord} /> : 'You have successfuly deleted this word'
    }

    showEditingForm = (id) => {
        return this.state.edit ? <EditingForm seccessEdit={this.seccessEdit} componentId={id} /> : null
    }

    editWord = () => (ev) => {
        this.setState({ 
            edit: !this.state.edit
        })
    }

    deleteWord = id => ev => {
        var xhr = new XMLHttpRequest();

        xhr.open('DELETE', '/notes/' + id);

        xhr.send();
        xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
            console.log(xhr.status + ': ' + xhr.statusText);
        } else {

            this.setState({
                deleted: true,
                edited: false
            })


            }
        }.bind(this)
    }

    seccessEdit = (id) => {
        var xhr = new XMLHttpRequest();

        xhr.open('GET', '/notes/' + id);

        xhr.send();
        xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
            console.log(xhr.status + ': ' + xhr.statusText);
        } else {
            var testWords = JSON.parse(xhr.responseText)

            this.setState({
                edit: false,
                edited: true,
                newWord: [testWords.russian, testWords.english]
            })

            }
        }.bind(this)
    }

}

export default EditSingleWord
