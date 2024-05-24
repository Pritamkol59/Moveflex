import { StyleSheet, Text, View ,Image} from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Images from '../theams/Images';
import normalize from 'react-native-normalize';
import Colors from '../theams/Colors';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigateToHome();
    }, 5000); // 5 seconds delay
  }, []);

  function navigateToHome() {
    navigation.replace('Home');
  }

  return (
    <View style={styles.contener}>


     <Text style={styles.text}>MOVIEFIX</Text> 
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
    contener:{
        flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:Colors.black,
    },
    Splash:{
        height:normalize(300),
        width:normalize(350)
    },
    text:{
        marginTop:normalize(20),
        fontWeight:'bold',
        fontSize:normalize(58),
        color:Colors.red,
    }
});
