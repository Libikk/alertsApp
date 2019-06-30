import React from 'react';
// import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/globals.scss';

type MyProps = {
    // using `interface` is also ok
    children: JSX.Element;
  };

class Layout extends React.Component<MyProps> {
  render() {
    return (
      <div>
        <Header />
        <section className="layout-section">
          {this.props.children}
        </section>
        {/* <Footer /> */}
      </div>
    );
  }
}

export default Layout;