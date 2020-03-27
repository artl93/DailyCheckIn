import React, { Component } from 'react';
import { Alert,Picker, Text, TouchableHighlight, View, Switch, Button } from 'react-native';
import styles from '../styles/styles'
import PropTypes from 'prop-types';


const wongBakerScale = {  0:'No issue',
                            1:'Just a litte',
                            2:'A little more',
                            3:'Even more',
                            4:'A whole lot',
                            5:'Worst'}

const scale = [0,1,2,3,4,5]

export default class RatedQuestion extends Component {

static propTypes = {
    // containerStyle: PropTypes.style,
    // style: PropTypes.style,
    // autoFocus: PropTypes.bool,
    questionText: PropTypes.string,
    value: PropTypes.number,
    }

  renderButtons(thisValue) {
    return scale.map( ( key) => {
    <TouchableHighlight key={key} style={[styles.button,styles.ratingButton, this.isEqual(thisValue,key) && styles.selected ]}
            onPress={ () => this.setState({thisValue: key})}>
        <Text style={[styles.ratingButtonText, this.isEqual(thisValue,key) && styles.selectedButton ]}>{wongBakerScale[key]}</Text>
    </TouchableHighlight>
    });
  }

  render() {

      return(
        <View>
            <Text style={styles.questionText} Text={this.props.questionText}/>
            <View style={styles.ratingContainer}>
            {
                this.renderButtons(this.props.value) 
            }
            </View>
        </View>
      )
    }
}