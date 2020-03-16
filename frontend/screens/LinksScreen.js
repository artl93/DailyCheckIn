import * as React from 'react';
import {  Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import styles from '../styles/styles'

export default function LinksScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <OptionButton
        icon="md-school"
        label="USA - CDC website"
        onPress={() => WebBrowser.openBrowserAsync('https://www.cdc.gov/coronavirus/2019-ncov/index.html')}
      />

      <OptionButton
        icon="md-compass"
        label="AU - Department of Health website"
        onPress={() => WebBrowser.openBrowserAsync('https://www.health.gov.au/news/health-alerts/novel-coronavirus-2019-ncov-health-alert?utm_source=health.gov.au&utm_medium=redirect&utm_campaign=digital_transformation&utm_content=health-topics/novel-coronavirus-2019-ncov')}
      />

      <OptionButton
        icon="ios-chatboxes"
        label="UK - NHS website"
        onPress={() => WebBrowser.openBrowserAsync('https://www.nhs.uk/conditions/coronavirus-covid-19/')}
        isLastOption
      />
    </ScrollView>
  );
}

function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.optionIconContainer}>
          <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
      </View>
    </RectButton>
  );
}


