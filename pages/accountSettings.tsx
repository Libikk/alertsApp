import React, { useState } from 'react'
import Layout from '../components/Layout';
import defaultPage from '../components/Auth/defaultPage';
import Tabs from '@material-ui/core/Tabs';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { toast } from 'react-toastify';
import '../styles/accountSettings.scss';

const AccountSettings = () => {
    const [selectedTabIndex, setSelectedTabIndex] = useState(1)
    const onSaveChanges = () => {
        toast.success('Saved successful');
        toast.error('Saving failed');
    }

    return (
        <Layout>
            <div className="account-settings">
                <div className="account-settings__container">


                    <h1>Account Settings</h1>
                    <Tabs value={selectedTabIndex} onChange={(e, index) => setSelectedTabIndex(index)}>
                        <Tab label="Account information" />
                        <Tab label="Notification preferences" />
                    </Tabs>
                    <SwipeableViews index={selectedTabIndex}  className="swipeable-views">
                        <Paper className="my-products">
                            ACCOUNT INFO
                        </Paper>
                        <Paper className="my-notifications">
                            <FormControlLabel control={<Checkbox checked={false} />} label="Email notifications" />
                            <FormControlLabel control={<Checkbox checked={false} />} label="Push notifications" />
                            <FormControlLabel control={<Checkbox checked={true} />} label="SMS notifications" />
                            <div>
                                <Button onClick={onSaveChanges} color="secondary">Save Changes</Button>
                            </div>
                        </Paper>
                    </SwipeableViews>
                </div>
            </div>
        </Layout>
    )
}

export default defaultPage(AccountSettings);