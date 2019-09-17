import React from 'react';
import '../styles/howItWorks.scss';
import SearchIcon from '@material-ui/icons/Search';
import MoneyIcon from '@material-ui/icons/Money';
import Icon from '@material-ui/core/Icon';
import ReactSVG from 'react-svg'

export default class HowItWorks extends React.Component {

    render() {
      const navConfig = [
        {
          headerText: 'FIND AND ADD PRODUCT TO YOUR ACCOUNT',
          bodyText: '',
          iconName: 'find'
        },
        {
          headerText: 'WAIT FOR DISCOUNT NOTIFICATION',
          bodyText: '',
          iconName: 'notification-bell'
        },
        {
          headerText: 'SAVE MONEY',
          bodyText: '',
          iconName: 'piggybank'
        }
    ]
      return (
        <div className="container__howitworks">
            <h2>How does DDiscount Hero work?</h2>
            <ul className="howitworks__content">
                {navConfig.map(({ headerText, bodyText, iconName }) => <li key={iconName}>
                        <h2>{headerText}</h2>
                        <ReactSVG className="content__icon" src={`../static/svg/${iconName}.svg`} />

                </li>)}
            </ul>
        </div>
    );
  }
}