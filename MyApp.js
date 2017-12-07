import React from 'react';
import { connect } from 'react-redux';

import IntroScreen from './containers/IntroScreen';
import PendingScreen from './containers/PendingScreen';
import ValidationScreen from './containers/ValidationScreen';
import LoginScreen from './containers/LoginScreen';
import DashboardScreen from './containers/DashboardScreen';
import AccountScreen from './containers/AccountScreen';
import InviteScreen from './containers/InviteScreen';
import AccountInfoScreen from './containers/AccountInfoScreen';
import PaymentInfoScreen from './containers/PaymentInfoScreen';
import SignupScreen from './containers/SignupScreen';
import ResetPasswordScreen from './containers/ResetPasswordScreen';

import { StackNavigator } from 'react-navigation';

class MyApp extends React.Component {
    render() {
        const { isAuthenticated, isRegistered/*, profileUpdateSuccess*/ } = this.props;

        const MainNavigator = StackNavigator({
            Intro: { screen: IntroScreen },
            LogIn: { screen: LoginScreen },
            Pending: { screen: PendingScreen },
            Validation: { screen: ValidationScreen },
            Signup: { screen: SignupScreen },
            ResetPassword: { screen: ResetPasswordScreen },
        });

        const MainNavigator1 = StackNavigator({
            Dashboard: { screen: DashboardScreen },
            Account: { screen: AccountScreen },
            Invite: { screen: InviteScreen },
            AccountInfo: { screen: AccountInfoScreen },
            PaymentInfo: { screen: PaymentInfoScreen },
        }, {
            mode: 'modal',
            headerMode: 'none',
        }, );

        const MainNavigator2 = StackNavigator({
            Pending: { screen: PendingScreen },
            Intro: { screen: IntroScreen },
            LogIn: { screen: LoginScreen },
            Validation: { screen: ValidationScreen },
            Signup: { screen: SignupScreen },
            ResetPassword: { screen: ResetPasswordScreen },
        });

        const MainNavigator3 = StackNavigator({
            Account: { screen: AccountScreen },
            Dashboard: { screen: DashboardScreen },            
            Invite: { screen: InviteScreen },
            AccountInfo: { screen: AccountInfoScreen },
            PaymentInfo: { screen: PaymentInfoScreen },
        }, {
            mode: 'modal',
            headerMode: 'none',
        }, );

        /*if (profileUpdateSuccess) {
            //return <MainNavigator3 />;
            
        }
        else*/ if (isAuthenticated)
            return <MainNavigator1 />;
        else if (isRegistered)
            return <MainNavigator2 />;
        
        return (
            <MainNavigator />
        );
    }
}

const mapStateToProps = function(state) {
    const { user, profile } = state;
    return {
        isRegistered: user.isRegistered,
        isAuthenticated: user.isAuthenticated,
        //profileUpdateSuccess: profile.updateSuccess,
    }
};

export default connect(mapStateToProps)(MyApp);