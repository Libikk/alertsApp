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
          bodyText: 'We work for the customer to make sure that shoppers get the best value for their household',
          SvgIcon: FindIcon
        },
        {
          headerText: 'WAIT FOR DISCOUNT NOTIFICATION',
          bodyText: 'We work for the customer to make sure that shoppers get the best value for their household',
          SvgIcon: BellIcon
        },
        {
          headerText: 'SAVE ON AVERAGE 30% ON EACH SHOP!',
          bodyText: 'Join the thousands of households in the UK that are shopping regularly with mySupermarket',
          SvgIcon: PiggyBankIcon
        }
    ]
      return (
        <div className="container__howitworks">
            <h2>How does DDiscount Hero work?</h2>
            <ul className="howitworks__content">
                {navConfig.map(({ headerText, bodyText, SvgIcon }) => <li key={bodyText}>
                        <h2>{headerText}</h2>
                        <p className="content__body-text">{bodyText}</p>
                        <SvgIcon className="content__icon" />
                </li>)}
            </ul>

        </div>
    );
  }
}