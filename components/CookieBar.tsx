import React, { useState, useEffect  } from 'react';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import { LocalStorageService } from '../utils/LocalStorageService';
import CookieIcon from '../static/svg/cookie.svg';
import '../styles/cookieBar.scss';

const CookieBar = () => {
    const [displayCookie, setDisplayCookie] = useState(false);

    const agreeCookies = () => {
        LocalStorageService.setItem('cookie-agreed', true)
        setDisplayCookie(false);
    }

    useEffect(() => {
        if (!LocalStorageService.getItem('cookie-agreed')) {
            setDisplayCookie(true)
        } else {
            setDisplayCookie(false)
        }
      });

    return displayCookie && <div className="cookie-container">
        <div className="cookie-container__head">
            <CookieIcon /> This website is using cookie to enhance the user experience. <Link href='/privacypolicy'><a>Privacy Policy</a></Link>
        </div>
        <div className="cookie-container__body">
         <Button onClick={agreeCookies} variant="contained" color="secondary">Agree</Button>
        </div>
    </div>
}

export default CookieBar;