import React, { useState } from 'react'
import Layout from '../components/Layout';
import { useSelector } from 'react-redux'
import defaultPage from '../components/Auth/defaultPage';
import { updateUserDetails } from '../dispatchers/userDispatchers';
import Tabs from '@material-ui/core/Tabs';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import Save from '@material-ui/icons/Save';
import '../styles/accountSettings.scss';
import { event } from 'react-ga';
import get from 'lodash/get';

const AccountSettings = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => get(state, 'auth.currentUser')) || {}
    const [newUserName, setNewUserName] = useState(currentUser.userName);
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)

    const [newPassword, setNewPassword] = useState(null)
    const [newPasswordRepeat, setNewPasswordRepeat] = useState(null)
    const onSaveChanges = (saveType :string) => {
        toast.success('Saved successful');
        toast.error('Saving failed');
    }

    const updatePersonDetails = (detailKey) => {
        event({ category: 'account-settings', action: 'click', label: `update person details: ${detailKey}` })
        const userDetailsData = {}
        if (detailKey === 'newPassword') userDetailsData.password = newPassword;

        if (detailKey === 'userName') userDetailsData.userName = newUserName;

        dispatch(updateUserDetails(userDetailsData))
            .then(() => {
                toast.success('Saved successfully');
                setNewPassword('');
                setNewPasswordRepeat('');
            })
            .catch((err) => toast.error(get(err, 'response.data.message', 'Saving failed')));
    }

    return (
        <Layout title="DDiscount Hero  | Account settings">
            <div className="account-settings">
                <div className="account-settings__container">


                    <h1>Account Settings</h1>
                    <Tabs value={selectedTabIndex} onChange={(e, index) => setSelectedTabIndex(index)}>
                        <Tab label="Account information" />
                        <Tab label="Notification preferences" disabled />
                    </Tabs>
                    <SwipeableViews index={selectedTabIndex}  className="swipeable-views">
                        <Paper className="container__my-account">
                            <div className="my-account__text-fields">
                                <div className="text-fields__with-icon">
                                    <TextField label="Account name *" value={newUserName} onChange={({ target }) => setNewUserName(target.value)} />
                                    {newUserName !== currentUser.userName && <div className="icon"><Save color="secondary" onClick={() => updatePersonDetails('userName')}/></div>}
                                </div>

                                <TextField
                                    label="Email Address *"
                                    value={currentUser.email}
                                    disabled
                                    InputProps={{ readOnly: true }}
                                />
                                <TextField
                                    label="New Password *"
                                    type="password"
                                    value={newPassword}
                                    onChange={({ target }) => setNewPassword(target.value)}
                                    />
                                <div className="text-fields__with-icon">
                                    <TextField
                                        label="Repeat New Password *"
                                        type="password"
                                        value={newPasswordRepeat}
                                        disabled={!newPassword || newPassword.length < 6}
                                        onChange={({ target }) => setNewPasswordRepeat(target.value)}
                                    />
                                    {newPassword && newPasswordRepeat && newPassword === newPasswordRepeat && <div className="icon"><Save color="secondary" onClick={() => updatePersonDetails('newPassword')} /></div>}
                                </div>
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