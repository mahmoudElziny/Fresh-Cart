import React, { useContext } from 'react'
import { UserContext } from '../../Contexts/userContext';

export default function Settings() {

    let {data} = useContext(UserContext);

  return (
    <div>Hello {data.name} </div>
  )
}
