import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Router from 'next/router';

const PagesTabs = (pageIndex) => {
    const handleChange = (event, newValue) => {
      console.log('newValue: ', newValue);
        if (newValue === 0) Router.push('/about', 'about');
        else if (newValue === 1) Router.push('/termsAndConditions', 'termsandconditions');
        else if (newValue === 2) Router.push('/privacyPolicy', 'privacypolicy');
    };

    return <div>
      <Tabs
        value={pageIndex}
        indicatorColor="secondary"
        textColor="secondary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="About" />
        <Tab label="Terms & Conditions" />
        <Tab label="Privacy Policy" />
      </Tabs>
    </div>
}

export default PagesTabs;