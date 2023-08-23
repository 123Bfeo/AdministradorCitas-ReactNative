import React, { useEffect, useState } from "react";
import {
  Text,
  Modal,
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  Platform,
  Pressable,
  Alert,
  Keyboard,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const Form = ({
  modalView,
  setModalView,
  newPatient,
  setNewPatient,
  editPatient,
  setEditPatient
}) => {
  const [id, setId] = useState("");
  const [patient, setPatient] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dateOf, setDateOf] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [symptoms, setSymptoms] = useState("");
  useEffect(() => {
    if (Object.keys(editPatient).length > 0) {
      setId(editPatient.id);
      setPatient(editPatient.patient);
      setPhone(editPatient.phone);
      setEmail(editPatient.email);
      setDateOf(editPatient.dateOf);
      setSymptoms(editPatient.symptoms);
    } else {
      console.log("no hay nada");
    }
  }, [editPatient]);

  const showDatePicker = () => {
    Keyboard.dismiss();
    setShowPicker(!showPicker);
  };
  const onChange = ({ type }, selectedDate) => {
    if (type === "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
      if (Platform.OS === "android") {
        const dateFormt = currentDate.toLocaleDateString();
        showDatePicker();
        setDateOf(dateFormt);
      }
    } else {
      showDatePicker();
    }
  };
  const btnClose = () => {
    setModalView(false);
    setEditPatient({});
    setId("")
    setPatient("");
    setPhone("");
    setEmail("");
    setDate(new Date());
    setSymptoms("");
  };

  const handleDateRegister = () => {
    //Validacion de datos
    if ([patient, phone, email, dateOf, symptoms].includes("")) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    const newPatients = {
      patient,
      phone,
      email,
      dateOf,
      symptoms,
    };

    if (id) {
      // editando
      newPatients.id = id;
      const patientUpdate = newPatient.map(
        (patientState =>
          patientState.id === newPatients.id ? newPatients : patientState)
      );
      setNewPatient(patientUpdate)
      setEditPatient({})
    } else {
      // nuevo registro
      newPatients.id = Date.now();
      setNewPatient([...newPatient, newPatients]);
    }

    setModalView(false);
    setId("")
    setPatient("");
    setPhone("");
    setEmail("");
    setDateOf("");
    setDate(new Date());
    setSymptoms("");
  };

  return (
    <Modal animationType="slide" visible={modalView}>
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title1}>
            {editPatient.id ? 'Editar':'Nueva'} {""}
            <Text style={styles.title2}>Cita</Text>
          </Text>
          <Pressable onPress={btnClose} style={styles.btnClose}>
            <Text style={styles.btnCloseText}>X Cerrar</Text>
          </Pressable>

          <View style={styles.field}>
            <Text style={styles.label}>Nombre Paciente</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre del Paciente"
              placeholderTextColor={"#666"}
              value={patient}
              onChangeText={setPatient}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Teléfono Paciente</Text>
            <TextInput
              style={styles.input}
              placeholder="Telefono del Paciente"
              placeholderTextColor={"#666"}
              keyboardType="phone-pad"
              maxLength={10}
              value={phone}
              onChangeText={setPhone}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Email Paciente</Text>
            <TextInput
              style={styles.input}
              placeholder="Email del Paciente"
              placeholderTextColor={"#666"}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Fecha de Alta</Text>
            {showPicker && (
              <DateTimePicker
                mode="date"
                display="spinner"
                value={date}
                onChange={onChange}
                dateFormat="day month year"
                style={{ borderRadius: 10 }}
              />
            )}
            {!showPicker && (
              <Pressable onPress={showDatePicker}>
                <TextInput
                  style={styles.input}
                  placeholder="Seleccione la fecha"
                  placeholderTextColor={"#666"}
                  value={dateOf}
                  onChangeText={setDateOf}
                  editable={false}
                />
              </Pressable>
            )}
            
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Sintomas Paciente</Text>
            <TextInput
              style={[styles.input, styles.symptomsInput]}
              multiline={true}
              numberOfLines={4}
              value={symptoms}
              onChangeText={setSymptoms}
            />
          </View>
          <Pressable style={styles.btnRegiste} onPress={handleDateRegister}>
            <Text style={styles.btnRegisteText}>{editPatient.id ? 'Guardar Cambios':'Registrar Cita'}</Text>
          </Pressable>
        </ScrollView>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4C2882",
    flex: 1,
  },
  title1: {
    marginTop: 30,
    textAlign: "center",
    fontSize: 30,
    color: "#FFF",
  },
  title2: {
    color: "#FFF",
    fontWeight: "900",
  },
  btnClose: {
    marginVertical: 30,
    backgroundColor: "#391A69",
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FFF",
  },
  btnCloseText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "900",
    fontSize: 16,
    textTransform: "uppercase",
  },
  field: {
    marginTop: 10,
    marginHorizontal: 30,
  },
  label: {
    color: "#FFF",
    marginBottom: 10,
    marginTop: 15,
    fontSize: 20,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 10,
  },
  symptomsInput: {
    height: 100,
  },
  btnRegiste: {
    marginVertical: 50,
    backgroundColor: "#008000",
    paddingVertical: 15,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  btnRegisteText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "900",
    fontSize: 16,
    textTransform: "uppercase",
  },
});
export default Form;
