import '../styles/styles.scss'
import Layout from '../components/Layout';

import React from 'react';
export default class extends React.Component {
  state = {
    a: 100
  }
  test = (a: Number) => {
    this.setState({ a: 'huasdasdasdadsugsdfj' + a })
   }

  render() {
    return (
      <Layout>
        <div className="title">
          DISCOUT HERO
          Hello Next.js this is testtt {this.state.a}
          <button onClick={() => this.test(213)}></button>
        </div>
      </Layout>
    )
  }
}