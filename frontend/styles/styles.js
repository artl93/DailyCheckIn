import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E5E5E5',
    },
    containerLogin: {
      flex: 1,
      backgroundColor: '#043862',
    },
    form: {
      marginLeft:50,
      marginRight:50
    },
    bold: {
      fontWeight:"bold"
    },
    privacy:{
      marginLeft:50,
      marginRight:50,
      marginBottom:40
    },
    privacyText: {
      fontStyle: 'normal',
      fontWeight: '300',
      fontSize: 16,
      lineHeight: 22,
      /* or 137% */
      
      letterSpacing: 0.5,
      
      /* Text / Hover-Pressed text */
      
      color: '#201F1E',
      marginTop:20
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
      paddingHorizontal: 15,
      paddingVertical: 15,
      borderWidth: StyleSheet.hairlineWidth,
      borderBottomWidth: 0,
      borderColor: '#ededed',
    },
    lastOption: {
      borderBottomWidth: StyleSheet.hairlineWidth,
    },

    buttonGroup:{ 
      flexDirection: 'row',
      marginTop:50,
      marginBottom: 50 
    },


    sideBySideL:{
      width:'50%',
      marginRight:6
    },
    
    sideBySideR:{
      width:'50%',
      marginLeft:6
    },



    optionText: {
      fontSize: 15,
      alignSelf: 'flex-start',
      marginTop: 1,
      color:'#201F1E'
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

    question: {
      display:'flex',
      flexDirection:'row',
      textAlignVertical:'center',
      alignContent:"stretch",
      justifyContent:"flex-start",
      padding:8
    },
    questionText: {
      fontSize: 16,
      marginTop:20,
      marginBottom:10,
      color: '#201F1E',
      alignSelf: 'flex-start'
    },

    ratingText: {
      fontSize: 12,
      fontWeight: 'bold',
      marginTop:10,
      marginBottom:10,
      color: '#201F1E',
      alignSelf: 'auto'
    },
    
    buttonText: {
      fontSize: 18,
      color: '#201F1E',
      alignSelf: 'center'
    },

    ratingContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-evenly',
      flexDirection:'row'
    },

    ratingButton: {
      margin:2,
      width:40,
      display:'flex',
      borderRadius:20
    },

    ratingButtonText: {
      fontSize: 10,
      color: '#201F1E',
      alignSelf: 'center',
      textAlign: 'center'
    },

    buttonLoginText: {
      fontSize: 18,
      color: '#ffffff',
      alignSelf: 'center'
    },
    blackButtonText: {
      fontSize: 18,
      color: 'black',
      alignSelf: 'center'
    },
    button: {
      height: 42,
      borderColor: '#201F1E',
      borderWidth: 1,
      marginTop:10,
      marginBottom: 10,
      alignSelf: 'stretch',
      justifyContent: 'center'
    },
    selected: {
      backgroundColor: '#6979F8',
      borderColor: '#6979F8',
    },
    selectedButton: {
      color:'white'
    },
    buttonLogin: {
      height: 42,
      borderColor: '#ffffff',
      borderWidth: 1,
      marginTop:10,
      marginBottom: 10,
      alignSelf: 'stretch',
      justifyContent: 'center'
    },
    googleButton: {
      height: 42,
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