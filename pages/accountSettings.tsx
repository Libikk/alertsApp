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
import TextField from '@material-ui/core/TextField';
import { toast } from 'react-toastify';
import '../styles/accountSettings.scss';

const AccountSettings = () => {
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)
    const onSaveChanges = (saveType :string) => {
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
                        <Paper className="container__my-account">
                            <div className="my-account__text-fields">
                                <TextField label="Account name *" defaultValue="Hello World" />
                                <TextField
                                    label="Email Address *"
                                    defaultValue="Hello World"
                                    disabled
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField
                                    label="Password *"
                                    defaultValue="***********"
                                    disabled
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </div>
                            <div className="my-account__save-changes">
                                <Button onClick={() => onSaveChanges('account')} color="secondary">Save Changes</Button>
                            </div>
                        </Paper>
                        <Paper className="container__my-notifications">
                            <FormControlLabel disabled control={<Checkbox checked={false} />} label="Email notifications" />
                            <FormControlLabel disabled control={<Checkbox checked={false} />} label="Push notifications" />
                            <FormControlLabel disabled control={<Checkbox checked={true} />} label="SMS notifications" />
                            <div className="my-notifications__save-changes">
                                <Button disabled onClick={() => onSaveChanges('notifications')} color="secondary">Save Changes</Button>
                            </div>
                        </Paper>
                    </SwipeableViews>
                </div>
            </div>
        </Layout>
    )
}

export default defaultPage(AccountSettings);