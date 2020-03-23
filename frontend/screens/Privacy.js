import * as React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import styles from '../styles/styles'

import { ScrollView } from 'react-native-gesture-handler';


class Privacy extends React.Component {

  render = () => {
    return (
      <View style={styles.container}>

        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.privacy}>
            <Text style={[styles.privacyText,styles.bold]}>Privacy Policy</Text>
            <Text style={styles.privacyText}>Your privacy is important to us. It is Brainstorming's policy to respect your privacy regarding any information we may collect from you across our website, and other sites we own and operate.</Text>

            <Text style={styles.privacyText}>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.</Text>

            <Text style={styles.privacyText}>We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.</Text>

            <Text style={styles.privacyText}>We don’t share any personally identifying information publicly or with third-parties, except when required to by law.</Text>

            <Text style={styles.privacyText}>Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.</Text>

            <Text style={styles.privacyText}>You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.></Text>

            <Text style={styles.privacyText}>Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.</Text>

            <Text style={styles.privacyText}>This policy is effective as of 5 November 2019.</Text>
            <TouchableHighlight style={[styles.button,styles.selected]} onPress={() => this.props.handleLogOn(true)} >
              <Text style={[styles.buttonText,styles.selectedButton]}>I've agreed with this</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button} onPress={() => this.props.declined()} >
              <Text style={styles.buttonText}>Decline</Text>
            </TouchableHighlight>
  
          </View>


        </ScrollView>

      </View>
    );
  }

}

export default Privacy;