import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from "react-redux";
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../theme/theme';
import withRedux from 'next-redux-wrapper'
import { initStore } from '../store';


class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
         <Provider store={store}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...this.props} />
          </ThemeProvider>
          </Provider>
      </Container>
    );
  }
}

export default withRedux(initStore)(MyApp);