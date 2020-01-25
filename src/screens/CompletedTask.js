import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    AsyncStorage,
    Dimensions,
    KeyboardAvoidingView,
    Button
} from 'react-native';

import Item from '../component/Item'


export default class CompletedTask extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            text: "",
            todoFilter: 'All'
        };
    }

    componentDidMount() {
        this.retrieveAsync()
    }

    // retriving Data From Async torage
    retrieveAsync = async () => {
        try {
            const value = await AsyncStorage.getItem('mylist');
            const parsedData = JSON.parse(value)
            this.setState({ tasks: parsedData })
        }
        catch (error) {
            Alert.alert("couldnt retrive data");
        }
    };

    //Adding Data from Async storage
    addAsync = async (Todo) => {
        try {
            await AsyncStorage.setItem('mylist', JSON.stringify(Todo));
        }
        catch (error) {
            Alert.alert("couldn't Store Data")
        }
    }

    // to delete item from above array tasks[] and adding to Async Storage
    deleteTask = id => {
        this.setState(
            prevState => {
                let tasks = prevState.tasks
                return { tasks: tasks.filter(item => item.id != id) };
            },
            () => this.addAsync(this.state.tasks)
        );
    };

    //Updating the item to be completed or not
    updateTodo = (id) => {
        this.setState({
            tasks: this.state.tasks.map(item => {
                if (item.id == id) {
                    return {
                        ...item,
                        done: !item.done
                    }
                } else {
                    return item
                }
            })
        },
            () => this.addAsync(this.state.tasks)
        )
    }



    //filtering the value
    updateTodoFilter = (text) => {
        this.setState({ todoFilter: text })
    }

    render() {
        const { container, headline, buttonsContainer, todo_list_container, } = styles
        let todos = [];
        todos = (this.state.tasks ? (this.state.tasks.filter(todo => todo.done)) : ([]))
        return (
            <View style={container}>
             <View style={styles.header}>
                    <Text style={styles.headerText}>Completed Task</Text>
                </View>
                {todos ? (<View style={styles.header}>
                    <Text style={styles.headerText}>Completed Tasks are  {todos.length}</Text>
                </View>) : (<View style={styles.header}>
                    <Text style={styles.headerText}> </Text>
                </View>)}
                <FlatList style={todo_list_container}
                    data={todos}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) =>
                        <Item
                            TextValue={item.text}
                            isDone={item.done}
                            id={item.id}
                            deleteTask={this.deleteTask}
                            updateTodo={this.updateTodo}
                        />
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 20
    },
    headline: {
        color: "#ffffff",
        fontSize: 30,
        fontWeight: 'bold',
        marginHorizontal: 20,
        marginVertical: 5,
    },
    buttonsContainer: {
        flexDirection: 'row'
    },
    todo_list_container: {
        width: Dimensions.get('window').width - 20,
        margin: 10,
    },
});