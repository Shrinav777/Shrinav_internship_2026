import React from 'react'

import style from './NewComp.module.css'

//External
//Module
//inline


export const NewComp = (props) => {

  const styles = {
    backgroundColor : Blue
  }

  return (
    <div className={{styles}}>Hello {props.name}</div>
  )
}
