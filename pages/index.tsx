import '../styles/styles.scss'

import React from 'react';
export default class extends React.Component {
  test = (a: String) => {
    return a + 'dsdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'
  }

  render() {
    return (
      <div className="title">
        Hello Next.js this is testtt {this.test(true)}
      </div>
    )
  }
}