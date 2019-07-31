import React from 'react'
import Layout from '../components/Layout';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import TextField from '@material-ui/core/TextField';
import { autorize } from '../dispatchers/authDispatchers';
import { getCookie } from '../utils/auth';
import url from 'url';
import '../styles/loginPage.scss';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class Dashboard extends React.Component {
  static async getInitialProps ({ req, query, store, isServer }) {
    if (isServer) {
      const { cookie } = req.headers;
      cookie && await autorize(getCookie('access_token', cookie))(store.dispatch);
    }
    return { ...query }
  }

  state = {
    urlInput: ''
  }

  add = () => console.log(url.parse(this.state.urlInput));

  handleInputChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render () {
    console.log(this.props)
    const { currentUser } = this.props.auth;
    return (
          <Layout>
              <div className='loginPage-container'>
                  <div className='header'>
                    <h1>
                        Welcome, {currentUser && currentUser.userName}
                    </h1>
                  </div>
                  <div className='content'>
                  {/* <Tabs
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                    >
                    <Tab label="My products" />
                    <Tab label="Item Two" />
                    <Tab label="Item Three" />
                  </Tabs> */}
                  </div>
                  <TextField
                    label="Product URL"
                    name="urlInput"
                    type="email"
                    fullWidth
                    placeholder='https://groceries.asda.com/product/milk-drinks/yazoo-chocolate-flavoured-milk/910002182124'
                    value={this.state.urlInput}
                    onChange={this.handleInputChange}
                    InputLabelProps={{ shrink: true }}
                  />
                  <Button onClick={this.add}>test</Button>
              </div>
          </Layout>
    )
  }
}


export default connect(state => state)(Dashboard);