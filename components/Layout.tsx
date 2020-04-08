import React from 'react';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import InactiveAccountBar from '../components/InactiveAccountBar';
import Toast from './Toast';
import CookieBar from '../components/CookieBar';
import ReactGA from 'react-ga';
import Router from 'next/router';
import { gaTrackingId } from '../appConfig';
import Head from 'next/head';
import MetaTags from '../MetaTags/MetaTags';
import '../styles/globals.scss';
import '../styles/layout.scss';


type MyProps = {
    children: JSX.Element;
    title: string,
  };

class Layout extends React.Component<MyProps> {
  componentWillMount() {
    Router.onRouteChangeComplete = (url) => {
      ReactGA.initialize(gaTrackingId);
      ReactGA.pageview(url);
    };
  }

  render() {

    return (
      <div className="layout-section">
        <Head>
          <title>{this.props.title}</title>
          <MetaTags customLdObject={this.props.customLdObject} />
        </Head>
        <Toast />
        <CookieBar />
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