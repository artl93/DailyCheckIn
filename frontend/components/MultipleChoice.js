import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native'
import styles from '../styles/styles'




class MultipleChoice extends React.Component  {


  isEqual(v1,v2) {
    return v1 === v2
  }

  render() {

      return(

        <View>
            {(typeof this.props.questionText !== 'undefined') && 
              <Text style={styles.ratingText}>
                {this.props.questionText}
              </Text>
            }
            <View style={styles.ratingContainer}>
              { Object.keys(this.props.answers).map( (key) =>
                  <TouchableHighlight key={key} style={[styles.button,styles.ratingButton, this.isEqual(this.props.value,key) && styles.selected ]}
                    onPress={ () => this.props.parentSetState(key) }>
                    <Text style={[styles.ratingButtonText,this.isEqual(this.props.value,key) && styles.selectedButton ]}>{this.props.answers[key]}</Text>
                  </TouchableHighlight>
              )}
            </View>
        </View>
      )
  }
}

export default MultipleChoice