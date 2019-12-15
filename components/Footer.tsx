import React from 'react';
import '../styles/footer.scss';
import Link from 'next/link';
import { version } from '../appConfig';


export default class Footer extends React.Component {

    render() {
      const navConfig = [
        {
          displayName: 'about us',
          url: ''
        },
        {
          displayName: 'support',
          url: ''
        },
        {
          displayName: 'language',
          url: ''
        },
        {
          displayName: 'privacy',
          url: ''
        }
    ]
      return (
        <div className="container__footer">
            <nav className="footer_nav">
                <ul className="nav__link-list">
                    {navConfig.map(nav => <li key={nav.displayName}>
                      <Link href={nav.url}>
                        <a>
                          {nav.displayName}
                        </a>
                      </Link>
                    </li>)}
                </ul>
                <span className="nav__rights">@ 2019 ddiscounthero</span>
            </nav>
        </div>
    );
  }
}