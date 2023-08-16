import React, { useEffect } from 'react'
import { userLoggedin } from '../Global'

export default function About() {
  useEffect(() => {
    userLoggedin()
  }, [])
  return (
    <div>About</div>
  )
}
