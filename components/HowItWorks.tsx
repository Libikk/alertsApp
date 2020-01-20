import React from 'react';
import '../styles/howItWorks.scss';
import FindIcon from '../static/svg/find.svg';
import PiggyBankIcon from '../static/svg/piggybank.svg';
import BellIcon from '../static/svg/notification-bell.svg';

export default class HowItWorks extends React.Component {

    render() {
      const navConfig = [
        {
          headerText: 'FIND AND ADD PRODUCT TO YOUR ACCOUNT',
          bodyText: 'We work for the customer to make sure that shoppers get the best value for their products',
          SvgIcon: FindIcon
        },
        {
          headerText: 'WAIT FOR DISCOUNT PRODUCT NOTIFICATION',
          bodyText: 'Notification should arrive to your email or phone as soon as the product will be discounted',
          SvgIcon: BellIcon
        },
        {
          headerText: 'SAVE ON AVERAGE 30% ON EACH PRODUCT!',
          bodyText: 'Enjoy your savings',
          SvgIcon: PiggyBankIcon
        }
    ]
      return (
        <div className="container__howitworks">
            <div className="howitworks__content">
              <h2>How does DDiscount Hero work?</h2>
              <ul className="content__steps">
                  {navConfig.map(({ headerText, bodyText, SvgIcon }) =>
                    <li key={bodyText} className="content__single-element">
                            <h3>{headerText}</h3>
                            <p className="content__body-text">{bodyText}</p>
                            <SvgIcon className="content__icon" />
                    </li>)
                  }
              </ul>
            </div>
        </div>
    );
  }
}