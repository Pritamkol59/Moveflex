

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import Colors from '../theams/Colors'
import Movidetailes from '../components/Movidetailes'

const Home = () => {
  return (
    <View style={styles.container}>
      <Header/>
      <Movidetailes/>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container:{
    height:'100%',
    backgroundColor:Colors.darlblack,
  }

})