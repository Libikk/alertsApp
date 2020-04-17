import React from 'react';
import '../styles/footer.scss';
import Link from 'next/link';
import { version } from '../appConfig';


export default class Footer extends React.Component {

    render() {
      const navConfig = [
        {
          displayName: 'about us',
          url: '/about'
        },
        {
          displayName: 'terms & conditions',
          url: '/termsAndConditions'
        },
        {
          displayName: 'privacy policy',
          url: '/privacyPolicy'
        }
    ]
      return (
        <div className="container__footer">
            <nav className="footer_nav">
              <div className="nav__android-container">
                <a href='https://play.google.com/store/apps/details?id=ddiscount.hero&hl=en_GB&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
                  <img alt='Get it on Google Play' src='https://play.google.com/intl/en_gb/badges/static/images/badges/en_badge_web_generic.png'/>
                </a>
              </div>
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