import { Button, Header } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import ActivityListItem from './ActivityListItem';
import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

export default observer(function ActivityList() {
    const { activityStore } = useStore();
    const { groupedActivities } = activityStore;
    const isMobile = window.screen.width <= 768;

    return (
        <>
            {!isMobile && (
                <Button
                    as={NavLink}
                    to='/createActivity'
                    color='orange'
                    content='New Quote'
                    style={{ width: '100%' }} />
            )}
            {groupedActivities.map(([ group, activities ]) => (
                <Fragment key={group}>
                    <Header sub color='orange'>
                        {group}
                    </Header>

                    {activities.map(activity => (
                        <ActivityListItem key={activity.id} activity={activity} />
                    ))}
                </Fragment>
            ))}
        </>

    )
})