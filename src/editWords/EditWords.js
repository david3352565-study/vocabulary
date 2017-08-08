import React, {Component} from 'react'
import EditSingleWord from './EditSingleWord'

class EditWords extends Component {
    state = {
        data: null
    }

    componentDidMount() {
        var xhr = new XMLHttpRequest();

        xhr.open('GET', '/getArrayNotes');

        xhr.send();
        xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
            console.log(xhr.status + ': ' + xhr.statusText);
        } else {
            var testWords = JSON.parse(xhr.responseText)

            this.setState({
                data: testWords
            })

            }
        }.bind(this)
    }


    render() {
        const content = this.contentChecker()

        return (
            <div className="words-wrap">{content}</div>
        )
    }


    contentChecker = () => {
        return this.state.data ? this.state.data.map(toEdit => <EditSingleWord key={toEdit._id} componentId={toEdit._id} rus={toEdit.russian} eng={toEdit.english}  />) : 'Loading'
    }
}


export default EditWords