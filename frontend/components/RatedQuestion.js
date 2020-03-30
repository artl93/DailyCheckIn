import React, { Component } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import styles from '../styles/styles'
import PropTypes from 'prop-types';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';


const wongBakerScale = {  1:'No issue',
                            2:'Just a little',
                            3:'A little more',
                            4:'Even more',
                            5:'A whole lot',
                            6:'Worst'}



class RatedQuestion extends React.Component  {


  isEqual(v1,v2) {
    return v1 === v2
  }

  render() {

      return(

        <View>
            <Text style={styles.ratingText}>
              {this.props.questionText}
            </Text>
            <View style={styles.ratingContainer}>
              { Object.keys(wongBakerScale).map( (key) =>
                  <TouchableHighlight key={key} style={[styles.button,styles.ratingButton, this.isEqual(this.props.value,key) && styles.selected ]}
                    onPress={ () => this.props.parentSetState(key) }>
                    <Text style={[styles.ratingButtonText,this.isEqual(this.props.value,key) && styles.selectedButton ]}>{wongBakerScale[key]}</Text>
                  </TouchableHighlight>
              )}
            </View>
        </View>
      )
  }
}

export default RatedQuestion