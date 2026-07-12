import React from 'react'

export const List = (props) => {

    let ItemList = props.item
    let heading = props.heading

    let listItems = ItemList.map(fruit => <li key={fruit.key}>{fruit.name}</li>)
    return (
        <>
            <ul>
                <h1>{heading}</h1>
                {listItems}
            </ul>
        </>
    )
}
