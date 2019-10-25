import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reSendActivationToken } from '../dispatchers/authDispatchers';
import ErrorIcon from '@material-ui/icons/ErrorOutline';
import '../styles/globals.scss';
import '../styles/inactiveAccountBar.scss';

interface CurrentUser {
    userName: string,
    userId: number,
    email: string,
    isActive: number
  }

type MyProps = {
    auth: {
        currentUser: null | CurrentUser
    },
    reSendActivationToken: Function
};

class InactiveAccountBar extends React.Component<MyProps> {

    sendEmailAgain = () => {
        console.log('GOWNO', this.props.reSendActivationToken())
    }

    render() {
        return (
        <div>
            {this.props.auth.currentUser && !this.props.auth.currentUser.isActive &&
            <section className="inactive-acc">
                <span>Inactive account {<ErrorIcon className="err-icon" />}</span>
                <span className="inactive-acc__click-info">Click activation link sent to {this.props.auth.currentUser.email}.</span>
                <span onClick={this.sendEmailAgain} className="inactive-acc__send-again">Send it again.</span>
            </section>
            }
        </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    reSendActivationToken: bindActionCreators(reSendActivationToken, dispatch),
  });

export default connect(state => state, mapDispatchToProps)(InactiveAccountBar);