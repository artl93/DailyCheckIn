import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#043862',
    },
    form: {
      marginTop:20,
      marginLeft:50,
      marginRight:50,
      backgroundColor:'#043862',
      color: 'white'
    },

    navigator: {
      backgroundColor: '#043862',
      color: '#ffffff'
    },

    contentContainer: {
      paddingTop: 30,
    },

    optionIconContainer: {
      marginRight: 12,
    },
    option: {
      backgroundColor: '#043862',
      paddingHorizontal: 15,
      paddingVertical: 15,
      borderWidth: StyleSheet.hairlineWidth,
      borderBottomWidth: 0,
      borderColor: '#ededed',
    },
    lastOption: {
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    optionText: {
      fontSize: 15,
      alignSelf: 'flex-start',
      marginTop: 1,
      color:'white'
    },


    developmentModeText: {
      marginBottom: 20,
      color: 'rgba(0,0,0,0.4)',
      fontSize: 14,
      lineHeight: 19,
      textAlign: 'center',
    },

    welcomeContainer: {
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 20,
    },
    welcomeImage: {
      width: 100,
      height: 80,
      resizeMode: 'contain',
      marginTop: 3,
      marginLeft: -10,
    },
    getStartedContainer: {
      alignItems: 'center',
      marginHorizontal: 50,
    },
    homeScreenFilename: {
      marginVertical: 7,
    },
    codeHighlightText: {
      color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
      backgroundColor: 'rgba(0,0,0,0.05)',
      borderRadius: 3,
      paddingHorizontal: 4,
    },
    getStartedText: {
      fontSize: 17,
      color: 'rgba(96,100,109, 1)',
      lineHeight: 24,
      textAlign: 'center',
    },
    tabBarInfoContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      ...Platform.select({
        ios: {
          shadowColor: 'black',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        android: {
          elevation: 20,
        },
      }),
      alignItems: 'center',
      backgroundColor: '#fbfbfb',
      paddingVertical: 20,
    },
    tabBarInfoText: {
      fontSize: 17,
      color: 'rgba(96,100,109, 1)',
      textAlign: 'center',
    },
    navigationFilename: {
      marginTop: 5,
    },
    helpContainer: {
      marginTop: 15,
      alignItems: 'center',
    },
    helpLink: {
      paddingVertical: 15,
    },
    helpLinkText: {
      fontSize: 14,
      color: '#2e78b7',
    },
  
    buttonText: {
      fontSize: 18,
      color: 'white',
      alignSelf: 'center'
    },
    blackButtonText: {
      fontSize: 18,
      color: 'black',
      alignSelf: 'center'
    },
    button: {
      height: 42,
      fontFamily: 'Roboto',
      fontSize: 14,
      lineHeight: 16,
      borderColor: '#ffffff',
      borderWidth: 1,
      marginTop:10,
      marginBottom: 10,
      alignSelf: 'stretch',
      justifyContent: 'center'
    },
    googleButton: {
      height: 42,
      fontFamily: 'Roboto',
      fontSize: 14,
      lineHeight: 16,
      backgroundColor:'#ffffff',
      borderColor: '#ffffff',
      borderWidth: 1,
      marginTop:10,
      marginBottom: 10,
      alignSelf: 'stretch',
      justifyContent: 'center'
    }

  });

  export default styles;