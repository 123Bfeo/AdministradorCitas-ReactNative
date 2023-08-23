import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
const PatientDetail = ({ editPatient,setEditPatient, setModalViewPatient }) => {
  const closeModel = () => {
    setModalViewPatient(false);
    setEditPatient({})
  };
  return (
    <View style={styles.title}>
      <Text style={styles.title}>
        Detalles de {""}
        <Text style={styles.titleBold}>Cita</Text>
      </Text>
      <View>
        <Pressable onPress={closeModel} style={styles.btnCloseModel}>
          <Text style={styles.btnCloseModelText}>X Cerrar</Text>
        </Pressable>
      </View>
      <View style={styles.containerData}>
        <View style={styles.field}>
          <Text style={styles.label}>Nombre Paciente:</Text>
          <Text style={styles.value}>{editPatient.patient}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{editPatient.email}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Telefono:</Text>
          <Text style={styles.value}>{editPatient.phone}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Fecha de Alta:</Text>
          <Text style={styles.value}>{editPatient.dateOf}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Sintomas del Paciente:</Text>
          <Text style={styles.value}>{editPatient.symptoms}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F3F4F6",
    flex: 1,
  },
  title: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 30,
    color: "#374151",
  },
  titleBold: {
    color: "#4C2882",
    fontWeight: "900",
  },
  btnCloseModel: {
    marginVertical: 20,
    backgroundColor: "#391A69",
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FFF",
  },
  btnCloseModelText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "900",
    fontSize: 16,
    textTransform: "uppercase",
  },
  containerData: {
    backgroundColor: "#FFF",
    marginHorizontal: 30,
    borderRadius: 10,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  field:{
    marginBottom:10
  },
  label:{
    textTransform:'uppercase',
    color:'#374151',
    fontWeight:'700',
    marginBottom:3
  },
  value:{
    fontWeight:'700',
    fontSize:14,
    color:'#334155'
  }
});
export default PatientDetail;
