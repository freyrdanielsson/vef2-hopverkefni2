import React from 'react';
import { Route, Redirect } from 'react-router-dom'

/**
 * renderar Component ef notandi er innskráður,
 * Annars vísað notanda á /login
 * Öfugt við LoginRoute
 */

export default ({component: Component, authenticated, redirect, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => authenticated
        ? <Component {...props} />
        : <Redirect to={{pathname: `${redirect}`, state: {from: props.location}}} />}
    />
  )
}