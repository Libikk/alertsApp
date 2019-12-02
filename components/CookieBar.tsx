import React from 'react';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import CookieIcon from '../static/svg/cookie.svg';
import '../styles/cookieBar.scss';

const CookieBar = () => {


    return <div className="cookie-container">
        <div className="cookie-container__head">
            <CookieIcon /> This website is using cookie to enhance the user experience. <Link href={{ pathname: 'privacyPolicy' }} as='/privacypolicy'><a>Privacy Policy</a></Link>
        </div>
        <div className="cookie-container__body">
         <Button variant="contained" color="secondary">Agree</Button>
        </div>
    </div>
}

export default CookieBar;