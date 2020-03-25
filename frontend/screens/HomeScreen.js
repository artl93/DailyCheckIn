import * as React from 'react';
import { Alert,Picker, Text, TouchableHighlight, View, Switch, Button } from 'react-native';
import styles from '../styles/styles'
import Spinner from 'react-native-loading-spinner-overlay'

import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

import {insert} from '../apis/dcidb'


const Countries = 
[ '- none -',
  'Italy',
  'China',
  'South Korea',
  'Japan',
  'Other country' ]



const likertScale = { 1:'Help!',
                      2:'Unwell',
                      3:'OK',
                      4:'Good',
                      5:'Great'}

const downScale = [5,4,3,2,1]

class HomeScreen extends React.Component {

  state = {
    feeling:3,
    fever:false,
    shortnessOfBreath: false,
    cough: false,
    tiredness: false,
    soreThroat: false,
    contact: false,
    countryVisited: Countries[0],
    spinner:false,
    spinnerText:'Saving...',
    alertIsOn:false
  } 

  clearAllVAlues(){
    this.setState({
      feeling:3,
      fever:false,
      shortnessOfBreath: false,
      cough: false,
      tiredness: false,
      soreThroat: false,
      contact: false,
      countryVisited: Countries[0] 
    })
  }

  isEqual(v1,v2) {
    return v1 === v2
  }

  submit =() => {

    this.setState( {spinner:true})

    const userData = 
      { email: 'blogs@blogs.com',
        fever: this.state.fever,
        cough: this.state.cough,
        feeling:this.state.feeling,
        shortnessOfBreath: this.state.shortnessOfBreath,
        tiredness: this.state.tiredness,
        contact:this.state.contact,
        soreThroat:this.state.soreThroat,
        countryVisited:this.state.countryVisited
      }

    this

    insert( userData ).then( (data) => {
         try {

            Alert.alert( 'Success!', 
            data.result,
            [
                    {text: 'Ok', onPress: () => this.setState(({spinner:false}))},
            ])

            // this.setState( {spinner:false})
         } catch (exception) {
          Alert.alert( 'Error!', 
          exception,
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

          <View style={styles.welcomeContainer}>
            <Text>{new Date().toUTCString()}</Text>
          </View>

          <View style={styles.form}>

            {/* Overall Feeling */}

            <Text style={styles.questionText}>Overall, how do you feel today?</Text>
            <View style={styles.likertContainer}>
              { downScale.map( (key) =>
                  <TouchableHighlight key={key} style={[styles.button,styles.likertButton, this.isEqual(this.state.feeling,key) && styles.selected ]}
                    onPress={ () => this.setState({feeling: key})}>
                    <Text style={[styles.likertButtonText,this.isEqual(this.state.feeling,key) && styles.selectedButton ]}>{likertScale[key]}</Text>
                  </TouchableHighlight>
              )}
            </View>

            {/* Symptoms */}

            <Text style={styles.questionText}>Do you have any of these symptoms?</Text>
            <View style={styles.question}>
              <Switch value={this.state.fever} onValueChange={ (value) => this.setState( {fever: value}) }style={{marginRight:5}}></Switch>
              <Text style={styles.buttonText}>Fever</Text>
            </View>
            <View style={styles.question}>
              <Switch value={this.state.shortnessOfBreath} onValueChange={ (value) => this.setState( {shortnessOfBreath: value}) }style={{marginRight:5}}></Switch>
              <Text style={styles.buttonText}>Shortness of breath</Text>
            </View>

            <View style={styles.question}>
              <Switch value={this.state.cough} onValueChange={ (value) => this.setState( {cough: value}) }style={{marginRight:5}}></Switch>
              <Text style={styles.buttonText}>Dry Cough</Text>
            </View>

            <View style={styles.question}>
              < Switch value={this.state.soreThroat} onValueChange={ (value) => this.setState( {soreThroat: value}) }style={{marginRight:5}}></Switch>
              <Text style={styles.buttonText}>Sore Throat</Text>
            </View>

            <Text style={styles.questionText}>Have you been in contact with anyone who tested positive to COVID-19?</Text>
            <View style={styles.question}>
              <Switch value={this.state.contact} onValueChange={ (value) => this.setState( {contact: value}) }style={{marginRight:5}}></Switch>
              <Text style={styles.buttonText}></Text>
            </View>

            <Text style={styles.questionText}>Have you visited any of the countries below within the last 14 days?</Text>
             
              <Picker
                selectedValue={this.state.countryVisited}
                style={{ marginTop:-20, width: '100%'}}
                onValueChange={(value) =>
                  this.setState({countryVisited: value})
                }>
                {Countries.map ( (value) => 
                    <Picker.Item key={value} label={value} value={value} />
                  )
                }
              </Picker>

              <View style={styles.buttonGroup}>
              <TouchableHighlight style={[styles.button,styles.selected,styles.sideBySideL]} onPress={this.submit} >
                <Text style={[styles.buttonText,styles.selectedButton]}>Submit</Text>
              </TouchableHighlight>
              <TouchableHighlight style={[styles.button,styles.sideBySideR]} onPress={() => this.clearAllVAlues() } >
                <Text style={styles.buttonText}>Clear</Text>
              </TouchableHighlight>
            </View>

          </View>

        </ScrollView>

      </View>
    )
  }

}


HomeScreen.navigationOptions = {
  header: null,
};



export default HomeScreen;