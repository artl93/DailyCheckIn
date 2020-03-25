import * as React from 'react';
import { Image, Text, TouchableHighlight, View, Switch, Button } from 'react-native';
import styles from '../styles/styles'

import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

import t from 'tcomb-form-native'; // 0.6.9

import {insert} from '../apis/dcidb'

var customStylesheet = require('../styles/bootstrap')

// override globally the default stylesheet


var CList = t.enums({
  I: 'Italy',
  C: 'China',
  S: 'South Korea',
  J: 'Japan',
  O: 'Other country'
});

var Feeling = t.enums({
  1: 'Great',
  2: 'OK',
  3: 'Average',
  4: 'Bad',
  5: 'Terrible'
});

const Form = t.form.Form;


const User = t.struct({
  email: t.String,
  username: t.String,
  password: t.String,
  terms: t.Boolean
});

const MyInfo = t.struct({
  feeling:t.maybe(Feeling),
  fever:t.Boolean,
  shortnessOfBreath: t.Boolean,
  cough: t.Boolean,
  tiredness: t.Boolean,
  contact:t.Boolean,
  countries:t.maybe(CList)
});

var options = {
  stylesheet: customStylesheet,
  fields: {
    feeling: {
      label: 'Overall, how do you feel today?' 
    },
    fever: {
      label: '\nDo you have any of these?\n\nFever'
    },
    cough: {
      label: 'Dry cough'
    },
    contact: {
      label: '\nHave you been in contact with anyone who tested postitive to COVID-19?'
    },
    countries: {
      label: '\nHave you been to any of the countries below?'
    }
  }

};

class HomeScreen extends React.Component {


  getOneOrZero(value) {
    return value ? '1' : '0'
  }

  cancel = () => {

  }

  submit = () => {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue()

    console.log(value)
    if (!value) {
      alert('Missing fields') 
    } else {

    const userData = 
      { email: 'blogs@blogs.com',
        fever: this.getOneOrZero(value.fever),
        cough: this.getOneOrZero(value.cough),
        feeling:value.feeling,
        shortnessOfBreath: this.getOneOrZero(value.shortnessOfBreath),
        tiredness: this.getOneOrZero(value.tiredness),
        contact:this.getOneOrZero(value.contact),
        countries:value.countries
      }

      insert( userData ).then( (data) => {
         try {
            alert( data.result )
         } catch (exception) {
           alert(exception)
         }
      })
    }

  }

  render = function() {
    return (
      <View style={styles.container}>

        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

          <View style={styles.welcomeContainer}>
            <Text>{new Date().toUTCString()}</Text>
          </View>
          <View style={[styles.form,{dislay:'flex', flexDirection:'row'}]}>
            <TouchableHighlight style={[styles.button,styles.likertButton]}>
              <Text styles={{selfAlign:'center'}}>Great</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.button,styles.likertButton]}>
              <Text style={styles.likertButtonText}>Good</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.button,styles.likertButton]}>
              <Text>OK</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.button,styles.likertButton]}>
              <Text>Unwell</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.button,styles.likertButton]}>
              <Text>Help!</Text>
            </TouchableHighlight>

          </View>
          <View style={styles.form}>
            <Form ref="form" type={MyInfo} style={styles.form} options={options}/> 
            <View style={{ flexDirection: 'row',marginBottom:30 }}>
              <TouchableHighlight style={[styles.button,styles.selected,styles.sideBySideL]} onPress={this.submit} >
                <Text style={[styles.buttonText,styles.selectedButton]}>Submit</Text>
              </TouchableHighlight>
              <TouchableHighlight style={[styles.button,styles.sideBySideR]} onPress={this.onPress} >
                <Text style={styles.buttonText}>Clear</Text>
              </TouchableHighlight>
            </View>
          </View>

        </ScrollView>

      </View>
    );
  }

}


HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use useful development
        tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}


function handleLearnMorePress() {
  WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
  );
}



export default HomeScreen;