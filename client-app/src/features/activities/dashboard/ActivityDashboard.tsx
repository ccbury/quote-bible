import { Grid } from 'semantic-ui-react';

import '../../../app/layout/styles.css'

import ActivitiesProps from '../../../app/interface/ActivitiesProps';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';


export default function ActivityDashboard({ activities }: ActivitiesProps) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities} />
            </Grid.Column>
            <Grid.Column width='6'>
                {activities[0] && <ActivityDetails activity={activities[0]} />}
                <ActivityForm />
            </Grid.Column>
        </Grid>
    )
}