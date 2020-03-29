import * as React from 'react'
import { Alert,Picker, Text, TouchableHighlight, View, Switch } from 'react-native'
import styles from '../styles/styles'
import Spinner from 'react-native-loading-spinner-overlay'


import { ScrollView,  } from 'react-native-gesture-handler'


import {insert} from '../apis/dcpdb'

import t from 'tcomb-form-native' // 0.6.9

var customStylesheet = require('../styles/bootstrap')

// override globally the default stylesheet


const Form = t.form.Form


const Person = t.struct({
  PostCode: t.String,
  country: t.String,
  otherInformation: t.String,
})


var options = {
  stylesheet: customStylesheet
}


class PersonScreen extends React.Component {

  state = {
    // user state (TODO - pull this into its own model)


   // form UI state
    spinner:false,
    spinnerText:'Saving...',
    alertIsO: false,
    temperatureIsVisible: false
  }

  clearAllVAlues(){
    this.setState({

    })
  }

  isEqual(v1,v2) {
    return v1 === v2
  }

  submit =() => {

    this.setState( {spinner:true})

    const userData = 
      { 
        // TODO: convert to make this non-static
        email: 'blogs@blogs.com',
      }

    insert( userData ).then( (data) => {
         try {

            let alertMsg, alertTitle, alertButton

            if (typeof data.error !== 'undefined') {
              alertMsg = data.error
              alertTitle = 'Error'
              alertButton = 'Cancel'
            } else  {
              console.log('result', data) 
              alertMsg = 'Thank you for submitting today.'
              alertTitle = 'Reporting Service'
              alertButton = 'Ok' 
            }
            
            Alert.alert( alertTitle, 
            alertMsg,
            [
              {text: alertButton, onPress: () => this.setState(({spinner:false}))},
            ])

         } catch (exception) {

            const error = (typeof exception !== 'undefined') ? exception.message : "Network error"

            Alert.alert( 'Error!', 
            error,
            [
              {text: 'Cancel', onPress: () => this.setState(({spinner:false}))},
            ])        
         }
      })

  }


  render = function() {
    return (
      <View style={styles.container}>

        <Spinner
                visible={this.state.spinner}
                textContent={this.spinnerText}
        />
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

          <View style={styles.form}>


            <Form ref="form" 
                  type={ Person } 
                  style={styles.form} 
                  options={options}
            /> 


            <View style={styles.buttonGroup}>
              <TouchableHighlight style={[styles.button,styles.sideBySideL]} onPress={() => this.clearAllVAlues() } >
                <Text style={styles.buttonText}>Clear</Text>
              </TouchableHighlight>
              <TouchableHighlight style={[styles.button,styles.selected,styles.sideBySideR]} onPress={this.submit} >
                <Text style={[styles.buttonText,styles.selectedButton]}>Submit</Text>
              </TouchableHighlight>
            </View>

          </View>

        </ScrollView>

      </View>
    )
  }

}


PersonScreen.navigationOptions = {
  header: null,
}



export default PersonScreen