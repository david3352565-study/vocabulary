import React, {Component} from 'react'
import WordsWrap from './test/WordsWrap'
import Checkbox from './Checkbox'
import AddWords from './addWords/AddWords'
import EditWords from './editWords/EditWords'

class RootComponent extends Component {

    state = {
        test: true,
        addWords: false,
        editWords: false
    }

    render () {

        const checkboxes = Object.keys(this.state).map(val => { return [val, this.state[val]] }).map(checkbox => <Checkbox key={checkbox[0]} 
                                                                                                                            state={checkbox[0]} 
                                                                                                                            flag={checkbox[1]} 
                                                                                                                            toggler={this.togglePages} />)

        return (
            <div>
                {checkboxes}
                {this.showPage('test', <WordsWrap />)}
                {this.showPage('addWords', <AddWords />)}
                {this.showPage('editWords', <EditWords />)}
            </div>
        )
    }

    togglePages = (stateName) => ev => {
        if (this.state[stateName]) return
        this.setState({
            [stateName]: true
        })
        for (var i in this.state) {
            if (i != stateName) {
                this.setState({
                    [i]: false
                })
            }
        }
    }

    showPage = (stateName, components) => {
        return this.state[stateName] ? components : null;
    }

}


export default RootComponent