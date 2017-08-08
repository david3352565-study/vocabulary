import React from 'react'

function EditingButtons (props) {
    const {onDel, componentId, onEdit} = props

    return (
        <div>
            <button onClick={onDel(componentId)}>Удалить слово</button>
            <button onClick={onEdit()}>Редактировать слово</button>
        </div>
    )
}


export default EditingButtons