import * as React from 'react';
import {  Text, View } from 'react-native';
import styles from '../styles/styles'

import { ScrollView } from 'react-native-gesture-handler';


class ChartsScreen extends React.Component {


  render = function() {
    return (
      <View style={styles.container}>

        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

          <View style={styles.welcomeContainer}>
            <Text>{new Date().toUTCString()}</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.questionText}>Charts will go here</Text>
          </View>

        </ScrollView>

      </View>
    )
  }

}


ChartsScreen.navigationOptions = {
  header: null,
};

export default ChartsScreen;