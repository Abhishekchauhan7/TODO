import React from 'react'
import { View, Text, StyleSheet,Dimensions,TouchableWithoutFeedback} from 'react-native'

var {height, width} = Dimensions.get('window');

const Item = ({ TextValue,isDone,id,updateTodo,deleteTask,editTask}) => {
  const {todoContainer,listItemCont,status_done,status,listItem,edit,removeContainer,remove}=styles
    return (
        <View style={todoContainer}>
                    <TouchableWithoutFeedback onPress={()=>updateTodo(id)}>
                        <View style={listItemCont}>
                            <View  style={isDone ?status_done :status}/>
                            <Text style={listItem}>{TextValue}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>editTask(id)}>
                        <Text style={edit} >&Epsilon;</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback style={removeContainer} onPress={()=>deleteTask(id)}>
                        <Text style={remove} >&times;</Text>
                    </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
  todoContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginHorizontal: 2,
    borderWidth: 1,
    borderRadius: 22,
    borderColor: "#ffffff",
    height: 40,
    marginVertical: 5,
    backgroundColor:'#898989',

    shadowColor: "#dddddd",
    shadowOffset: {
    	width: 0,
    	height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  listItemCont: {
    width: width-120,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    marginHorizontal: 10,
  },

  listItem: {
      paddingTop: 3,
      paddingBottom: 3,
      marginHorizontal: 10,
      fontSize: 18,
      color:'#ffffff'
    },

  status_done:{
      width:13,
      height:13,
      margin:5,
      borderRadius:50,
      borderWidth: 1,
      backgroundColor: "#f91890",
    },
    status:{
      width:13,
      height:13,
      margin:5,
      borderRadius:50,
      borderWidth: 1,
      borderColor:'#2196F3',
    },
    remove:{
      fontSize: 33,
      color:'#ffffff',
      marginHorizontal: 10,
    },
    edit:{
      fontSize: 33,
      color:'#000000',
      marginHorizontal: 0,
    },
    textInput: {
        height: 40,
        paddingRight: 10,
        paddingLeft: 10,
        borderColor: "#dddddd",
        width: "100%",
      },
})

export default Item
