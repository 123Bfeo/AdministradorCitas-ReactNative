import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
const Patient = ({
  item,
  setModalView,
  patientEdit,
  patientDelete,
  setEditPatient,
  setModalViewPatient,
}) => {
  const { patient, dateOf, id } = item;
  const handreUpdate = () => {
    setModalView(true);
    patientEdit(id);
  };
  const handreDelete = () => {
    patientDelete(id);
  };
  const handreModalPatient =()=>{
    setModalViewPatient(true)
    setEditPatient(item)
  }
  return (
    <Pressable onPress={handreModalPatient}>
      <View style={styles.container}>
        <Text style={styles.label}>Paciente</Text>
        <Text style={styles.text}>{patient}</Text>
        <Text style={styles.date}>Fecha de alta: {dateOf}</Text>
        <View style={styles.containerBtn}>
          <Pressable
            onLongPress={handreUpdate}
            style={[styles.editBtn, styles.btn]}
          >
            <Text style={styles.btnText}>Editar</Text>
          </Pressable>
          <Pressable
            onLongPress={handreDelete}
            style={[styles.deleteBtn, styles.btn]}
          >
            <Text style={styles.btnText}>Eliminar</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    padding: 20,
    borderBottomColor: "#94a3B8",
    borderBottomWidth: 1,
  },
  label: {
    color: "#374151",
    textTransform: "uppercase",
    fontWeight: "700",
    marginBottom: 10,
  },
  text: {
    color: "#4C2882",
    fontSize: 20,
    fontWeight: "700",
  },
  date: {
    color: "#374151",
  },
  btn: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
  },
  containerBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  editBtn: {
    borderColor: "#008000",
    borderWidth: 1,
  },
  deleteBtn: {
    borderColor: "#E61515",
    borderWidth: 1,
  },
  btnText: {
    textTransform: "uppercase",
    fontWeight: "700",
    fontSize: 12,
  },
});
export default Patient;
