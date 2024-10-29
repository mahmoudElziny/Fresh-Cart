import React, { useContext } from 'react'
import { UserContext } from '../../Contexts/userContext';
import { Helmet } from 'react-helmet';

export default function Settings() {

  let { data } = useContext(UserContext);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name='description' content='Settings' />
        <title>FreshCart | Settings</title>
      </Helmet>
      <div>Hello {data.name} </div>
    </>
  )
}
