import React from 'react';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import InactiveAccountBar from '../components/InactiveAccountBar';
import Toast from './Toast';

import '../styles/globals.scss';
import '../styles/layout.scss';


type MyProps = {
    // using `interface` is also ok
    children: JSX.Element;
  };

class Layout extends React.Component<MyProps> {
  render() {

    return (
      <div className="layout-section">
        <Toast />
        <InactiveAccountBar />
        <Header />
        <section className="layout-section__content">
          {this.props.children}
        </section>
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = () => ({})

export default connect(state => state, mapDispatchToProps)(Layout);