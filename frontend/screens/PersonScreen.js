import * as React from 'react'
import { Alert,Picker, Text, TouchableHighlight, View, Switch } from 'react-native'
import styles from '../styles/styles'
import Spinner from 'react-native-loading-spinner-overlay'
import MultipleChoice from '../components/MultipleChoice'

import { ScrollView,  } from 'react-native-gesture-handler'

import {insert} from '../apis/dcpdb'



import Questions from '../constants/Questions'

class PersonScreen extends React.Component {

  state = {
    // user state (TODO - pull this into its own model)
    location:null,
    ageGroup:Questions.STARTER_AGE,
    gender:null,
    diabetes:null,
    cancer:null,
    pregnancy:null,
    asthma:null,
    heartKidneyOrLiver:null,
    weakImune:null,
    traveled:null,
    contact:null,
    fluVaccine:null,

   // form UI state
    spinner:false,
    spinnerText:'Saving...',
  }

  clearAllVAlues(){
    this.setState({
      location:null,
      ageGroup:Questions.STARTER_AGE,
      gender:null,
      diabetes:null,
      cancer:null,
      pregnancy:null,
      asthma:null,
      heartKidneyOrLiver:null,
      weakImune:null,
      traveled:null,
      contact:null,
      fluVaccine:null,
    })
  }

  isEqual(v1,v2) {
    return v1 === v2
  }

  submit =() => {

    this.setState( {spinner:true})

    let userData = 
      { 
        location:this.state.location,
        ageGroup:this.state.ageGroup,
        gender:this.state.location,
        diabetes:this.state.diabetes,
        cancer:this.state.cancer,
        pregnancy:this.state.pregnancy,
        asthma:this.state.asthma,
        heartKidneyOrLiver:this.state.heartKidneyOrLiver,
        weakImune:this.state.weakImune,
        traveled:this.state.traveled,
        contact:this.state.contact,
        fluVaccine:this.state.fluVaccine,
        email: 'blogs@blogs.com'
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

            {/* <Text style={styles.questionText}>Where are you located?</Text>
                // still working in this */}

            <Text style={styles.questionText}>What is your age?</Text>
            <Picker selectedValue ={this.state.ageGroup} onValueChange = {(value) => this.setState({ageGroup:value})}>
              {Questions.AGE_GROUP.map((key) =>
                <Picker.Item label={key} value={key} />
              )}
            </Picker>

            <Text style={styles.questionText}>What is your gender?</Text>
            <MultipleChoice value={this.state.gender}
                            answers = {Questions.GENDER}
                            parentSetState={ (keySelected) => this.setState({gender:keySelected})}/>

            <Text style={styles.questionText}>Have you traveled outside your home country in the last 14 days? </Text>
            <MultipleChoice value={this.state.travelled}
                            answers = {Questions.YES_NO}
                            parentSetState={ (keySelected) => this.setState({travelled:keySelected})}/>

            <Text style={styles.questionText}>To the best of your knowledge, have you been in close contact with anyone who has a confirmed case of COVID-19? </Text>
            <MultipleChoice value={this.state.contact}
                            answers = {Questions.YES_NO}          
                            parentSetState={ (keySelected) => this.setState({contact:keySelected})}/>

            <Text style={styles.questionText}>Have you received a flu vaccine in the last 6 months? </Text>
            <MultipleChoice value={this.state.fluVaccine}
                            answers = {Questions.YES_NO}
                            parentSetState={ (keySelected) => this.setState({fluVaccine:keySelected})}/>

            <Text style={styles.questionText}>Have you been tested for COVID-19?</Text>
            <MultipleChoice value={this.state.tested}
                            answers = {Questions.YES_NO}
                            parentSetState={ (keySelected) => this.setState({tested:keySelected})}/>

            <Text style={styles.questionText}>Do you have any of the following conditions?</Text>

            <MultipleChoice  questionText='Diabetes' value={this.state.diabetes}
                            answers = {Questions.YES_NO}
                            parentSetState={ (keySelected) => this.setState({diabetes:keySelected})}/>

            <MultipleChoice questionText='Cancer' value={this.state.cancer}
                            answers = {Questions.YES_NO}
                            parentSetState={ (keySelected) => this.setState({cancer:keySelected})}/>

            <MultipleChoice questionText='Pregnancy' value={this.state.pregnancy}
                            answers = {Questions.YES_NO}
                            parentSetState={ (keySelected) => this.setState({pregnancy:keySelected})}/> 

            <MultipleChoice questionText='Asthma or chronic lung disease ' value={this.state.asthma}
                            answers = {Questions.YES_NO}
                            parentSetState={ (keySelected) => this.setState({asthma:keySelected})}/>

            <MultipleChoice questionText='Heart, kidney, or liver conditions ' value={this.state.heartKidneyOrLiver}
                            answers = {Questions.YES_NO}
                            parentSetState={ (keySelected) => this.setState({heartKidneyOrLiver:keySelected})}/>

            <MultipleChoice questionText='Weakened immune system ' value={this.state.weakImune}
                            answers = {Questions.YES_NO}
                            parentSetState={ (keySelected) => this.setState({weakImune:keySelected})}/>


            <View style={styles.buttonGroup}>
              <TouchableHighlight style={[styles.button,styles.sideBySideL]} onPress={() => this.clearAllVAlues() } >
                <Text style={styles.buttonText}>Clear</Text>
              </TouchableHighlight>
              <TouchableHighlight style={[styles.button,styles.selected,styles.sideBySideR]} onPress={this.submit} >
                <Text style={[styles.buttonText,styles.selectedButton]}>Save</Text>
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