import React from 'react';
import '../styles/howItWorks.scss';
import SearchIcon from '@material-ui/icons/Search';


export default class HowItWorks extends React.Component {

    render() {
      const navConfig = [
        {
          text: 'about us',
          Icon: SearchIcon
        },
        {
          text: 'support',
          Icon: ''
        },
        {
          text: 'language',
          Icon: ''
        },
        {
          text: 'privacy',
          Icon: ''
        }
    ]
      return (
        <div className="container__howitworks">
            <h2>How does DDiscount Hero work?</h2>
            <ul className="howitworks__">
                {navConfig.map(({text, Icon}) => <li>
                        {text}
                        {Icon && <Icon/>}

                </li>)}
            </ul>
        </div>
    );
  }
}