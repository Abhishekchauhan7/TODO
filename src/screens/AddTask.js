import React, { Component } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    View,
    AsyncStorage,
    Text,
    Button,
    ToastAndroid,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import uuidv1 from 'uuid/v1'
let arrval = []

function merge(old, updated) {
    var o = {};

    old.forEach(function (v) {
        o[v.id] = v;
    })

    updated.forEach(function (v) {
        o[v.id] = v;
    })

    var r = [];

    for (var p in o) {
        if (o.hasOwnProperty(p))
            r.push(o[p]);
    }

    return r;
}

export default class AddTask extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tasks: [],
            arr: [],
            text: "",
            isDataReady: false,

        };
    }



    handleTASK = (text) => {
        this.setState({ text: text })
    }

    TaskResponse = (task) => {
        if (task != '') {
            this.addTodo(task)
        } else {
            ToastAndroid.showWithGravityAndOffset('Please Enter Task.', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0, 10);

        }

    }




    addTodo = newTask => {
        const newTodoItem = newTask
        if (newTodoItem !== '') {
            let notEmpty = this.state.text.trim().length > 0;
            if (notEmpty) {
                this.storedata()
            }
        }
    }

    async storedata() {
        const ID = uuidv1()
        arrval.push({ id: ID, done: false, text: this.state.text })

        AsyncStorage.getItem('mylist')
            .then((item) => {
                if (item) {
                    let listOfTasks = JSON.parse(item) || [];
                    if (listOfTasks && listOfTasks.length > 0) {
                        let constval = merge(listOfTasks, arrval)
                        console.log("final", constval)
                        AsyncStorage.setItem("mylist", JSON.stringify(constval))
                        ToastAndroid.showWithGravityAndOffset('Task Added Successfully', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0, 10);

                    } else {
                        console.log("final", arrval)
                        AsyncStorage.setItem("mylist", JSON.stringify(arrval))
                        ToastAndroid.showWithGravityAndOffset('Task Added Successfully', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0, 10);

                    }

                }
            });


    }




    render() {
        return (
            <SafeAreaView>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Add Task</Text>
                </View>
                <View>
                    <View style={styles.container}>
                        <TextInput style={styles.input}
                            underlineColorAndroid="transparent"
                            placeholder="TASK"
                            placeholderTextColor="#9a73ef"
                            autoCapitalize="none"
                            onChangeText={this.handleTASK} />

                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={
                                () => this.TaskResponse(this.state.text)
                            }>
                            <Text style={styles.submitButtonText}> Submit </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>


        );
    }


}
const styles = StyleSheet.create({
    container: {
        paddingTop: 23
    },
    input: {
        margin: 10,
        height: 90,
        borderColor: '#7a42f4',
        borderWidth: 1
    },
    submitButton: {
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        height: 40,
    },
    submitButtonText: {
        color: 'white',
        alignSelf: 'center',
        alignItems: 'center'
    },
    wrapper: {
        padding: 25,
    },

    header: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        elevation: 1,
    },
    backIcons: {
        fontSize: 30,
        padding: 13,
        color: '#CCCCCC',
    },
    editIcons: {
        fontSize: 22,
        padding: 13,
        color: '#CCCCCC',
    },
    headerText: {
        fontSize: 20,
        marginTop: 6,
        marginLeft: 10,
        fontFamily: 'Poppins-Medium',
        color: '#6E175E',
    },
    header: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 1,
    },
    heading: {
        fontSize: 20,
        marginBottom: 10,
        fontFamily: 'Poppins-Medium',
        color: '#6E175E',
    },
    headerText: {
        fontSize: 20,
        marginTop: 6,
        marginLeft: 10,
        fontFamily: 'Poppins-Medium',
        color: '#6E175E',
    },
    backgroundImage: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        justifyContent: "center",
        alignItems: "stretch",
        borderRightWidth: 30,
        borderLeftWidth: 30,
        height: 50,
        borderColor: "#FFFFFF",
    },
    text: {
        marginBottom: 10,
    }
});