/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{ useState,useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Image,
  Pressable
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import axios from 'axios';
import { Provider as PaperProvider ,Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
function HomeScreen(props) {
  const [Characters,setCharacters] = useState([])
  
  const values = ['Brussels', 'Cairo', 'Casablanca', 'Cangzhou', 'Caracas',
    'Los Angeles', 'Osaka'];
  const getCharacters = () => {
    axios.get('https://breakingbadapi.com/api/characters')
      .then((response) => {
        setCharacters(response.data)
        //console.log(response.data)
      })
      .catch((err)=>console.log(err))
  }

  useEffect(()=>{
    getCharacters()
  },[])


  return (
    <SafeAreaView style={styles.container}>

     <FlatList
        data={Characters}
        renderItem={(item,index)=>{
          return(
            <Card 
            onPress={()=>props.navigation.navigate('Details',{
                 item:item
               })}
               >
            {
                item.item.img!='' &&
            <Card.Cover source={{ uri: item.item.img }} />}
             <View style={styles.card}>
          
          </View>
            <Card.Title title={item.item.name} left={()=><Image source={{uri:item.item.img}} style={styles.miniImage}/>} />
          </Card>
          )
        }}
        keyExtractor={(item) => item.char_id}
        extraData={Characters}
      />
    </SafeAreaView>
  );
}

function DetailsScreen(props) {
  const [DetailsList,setDetailsList] = useState(props.route.params.item)
  return (
    <View style={styles.detailView}>

     { 
          DetailsList.item.img!=undefined && 
          <Avatar.Image size={250} source={{uri:DetailsList.item.img}} />
      }
      
      {
          DetailsList.item.name!=undefined && 
          <View style={styles.rowCenter}>
          <View style={styles.centerContent}>
            <Text>Name</Text>
           </View>
           <View style={styles.centerContent}>
           <Text>{ DetailsList.item.name}</Text>
           </View>
          </View>
      }

{
          DetailsList.item.occupation!=undefined && 
          <View style={styles.rowCenter}>
          <View style={styles.centerContent}>
            <Text>Occupation</Text>
           </View>
           <View style={styles.centerContent}>
           <Text>{ DetailsList.item.occupation}</Text>
           </View>
          </View>
      }

{
          DetailsList.item.birthday!=undefined && 
          <View style={styles.rowCenter}>
          <View style={styles.centerContent}>
            <Text>Birthday</Text>
           </View>
           <View style={styles.centerContent}>
           <Text>{ DetailsList.item.birthday}</Text>
           </View>
          </View>
      }

{
          DetailsList.item.status!=undefined && 
          <View style={styles.rowCenter}>
          <View style={styles.centerContent}>
            <Text>Status</Text>
           </View>
           <View style={styles.centerContent}>
           <Text>{ DetailsList.item.status}</Text>
           </View>
          </View>
      }

{
          DetailsList.item.category!=undefined && 
          <View style={styles.rowCenter}>
          <View style={styles.centerContent}>
            <Text>Category</Text>
           </View>
           <View style={styles.centerContent}>
           <Text>{ DetailsList.item.category}</Text>
           </View>
          </View>
      }

{
          DetailsList.item.nickname!=undefined && 
          <View style={styles.rowCenter}>
          <View style={styles.centerContent}>
            <Text>Nickname</Text>
           </View>
           <View style={styles.centerContent}>
           <Text>{ DetailsList.item.nickname}</Text>
           </View>
          </View>
      }

           {
          DetailsList.item.appearance!=undefined && 
          <View style={styles.rowCenter}>
          <View style={styles.centerContent}>
            <Text>Season appearance</Text>
           </View>
           <View style={styles.centerContent}>
           <Text>{ DetailsList.item.appearance}</Text>
           </View>
          </View>
      }  
   
    </View>
  );
}

const Stack = createNativeStackNavigator();
const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <PaperProvider>
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  </PaperProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  centerContent:{flex:1,justifyContent:'center',alignItems:'center'},
  rowCenter:{flexDirection:'row',justifyContent:'center',alignItems:'center',marginVertical:10,},
  imgStyle:{width:100,height:100,borderRadius:50,resizeMode:'cover'},
  detailView:{ flex: 1, alignItems: 'center', paddingVertical:'5%',paddingHorizontal:'5%' },
  container:{ flex: 1,},
  button:{flex:1,height:80,justifyContent:'center',alignItems:'center',backgroundColor:'#CCC',flexDirection:'row',marginHorizontal:'5%',marginVertical:'1.2%',borderRadius:10},
  card:{flex:4,justifyContent:'center',alignItems:'center'},
  miniImage:{width:40,height:40,borderRadius:30,resizeMode:'cover'}
});

export default App;
