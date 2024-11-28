import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [tarefas, setTarefas] = useState([]);
  const [filtro, setFiltro] = useState('todas');

  useEffect(() => {
    fetchTarefas();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchTarefas();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchTarefas = () => {
    fetch('http://localhost:3000/tarefas')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Log the parsed JSON response
        setTarefas(data);
      })
      .catch(error => console.error(error));
  };

  const deletarTarefa = (id) => {
    fetch(`http://localhost:3000/tarefas/${id}`, {
      method: 'DELETE',
    })
      .then(() => fetchTarefas())
      .catch(error => console.error(error));
  };

  const filtrarTarefas = () => {
    if (filtro === 'pendentes') {
      return tarefas.filter(tarefa => tarefa.status === 'pendente');
    } else if (filtro === 'completas') {
      return tarefas.filter(tarefa => tarefa.status === 'completa');
    }
    return tarefas;
  };

  const renderItem = ({ item }) => (
    <View style={styles.tarefa}>
      <View>
        <Text>{item.descricao}</Text>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('EditarTarefa', { id: item.id })} style={[styles.button, styles.editButton]}>
        <Text style={styles.buttonText}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deletarTarefa(item.id)} style={[styles.button, styles.deleteButton]}>
        <Text style={styles.buttonText}>Deletar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filtros}>
        <TouchableOpacity onPress={() => setFiltro('todas')} style={[styles.button, styles.filterButton]}>
          <Text style={styles.filterText}>Todas</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFiltro('pendentes')} style={[styles.button, styles.filterButton]}>
          <Text style={styles.filterText}>Pendentes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFiltro('completas')} style={[styles.button, styles.filterButton]}>
          <Text style={styles.filterText}>Completas</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filtrarTarefas()}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
      <TouchableOpacity onPress={() => navigation.navigate('NovaTarefa')} style={[styles.button, styles.addButton]}>
        <Text style={styles.buttonText}>Adicionar Tarefa</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  filtros: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tarefa: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  filterButton: {
    backgroundColor: '#dcdcdc',
  },
  filterText: {
    color: '#000000',
  },
  statusText: {
    color: '#888',
    fontSize: 12,
  },
  editButton: {
    backgroundColor: '#28a745',
  },
  deleteButton: {
    backgroundColor: '#ff0000',
  },
  addButton: {
    backgroundColor: '#007bff',
    alignItems: 'center',
    marginBottom: 40,
    padding: 20,
  },
  buttonText: {
    color: '#FFFFFF',
  },
});