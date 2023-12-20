// App.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Checkbox, TextInput, Button, Provider as PaperProvider } from 'react-native-paper';
import axios from 'axios';
const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');

  const addTodo = () => {
    if (todoText.trim() !== '') {
      setTodos([...todos, { name: todoText, completed: false }]);
      setTodoText('');
    }
  };

  const toggleTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const renderItem = ({ item, index }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8, }}>
      <Checkbox.Android
        status={item.completed ? 'checked' : 'unchecked'}
        onPress={() => toggleTodo(index)}
      />
      <Text style={{ marginLeft: 8,fontWeight:"bold", textDecorationLine: item.completed ? 'line-through' : 'none' }}>
        {item.name}
      </Text>
    </View>
  );

  useEffect(()=>{
    axios.get("https://react-native-319dc-default-rtdb.firebaseio.com/idioms.json")
    .then((res)=>setTodos(res.data))
    .catch(err=>{
    setError(err.message);
    });
},[])
  return (
    <PaperProvider>
      <View style={{ padding: 16 ,backgroundColor:'#EDD5FB'}}>
        {/* <TextInput
          label="Add Todo"
          value={todoText}
          onChangeText={(text) => setTodoText(text)}
          style={{ marginBottom: 16 }}
        />
        <Button mode="contained" onPress={addTodo}>
          Add Todo
        </Button> */}
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={todos}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          style={{ marginTop: 0 }}
        />
      </View>
    </PaperProvider>
  );
};

export default App;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 50,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 16,
    },
  });