import React, { Component } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import styles from '../styles/styles'
import PropTypes from 'prop-types';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';


const wongBakerScale = {  0:'No issue',
                            1:'Just a little',
                            2:'A little more',
                            3:'Even more',
                            4:'A whole lot',
                            5:'Worst'}

const scale = [0,1,2,3,4,5]

class RatedQuestion extends React.Component  {

    // static propTypes = {
    //   // containerStyle: PropTypes.style,
    //   // style: PropTypes.style,
    //   // autoFocus: PropTypes.bool,
    //   questionText: PropTypes.string,
    //   value: PropTypes.number,
    // }

    isEqual(v1,v2) {
      return v1 === v2
    }

  renderButtons(thisValue) {
    return scale.map( ( key) => {
    <TouchableHighlight key={key} style={[styles.button,styles.ratingButton, this.isEqual(thisValue,key) && styles.selected ]}
            onPress={ () => this.props.parentSetState({thisValue: key})}>
        <Text style={[styles.ratingButtonText, this.isEqual(thisValue,key) && styles.selectedButton ]}>{wongBakerScale[key]}</Text>
    </TouchableHighlight>
    });
  }

  render() {

      return(

        <View>
            <Text style={styles.questionText}>
              {this.props.questionText}
            </Text>
            <View style={styles.ratingContainer}>
            { scale.map( (key) =>
                <TouchableHighlight key={key} style={[styles.button,styles.ratingButton, this.isEqual(this.props.value,key) && styles.selected ]}
                  onPress={ () => {
                    // this.props.value = key
                    // this.props.parentSetState({that.props.value:that.key)
                    alert('pressed ' + key)
                  }}>
                  <Text style={[styles.ratingButtonText,this.isEqual(this.props.value,key) && styles.selectedButton ]}>{wongBakerScale[key]}</Text>
                </TouchableHighlight>
            )}
            </View>
        </View>
      )
  }
}

export default RatedQuestion