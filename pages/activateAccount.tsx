import React from 'react'
import Layout from '../components/Layout';
import defaultPage from '../components/Auth/defaultPage';

type MyProps = {
  result: {
    isActivated: boolean,
    isAlreadyActive: number,
    messageData: {
      msg: string,
      isError: boolean
    }
  }
};

const ActivateAccount = (props: MyProps) => (
  <Layout>
      <div>
          <h1>{props.result.messageData.msg}</h1>
      </div>
  </Layout>
)

ActivateAccount.getInitialProps = async({ query }) => ({ ...query });

export default defaultPage(ActivateAccount);