import React, { useState } from 'react';
import { StatusBar} from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, FlatList, Alert, Modal } from 'react-native';
import Form from './src/components/Form';
import Patient from './src/components/Patient';
import PatientDetail from './src/components/PatientDetail';
const App = () => {
  const [modalView, setModalView]= useState(false)
  const [modalViewPatient, setModalViewPatient]= useState(false)
  const [newPatients, setNewPatients]= useState([])
  const [editPatient, setEditPatient]= useState({})
  const newDateHandler = ()=>{
    setModalView(true)
  }
  const patientEdit = (id)=>{
    const patientEd = newPatients.filter(patient => patient.id === id)
    setEditPatient(patientEd[0])
  }
  const patientDelete = (id)=>{
    Alert.alert(
    '¿Desea eliminar la cita?',
    'Cita eliminada no se puede recuperar',
    [
      {text:'Cancelar'},
      {text:'Si, Eliminar', onPress:()=>{
        const patientEd = newPatients.filter(patientState => patientState.id !== id)
        setNewPatients(patientEd)
      }}
    ])
  }
  const viewModalClose = () =>{
    setModalView(false)
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title1}>Administrador de {''}
        <Text style={styles.title2}>Citas</Text>
      </Text>
      <Pressable onPress={newDateHandler} style={styles.newDateBtn}>
        <Text style={styles.newDateTextBtn}>Nueva Cita</Text>
      </Pressable>
      {newPatients == 0 ?
       <Text style={styles.notRegister}>No hay citas registradas</Text> :
       <FlatList
       style={styles.list}
       data={newPatients} //dato en lo que va a busacar
       keyExtractor={(item)=>item.id} // extrae los datos unicos
       renderItem={({item})=>{ // la data con la que va a mostrar , esta prop itera sobre el item o el arreglo
        return(
          <Patient
           item={item}
           setModalView={setModalView}
           setEditPatient={setEditPatient}
           patientEdit={patientEdit}
           patientDelete={patientDelete}
           setModalViewPatient={setModalViewPatient}
          />
        )
       }}
       />
       }
      {modalView && (
        <Form
        modalView={modalView}
        setModalView={setModalView}
        newPatient={newPatients}
        setNewPatient={setNewPatients}
        editPatient={editPatient}
        setEditPatient={setEditPatient}
        />
      )}
       <Modal
       visible={modalViewPatient}
       animationType="slide"
       >
      <PatientDetail
      editPatient={editPatient}
      setEditPatient={setEditPatient}
      setModalViewPatient={setModalViewPatient}
      />
       </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F4F6',
    flex: 1
  },
  title1:{
    marginTop: 30,
    textAlign:'center',
    fontSize:30,
    color:'#374151',
  },
  title2:{
    color:'#4C2882',
    fontWeight:'900'
  },
  newDateBtn:{
    backgroundColor:'#4C2882',
    padding:15,
    marginTop:20,
    marginHorizontal:20,
    borderRadius:10
  },
  newDateTextBtn:{
    textAlign:'center',
    color:'#FFF',
    fontSize:20,
    fontWeight:'900',
    textTransform:'uppercase'
  },
  notRegister:{
    marginTop:40,
    textAlign:'center',
    fontSize:24,
    fontWeight:'600'
  },
  countRegister:{
    marginTop:40,
    textAlign:'center',
    fontSize:24,
    fontWeight:'600'
  },
  list:{
    marginTop:50,
    marginHorizontal:30
  }
});
export default  App ;