/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import { Appbar, TextInput, Button } from 'react-native-paper';
import { FlatList, Alert } from 'react-native';
import Firestore from '@react-native-firebase/firestore';
import Todo from './Todo'; 
import { Actions } from 'react-native-router-flux';
import moment from "moment"
import myImage from './img/logo.png';

function Home() {
    const ref = Firestore().collection('todos');
  
    useEffect(() => {
        return ref.onSnapshot((querySnapshot) => {
            const list = [];
            querySnapshot.forEach(doc => {
              const { title, complete, datetime } = doc.data();
              var dateTimeFormated = ""
              if(datetime) {
                dateTimeFormated = moment(datetime.toDate()).format("DD/MM/YYYY HH:mm")
              }
              list.push({
                id: doc.id,
                title,
                complete,
                datetime: dateTimeFormated
              });
            });
      
            setTodos(list);
      
            if (loading) {
              setLoading(false);
            }
          });
    });

    const [ todo, setTodo ] = useState('');
    const [ loading, setLoading ] = useState(true);
    const [ todos, setTodos ] = useState([]);

    async function addTodo() {
        if(todo == '') {
          await Alert.alert(
              'Warning?', 
              'You must input title?', 
              [ {text: 'OK'} ]
          )
        } else {
          await ref.add({
            title: todo,
            complete: false,
          });
          setTodo('');
        }
      }

    function gotoAdd() {
        Actions.add()
    }

    if (loading) {
        return null; // or a spinner
      }
    
    
    return (
      <>
        <Appbar >
        <Appbar.Content title={'Logo'} />
        </Appbar>
        <FlatList 
        style={{flex: 1}}
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Todo {...item} />}
      />
        
        <TouchableOpacity onPress={() => gotoAdd()}>
                <IconAwesome name="plus-circle" size={40} backgroundColor="#FFFFFF" color="#FF0000" />
        </TouchableOpacity>
        
      </>
    );
  };
  
  export default Home;