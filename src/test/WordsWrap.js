import React, {Component} from 'react'
import SingleWord from './SingleWord'


class WordsWrap extends Component {

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
        let words = null
        if (!this.state.data) {
            words = 'Loading'
        }
        else {
            this.shuffle(this.state.data)
            words = this.state.data.map(word => <SingleWord key={word._id} russian={word.russian} english={word.english}/>)
        }

        return (
            <div className="words-wrap">
                {words}
            </div>
        )
    }

    shuffle = (a) => {
        var j, x, i;
        for (i = a.length; i; i--) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }
    }

}


export default WordsWrap