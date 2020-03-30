import * as React from 'react'
import { Alert,Picker, Text, TouchableHighlight, View, Switch } from 'react-native'
import styles from '../styles/styles'
import Spinner from 'react-native-loading-spinner-overlay'
import RatedQuestion from '../components/RatedQuestion'
import NumericInput from 'react-native-numeric-input'

import { ScrollView, TextInput } from 'react-native-gesture-handler'
import * as WebBrowser from 'expo-web-browser'

import {insert} from '../apis/dcidb'

class HomeScreen extends React.Component {

  state = {
    // user state (TODO - pull this into its own model)
    feelingRating:0,
    feverChillsRating:0,
    temperature:98.6,
    coughRating:0,
    shortnessOfBreathRating:0,
    soreThroatRating:0,
    fatigueRating:0,
    nauseaRating:0,
    abdominalPainRating:0,
    diarrheaRating:0,

   // form UI state
    spinner:false,
    spinnerText:'Saving...',
    alertIsO: false,
    temperatureIsVisible: false
  }

  clearAllVAlues(){
    this.setState({
      feelingRating:0,
      feverChillsRating:0,
      temperature:98.6,
      coughRating:0,
      shortnessOfBreathRating:0,
      soreThroatRating:0,
      fatigueRating:0,
      nauseaRating:0,
      abdominalPainRating:0,
      diarrheaRating:0,
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
        PatientId:'blogs@blogs.com', 
        GeneralFeeling:this.state.feelingRating,
        Fever_Rating:this.state.feverChillsRating,
        HighestTemperature: this.state.temperature,
        Cough_Rating : this.state.coughRating,  
        ShortnessOfBreath_Rating: this.state.shortnessOfBreathRating,
        SoreThroat_Rating: this.state.soreThroatRating,
        Tired_Rating: this.state.fatigueRating,
        NauseaOrVomiting_Rating: this.state.nauseaRating,
        AbdominalPain_Rating: this.state.abdominalPainRating,
        Diarrhea_Rating : this.state.diarrheaRating
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

  handleTemperature = (value) => {
    this.setState({temperature: value})
  }

  setFeverChillsRating = (value) => {
    this.setState({feverChillsRating:value})
    if (value !== 0)
      this.state.temperatureIsVisible = true
   else
     this.state.temperatureIsVisible = false
     this.state.temperature = 98.6
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

            {/* Overall Feeling */}


            {/* Symptoms */}

            <Text style={styles.questionText}>Please tell us about your experience in the last hour:</Text>

            <RatedQuestion questionText='How poorly are you feeling overall?' value={this.state.feelingRating}
                           parentSetState={ (keySelected) => this.setState({feelingRating:keySelected})}/>
            
            <RatedQuestion questionText='Fever / chills' value={this.state.feverChillsRating}
                           parentSetState={ (keySelected) => this.setFeverChillsRating(keySelected)}/>

            {this.state.temperatureIsVisible ? (
              <View style={styles.container} visible={this.state.temperatureIsVisible}>
                  <Text style={styles.ratingText}>Temperature (°F)</Text>
                  <NumericInput
                              value={this.state.temperature}
                              placeholder={this.state.temperature}
                              step={0.1}
                              valueType='real'
                              onChange={value => this.handleTemperature(value)}/>
              </View>
            ) : null }



            <RatedQuestion questionText='Dry Cough' value={this.state.coughRating}
                           parentSetState={ (keySelected) => this.setState({coughRating:keySelected})}/>
            <RatedQuestion questionText='Shortness of Breath' value={this.state.shortnessOfBreathRating}
                           parentSetState={ (keySelected) => this.setState({shortnessOfBreathRating:keySelected})}/>
            <RatedQuestion questionText='Sore throat' value={this.state.soreThroatRating}
                           parentSetState={ (keySelected) => this.setState({soreThroatRating:keySelected})}/>
            <RatedQuestion questionText='Fatigue' value={this.state.fatigueRating}
                           parentSetState={ (keySelected) => this.setState({fatigueRating:keySelected})}/>
            <RatedQuestion questionText='Nausea / vomiting' value={this.state.nauseaRating}
                           parentSetState={ (keySelected) => this.setState({nauseaRating:keySelected})}/>
            <RatedQuestion questionText='Abdominal pain' value={this.state.abdominalPainRating}
                           parentSetState={ (keySelected) => this.setState({abdominalPainRating:keySelected})}/>
            <RatedQuestion questionText='Diarrhea' value={this.state.diarrheaRating}
                           parentSetState={ (keySelected) => this.setState({diarrheaRating:keySelected})}/>

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


HomeScreen.navigationOptions = {
  header: null,
}



export default HomeScreen