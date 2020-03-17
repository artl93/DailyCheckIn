import * as React from 'react';
import { Image, Platform, Text, TouchableOpacity, TouchableHighlight, View } from 'react-native';
import styles from '../styles/styles'

import { ScrollView } from 'react-native-gesture-handler';

import t from 'tcomb-form-native'; // 0.6.9

var customStylesheet = require('../styles/bootstrap')

// override globally the default stylesheet


const Form = t.form.Form;


const User = t.struct({
  email: t.String,
  password: t.String,
});


const NewUser = t.struct({
  email: t.String,
  password: t.String,
  repeatPassword: t.String,
});

var options = {
  stylesheet: customStylesheet,
  // fields: {
  //   yourAge: {
  //     auto: 'placeholders'
  //   }
  // }
};

// Login with microsoft

const configMS = {
  issuer: `https://login.microsoftonline.com/${process.env.MS_TENANT_ID}`,
  clientId: process.env.MS_CLIENT_ID,
  redirectUrl: 'com.myapp://oauth/redirect',
  // scopes: ['openid', 'profile', 'email', 'offline_access']
};

// add other logon types here

// Google
const configGoogle = {
  issuer: 'https://login.microsoftonline.com/8ca09082-aa44-41c9-bd4e-7a6b59c90ba0',
  clientId: 'xx',
  redirectUrl: 'com.myapp://oauth/redirect',
  // scopes: ['openid', 'profile', 'email', 'offline_access']
};

// Facebook


class LoginScreen extends React.Component {

  state = {
    newUser : false
  }

  toggleSigUpLogin = () => {
    alert(this.state.newUser)
    this.setState((state, prop) => {
      return {newUser: !state.newUser};
    })
  }



  render = () => {
    return (
      <View style={styles.container}>

        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                require('../assets/images/logo.png')
              }
              style={styles.welcomeImage}
            />
          </View>
          <View style={styles.form}>
            <Form ref="form" 
              type={ 
                !this.state.newUser 
                ? User 
                : NewUser
              } 
              style={styles.form} 
              options={options}
            /> 
            <TouchableHighlight style={styles.button} onPress={
                async () => {
                      // const authState = await signInAsync(configMS);
                      // setAuthState(_authState);
                      this.props.handleLogOn(true)
                }
            }>
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableHighlight>

              <TouchableHighlight style={styles.googleButton} onPress={
                  async () => {
                        // const authState = await signInAsync(configMS);
                        // setAuthState(_authState);
                        this.props.handleLogOn(true)
                  }
              }>
              <Text style={styles.blackButtonText}>Sign in with Google</Text>
            </TouchableHighlight>

            <TouchableHighlight style={ {marginTop:30}}
              onPress={this.toggleSigUpLogin}
              >
              <Text style={styles.buttonText}>{
               !this.state.newUser 
               ? 'Sign up' 
               : 'Log in'
              }
              </Text>
            </TouchableHighlight>
          </View>

        </ScrollView>

      </View>
    );
  }

}




function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
  );
}



export default LoginScreen;