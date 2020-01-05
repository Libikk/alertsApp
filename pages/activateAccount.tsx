import React from 'react'
import Layout from '../components/Layout';
import defaultPage from '../components/Auth/defaultPage';
import '../styles/activateAccount.scss';

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
      <div className="activate-account">
        <div className="activate-account__container">
          <h1>{props.result.messageData.msg}</h1>
        </div>
      </div>
  </Layout>
)

ActivateAccount.getInitialProps = async({ query }) => ({ ...query });

export default defaultPage(ActivateAccount);