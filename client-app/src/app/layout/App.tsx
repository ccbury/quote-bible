import { useEffect } from 'react';
import { Container } from 'semantic-ui-react';

import './styles.css'

import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore])

  if (activityStore.loadingInitial) return <LoadingComponent content='Gis a sec there...' />
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '5em' }}>
        <ActivityDashboard />
      </Container>
    </>
  )
}

export default observer(App) 
