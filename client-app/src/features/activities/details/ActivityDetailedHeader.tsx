import { observer } from 'mobx-react-lite';
import { Button, Header, Item, Segment, Image, Label, Grid, Icon } from 'semantic-ui-react'
import { Activity } from "../../../app/models/activity";
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useStore } from '../../../app/stores/store';
import { useState } from 'react';

const activityImageStyle = {
    filter: 'brightness(30%)'
};

const activityImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    activity: Activity
}

export default observer(function ActivityDetailedHeader({ activity }: Props) {
    const { activityStore: { updateAttendance, loading, deleteActivity } } = useStore();
    const [ deleteFlag, setDeleteFlag ] = useState(false);
    const toggleDeleteFlag = async () => {
        setDeleteFlag(!deleteFlag)
    };
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{ padding: '0' }}>
                {activity.isCancelled && (
                    <Label style={{ position: 'absolute', zIndex: 1000, left: -14, top: 20 }} ribbon color='red' content="Cancelled" />
                )}
                <Image src={`/assets/categoryImages/${activity.category}.jpg`} fluid style={activityImageStyle} />
                <Segment style={activityImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={activity.title}
                                    style={{ color: 'white' }}
                                />
                                <p>{format(activity.date!, 'dd MMM yyyy')}</p>
                                <p>
                                    Posted by <strong><Link to={`/profiles/${activity.host?.username}`}>{activity.host?.displayName}</Link></strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>

            </Segment>
            <Segment clearing attached='bottom'>
                <Segment attached='top'>
                    <Grid>
                        <Grid.Column width={1}>
                            <Icon size='large' color='orange' name='info' />
                        </Grid.Column>
                        <Grid.Column width={15}>
                            <p style={{ whiteSpace: 'pre-wrap' }}>{activity.description}</p>
                        </Grid.Column>
                    </Grid>
                </Segment>
                {activity.isHost ? (
                    <div style={{ marginTop: 20 }}>
                        <Button color={'red'} floated='left' basic content={!deleteFlag ? 'Delete Quote' : 'Cancel'} loading={loading} onClick={toggleDeleteFlag} />
                        {deleteFlag ? (<Button onClick={deleteActivity} as={Link} to={`/quotes`} color='red' floated='right'>
                            Confirm Delete
                        </Button>) : (<Button as={Link} to={`/manage/${activity.id}`} color='orange' floated='right'>
                            Manage Quote
                        </Button>)}
                    </div>

                ) : activity.isGoing ? (<Segment attached='bottom'><Button loading={loading} onClick={updateAttendance}>I Didn't see this Quote</Button></Segment>
                ) : (<Segment attached='bottom'><Button color='orange' loading={loading} disabled={activity.isCancelled} onClick={updateAttendance}>I saw this Quote!</Button></Segment>)}
            </Segment>
        </Segment.Group>
    )
})