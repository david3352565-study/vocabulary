import React, {Component} from 'react'

class SingleWord extends Component {

    state = {
        fieldValue: '',
        result: null,
        guessedWords: [],
        showForm: true
    }

    render () {
        const {russian, english} = this.props;
        const str1 = russian.join(', ')
        const str2 = english.join(', ')


        return (
            <div className="center">
                <div className="wdt-50 align-right">
                    <div className={this.getWrapperClass()}>
                        <p>{str1}</p>
                    </div>
                </div>
                <div className="wdt-50 align-left">
                    <div className={this.getWrapperClass()}>
                        <form className={this.state.showForm ? null : 'dn'} onSubmit={this.customSubmit(russian, english)}>
                            <input autoComplete="off" name="word" value={this.state.fieldValue} onChange={this.changeValue} type="text"/>
                            <button>submit</button>
                        </form>
                        <p className={this.state.guessedWords.length ? null : 'dn'}>{this.state.guessedWords}</p>
                    </div>
                </div>
            </div>
        )
    }

    changeValue = ev => {
        this.setState({
            fieldValue: ev.target.value
        })
    }

    getWrapperClass = () => {
        if (this.state.result === null) return 'word-wrapper'
        return this.state.result ? 'word-wrapper ' + 'right' :  'word-wrapper ' + 'wrong'
    }

    customSubmit = (rus, eng) => ev => {
        ev.preventDefault()

        this.setState({showForm: false})

        for (let i = 0; i < eng.length; i++) {
            if (this.state.fieldValue.toLowerCase() === eng[i].toLowerCase()) {
                this.setState({
                    result: true,
                    guessedWords: this.state.guessedWords + this.state.fieldValue + ' ',
                    fieldValue: ''
                })
                return
            }
        }

        this.setState({
            result: false,
            guessedWords: eng.join(', '),
            fieldValue: ''
        })
    }



}

export default SingleWord