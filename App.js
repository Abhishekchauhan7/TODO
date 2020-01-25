// reactjs and react-native components
import React , { Component , Fragment } from 'react';
import { View , Text , ScrollView} from 'react-native';

// react-native-b-bar comp
import { create , Bottombar } from 'react-native-b-bar'

// bottom bar img icons
import all from './src/assets/listtask.png';
import completed from './src/assets/completedtask.png';
import active from './src/assets/alltask.png';


// Page components
import AddTask from './src/screens/AddTask';
import AllTask from './src/screens/AllTask';
import completedtask from './src/screens/CompletedTask';



// create bottom menu
let cbb = create({

  // if you have dark mode > turn on
  darkmode: true,
  // if you want subtitle > turn on
  subtitle: true,
  
  // create bottom bar
  cbb: [
      {
          subtitle: 'AddTask',
          component: AddTask,
          icon: active
      },{
          subtitle: 'Active',
          component: AllTask,
          icon: all
      },{
          subtitle: 'Completed',
          component: completedtask,
          icon: completed
      }
  ]
})



class App extends Component {

  render() {

    // return <Bottombar />
    // using create props
    return (
      <Fragment>
        <Bottombar create={cbb} />
      </Fragment>
    )
  }
}


export default App;