import React from 'react';
import { autorize } from '../../dispatchers/authDispatchers';
import { getCookie } from '../../utils/auth';

const defaultPage = Page => class DefaultPage extends React.Component {
  static async getInitialProps(ctx) {
    if (ctx.isServer) {
      const { cookie } = ctx.req.headers;
      cookie && await autorize(getCookie('access_token', cookie))(ctx.store.dispatch)
    }

    const pageProps = await Page.getInitialProps && await Page.getInitialProps(ctx);
    return {
      ...pageProps,
    };
  }

  render() {
    return (
      <Page {...this.props} />
    );
  }
};

export default Page => defaultPage(Page);
