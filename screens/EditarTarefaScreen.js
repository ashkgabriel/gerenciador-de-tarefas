import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function EditarTarefaScreen({ route, navigation }) {
  const { id } = route.params;
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("pendente"); // Set default value
  const [pickerVisible, setPickerVisible] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/tarefas/${id}`)
      .then((response) => {
        console.log(response); // Log the response
        return response.json();
      })
      .then((data) => {
        setDescricao(data.descricao);
        setStatus(data.status);
      })
      .catch((error) => console.error(error));
  }, [id]);

  const atualizarTarefa = () => {
    if (!descricao.trim()) {
      Alert.alert("Erro", "A descrição da tarefa não pode estar vazia.");
      return;
    }

    fetch(`http://localhost:3000/tarefas/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ descricao, status }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); 
        navigation.goBack();
      })
      .catch((error) => console.error(error));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Descrição da Tarefa"
        value={descricao}
        onChangeText={setDescricao}
      />
      <TouchableOpacity
        onPress={() => setPickerVisible(true)}
        style={[styles.pickerButton, styles.selectButton]}
      >
        <Text style={styles.pickerButtonText}>Selecionar Status</Text>
      </TouchableOpacity>
      <Modal
        visible={pickerVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setPickerVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={status}
              onValueChange={(itemValue) => setStatus(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Pendente" value="pendente" />
              <Picker.Item label="Completa" value="completa" />
            </Picker>
            <TouchableOpacity
              onPress={() => setPickerVisible(false)}
              style={[styles.pickerButton, styles.confirmButton]}
            >
              <Text style={styles.pickerButtonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={atualizarTarefa} style={styles.button}>
          <Text style={styles.buttonText}>Atualizar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  pickerButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  selectButton: {
    backgroundColor: "#28a745", // Green color for "Selecionar Status" button
  },
  pickerButtonText: {
    color: "#fff",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  pickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  picker: {
    width: "100%",
    height: 150,
  },
  confirmButton: {
    marginTop: 40,
    backgroundColor: "#007bff", // Blue color for "Confirmar" button
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 50,
    width: "100%",
    marginBottom: 20,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  inputAndroid: {
    height: 50,
    width: "100%",
    marginBottom: 20,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
