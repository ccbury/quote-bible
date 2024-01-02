import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'

import { Header, List } from 'semantic-ui-react';

function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities')
      .then(response => {
        setActivities(response.data)
      })
  }, [])

  return (
    <>
    <Header as='h2' icons='users' content='Quote Bible'/>
     <List>{activities.map((activity: any) => (
      <List.Item key={activity.id}>
        {activity.title}
      </List.Item>
     ))}</List>
    </>
  )
}

export default App
