import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';

export default function NovaTarefaScreen({ navigation }) {
  const [descricao, setDescricao] = useState('');

  const adicionarTarefa = () => {
    if (!descricao.trim()) {
      Alert.alert('Erro', 'A descrição da tarefa não pode estar vazia.');
      return;
    }

    fetch('http://localhost:3000/tarefas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ descricao, status: 'pendente' }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        navigation.goBack();
      })
      .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Descrição da Tarefa"
        value={descricao}
        onChangeText={setDescricao}
      />
      <TouchableOpacity onPress={adicionarTarefa} style={styles.button}>
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
  },
});