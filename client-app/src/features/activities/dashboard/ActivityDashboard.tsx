import { Grid } from 'semantic-ui-react';

import '../../../app/layout/styles.css'

import ActivitiesProps from '../../../app/interface/ActivitiesProps';
import ActivityList from './ActivityList';


export default function ActivityDashboard(props: ActivitiesProps) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={props.activities} />
            </Grid.Column>
        </Grid>
    )
}