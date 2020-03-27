import * as React from 'react'
import { Alert,Picker, Text, TouchableHighlight, View, Switch } from 'react-native'
import styles from '../styles/styles'
import Spinner from 'react-native-loading-spinner-overlay'

import { ScrollView } from 'react-native-gesture-handler'
import * as WebBrowser from 'expo-web-browser'

import {insert} from '../apis/dcidb'

const Countries = 
[ '- none -',
  'Italy',
  'China',
  'South Korea',
  'Japan',
  'Other country' ]



const wongBakerScale = {  0:'No issue',
                          1:'Just a little',
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
        fever: this.state.fever,
        cough: this.state.cough,
        feeling:this.state.feeling,
        shortnessOfBreath: this.state.shortnessOfBreath,
        tiredness: this.state.tiredness,
        contact:this.state.contact,
        soreThroat:this.state.soreThroat,
        countryVisited:this.state.countryVisited
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
              alertMsg = 'Updated'
              alertTitle = 'Gotcha'
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

          <View style={styles.welcomeContainer}>
            <Text>{new Date().toUTCString()}</Text>
          </View>

          <View style={styles.form}>

            {/* Overall Feeling */}

            <Text style={styles.questionText}>Overall, how poorly do you feel today?</Text>
            <View style={styles.ratingContainer}>
              { downScale.map( (key) =>
                  <TouchableHighlight key={key} style={[styles.button,styles.ratingButton, this.isEqual(this.state.feeling,key) && styles.selected ]}
                    onPress={ () => this.setState({feeling: key})}>
                    <Text style={[styles.ratingButtonText,this.isEqual(this.state.feeling,key) && styles.selectedButton ]}>{wongBakerScale[key]}</Text>
                  </TouchableHighlight>
              )}
            </View>

            {/* Symptoms */}

            <Text style={styles.questionText}>Please rate these symptoms you may be experiencing right now:</Text>
            
            <Text style={styles.ratingText}>Sore Throat</Text>
            <View style={styles.ratingContainer}>
            { downScale.map( (key) =>
                <TouchableHighlight key={key} style={[styles.button,styles.ratingButton, this.isEqual(this.state.soreThroat,key) && styles.selected ]}
                  onPress={ () => this.setState({soreThroat: key})}>
                  <Text style={[styles.ratingButtonText,this.isEqual(this.state.soreThroat,key) && styles.selectedButton ]}>{wongBakerScale[key]}</Text>
                </TouchableHighlight>
            )}
            </View>

            <Text style={styles.ratingText}>Dry Cough</Text>
            <View style={styles.ratingContainer}>
            { downScale.map( (key) =>
                <TouchableHighlight key={key} style={[styles.button,styles.ratingButton, this.isEqual(this.state.cough,key) && styles.selected ]}
                  onPress={ () => this.setState({cough: key})}>
                  <Text style={[styles.ratingButtonText,this.isEqual(this.state.cough,key) && styles.selectedButton ]}>{wongBakerScale[key]}</Text>
                </TouchableHighlight>
            )}
            </View>

            <Text style={styles.ratingText}>Shortness of breath</Text>
            <View style={styles.ratingContainer}>
            { downScale.map( (key) =>
                <TouchableHighlight key={key} style={[styles.button,styles.ratingButton, this.isEqual(this.state.shortnessOfBreath,key) && styles.selected ]}
                  onPress={ () => this.setState({shortnessOfBreath: key})}>
                  <Text style={[styles.ratingButtonText,this.isEqual(this.state.shortnessOfBreath,key) && styles.selectedButton ]}>{wongBakerScale[key]}</Text>
                </TouchableHighlight>
            )}
            </View>

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
}



export default HomeScreen