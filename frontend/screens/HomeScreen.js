import * as React from 'react';
import { Alert,Picker, Text, TouchableHighlight, View, Switch, Button } from 'react-native';
import styles from '../styles/styles'
import Spinner from 'react-native-loading-spinner-overlay'
import RatedQuestion from '../components/RatedQuestion'

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



const wongBakerScale = {  0:'No issue',
                          1:'Just a litte',
                          2:'A little more',
                          3:'Even more',
                          4:'A whole lot',
                          5:'Worst'}

const downScale = [0,1,2,3,4,5]

class HomeScreen extends React.Component {

  state = {
    feeling:0,
    fever:false,
    shortnessOfBreath: 0,
    cough: 0,
    tiredness: 0,
    soreThroat: 0,
    contact: false,
    countryVisited: Countries[0],
    spinner:false,
    spinnerText:'Saving...',
    alertIsOn:false
  } 

  clearAllVAlues(){
    this.setState({
      feeling:0,
      fever:false,
      shortnessOfBreath: 0,
      cough: 0,
      tiredness: 0,
      soreThroat: 0,
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

        symptoms: {},

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

  setSoreThroat (newValue) {
    this.setState({ soreThroat: newValue})
  }

  setSymptom( symptomName, symptomValue) {
    this.setState( {symptom: {... 
                              symptomName = symptomValue }})
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


            {/* Symptoms */}

            <Text style={styles.questionText}>Please rate these symptoms you may be experiencing right now:</Text>
            
            <RatedQuestion questionText='Overall' value={this.state.feeling}
                           parentSetState={ (keySelected) => this.setState({feeling:keySelected})}/>
            <RatedQuestion questionText='Sore Throat' value={this.state.soreThroat}
                           parentSetState={ (keySelected) => this.setState({soreThroat:keySelected})}/>
            <RatedQuestion questionText='Dry Coug' value={this.state.cough}
                           parentSetState={ (keySelected) => this.setState({cough:keySelected})}/>
            <RatedQuestion questionText='Shortness of breath' value={this.state.shortnessOfBreath}
                           parentSetState={ (keySelected) => this.setState({shortnessOfBreath:keySelected})}/>


            <View style={styles.question}>
              <Switch value={this.state.fever} onValueChange={ (value) => this.setState( {fever: value}) }style={{marginRight:5}}></Switch>
              <Text style={styles.buttonText}>Fever</Text>
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