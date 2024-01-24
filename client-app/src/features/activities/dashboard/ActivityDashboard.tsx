import { Button, Grid } from 'semantic-ui-react';

import '../../../app/layout/styles.css'

import ActivityList from './ActivityList';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ActivityFilters from './ActivityFilters';
import { PagingParams } from '../../../app/models/pagination';

export default observer(function ActivityDashboard() {
    const { activityStore } = useStore();
    const { loadActivities, activityRegistry, setPagingParams, pagination } = activityStore;
    const [ loadingNext, setLoadingNext ] = useState(false);

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1))
        loadActivities().then(() => setLoadingNext(false))
    }

    useEffect(() => {
        if (activityRegistry.size <= 1) loadActivities();
    }, [ loadActivities, activityRegistry ])

    if (activityStore.loadingInitial && !loadingNext) return <LoadingComponent content='Loading Quotes...' />
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
                <Button floated='right' content='more...' positive onClick={handleGetNext} loading={loadingNext} disabled={pagination?.totalPages === pagination?.currentPage} />
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityFilters />
            </Grid.Column>
        </Grid>
    )
})