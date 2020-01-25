import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    Animated,
    TouchableOpacity,
    AsyncStorage,
    Dimensions,
    ToastAndroid,
    KeyboardAvoidingView,
    Button
} from 'react-native';

import Item from '../component/Item'
import { theme } from '../util/theme'
const screenHeight = Dimensions.get("window").height;
import { SearchBar } from 'react-native-elements';


export default class CompletedTask extends Component {
    constructor(props) {
        super(props);
        this.arrayholder = [];

        this.state = {
            tasks: [],
            data: [],
            key: "",
            text: "",
            search: "",
            animation: new Animated.Value(0),
            firstQuery: '',
            todoFilter: 'All'
        };
    }

    search = text => {
        console.log(text);
    };
    clear = () => {
        this.search.clear();
    };
    updateSearch = search => {
        this.setState({ search });
    };


    componentWillMount() {
        this.setState({
            newValue: ''
        });
    }

    componentDidMount() {
        this.retrieveAsync()
    }

    // retriving Data From Async torage
    retrieveAsync = async () => {
        try {
            const value = await AsyncStorage.getItem('mylist');
            const parsedData = JSON.parse(value)
            this.setState({
                tasks: parsedData
            })
            this.arrayholder = parsedData
        }
        catch (error) {
            Alert.alert("couldnt retrive data");
        }
    };


    //Adding Data from Async storage
    addeditAsync = async (Todo) => {
        try {
            await AsyncStorage.setItem('mylist', JSON.stringify(Todo));
            ToastAndroid.showWithGravityAndOffset('Task Modified', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0, 10);
            this.handleOpen(1)
        }
        catch (error) {
            Alert.alert("couldn't Store Data")
        }
    }


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

    editTask = id => {
        this.setState({
            key: id
        });
        this.handleOpen(1)
    };

    updateSearch = text => {
        const newData = this.arrayholder.filter(function(item) {
            //applying filter for the inserted text in search bar
            const itemData = item.text ? item.text.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
          this.setState({
            //setting the filtered newData on datasource
            //After setting the data it will automatically re-render the view
            tasks: newData,
            search:text,
          });
    };


    editTodo = (key) => {

        this.setState({
            tasks: this.state.tasks.map(item => {
                if (item.id == key) {
                    return {
                        ...item,
                        text: this.state.text
                    }
                } else {
                    return item
                }
            })
        },
            () => this.addeditAsync(this.state.tasks)
        )
    }

    handleTASK = (text) => {
        this.setState({ text: text })
    }

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

    handleOpen = (Status) => {
        Animated.timing(this.state.animation, {
            toValue: Status,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };


    //filtering the value
    updateTodoFilter = (text) => {
        this.setState({ todoFilter: text })
    }

    render() {
        const { container, headline, buttonsContainer, todo_list_container, } = styles
        let todos = [];
        const { firstQuery, animation, search } = this.state;
        todos = (this.state.tasks ? (this.state.tasks.filter(todo => !todo.done)) : ([]))
        const backdrop = {
            transform: [
                {
                    translateY: animation.interpolate({
                        inputRange: [0, 0.01],
                        outputRange: [screenHeight, 0],
                        extrapolate: "clamp",
                    }),
                },
            ],
            opacity: animation.interpolate({
                inputRange: [0.01, 0.5],
                outputRange: [0, 1],
                extrapolate: "clamp",
            }),
        };
        const slideUp = {
            transform: [
                {
                    translateY: this.state.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -1 * screenHeight],
                        extrapolate: "clamp",
                    }),
                },
            ],
        };

        return (
            <View style={container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>All Task</Text>
                </View>

                {todos ? (<View style={styles.header}>
                    <Text style={styles.headerText}>Task Left {todos.length}</Text>
                </View>) : (<View style={styles.header}>
                    <Text style={styles.headerText}> </Text>
                </View>)}
                <SearchBar
                    lightTheme
                    round
                    containerStyle={{ width: '90%', marginTop: 10 }}
                    searchIcon={{ size: 24 }}
                    onChangeText={text => this.updateSearch(text)}
                    onClear={text => this.updateSearch('')}
                    placeholder="Search for Tasks..."
                    value={search}
                />


                <FlatList style={todo_list_container}
                    data={todos}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) =>
                        <Item
                            TextValue={item.text}
                            isDone={item.done}
                            id={item.id}
                            editTask={this.editTask}
                            deleteTask={this.deleteTask}
                            updateTodo={this.updateTodo}
                        />
                    }
                />

                <Animated.View style={[StyleSheet.absoluteFill, styles.cover, backdrop]}>
                    <View style={[styles.sheet]}>
                        <Animated.View style={[styles.popup, slideUp]}>
                            <View >
                                <TouchableOpacity
                                    onPress={() => this.handleOpen(0)}>
                                    <Text style={{ color: 'grey', textAlign: 'center', padding: 10, alignContent: 'center', justifyContent: 'center' }}>Close</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.scroll}>

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
                                            () => this.editTodo(this.state.key)
                                        }>
                                        <Text style={styles.submitButtonText}> Submit </Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </Animated.View>
                    </View>
                </Animated.View>

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
    submitButton: {
        backgroundColor: '#7a42f4',
        padding: 10,
        width: '80%',
        alignItems: 'center',
        margin: 15,
        height: 40,
    },
    sheet: {
        position: "absolute",
        top: Dimensions.get("window").height,
        left: 0,
        right: 0,
        height: "100%",
        justifyContent: "flex-end",
    },
    scroll: {
        height: 250,
    },
    buttonsContainer: {
        flexDirection: 'row'
    },
    todo_list_container: {
        width: Dimensions.get('window').width - 20,
        margin: 10,
    },
    inputWrap: {
        flexDirection: 'row',
        width: "80%",
        marginTop: 10,
        backgroundColor: '#808080',
        marginBottom: 15,
        borderRadius: 4,
        alignItems: 'center',
    },
    bottomView: {
        width: '100%',
        height: 160,
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        position: 'absolute', //Here is the trick
        bottom: 0, //Here is the trick
    },
    input: {
        margin: 10,
        height: 90,
        width: '80%',
        borderColor: '#7a42f4',
        borderWidth: 1
    },
    inputIcon: {
        color: '#CCCCCC',
        fontSize: 24,
        flex: 0,
        paddingLeft: 20,
        paddingRight: 10,
    },
});