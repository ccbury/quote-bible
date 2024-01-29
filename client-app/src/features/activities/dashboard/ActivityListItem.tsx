import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { format } from "date-fns";
import ActivityListItemAttendee from "./ActivityListItemAttendee";

interface Props {
    activity: Activity;
}

export default function ActivityListItem({ activity }: Props) {
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item.Image style={{ margin: 'auto', textAlign: 'center' }} size='tiny' circular src={activity.host?.image || '/assets/user.png'} />
                    {activity.isHost ? (
                        <Label basic color='orange' style={{ float: 'right' }}>
                            Submitted by you
                        </Label>
                    ) : activity.isGoing && !activity.isHost && (
                        <Label basic color='green' style={{ float: 'right' }}>
                            You were at this Quote
                        </Label>
                    )}
                    <Item>
                        <Item.Content>
                            <Item.Header as={Link} to={`/quotes/${activity.id}`}>
                                Quote of: {activity.title}
                            </Item.Header>
                            <Item.Description style={{ whiteSpace: 'pre-wrap' }}>{activity.description}</Item.Description>
                            <Item.Description style={{ textAlign: 'right', marginBottom: -30 }}>Posted By <Link to={`/profiles/${activity.hostUsername}`}>{activity.host?.displayName}</Link></Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {format(activity.date!, 'dd MMM yyyy h:mm aa')}
                    <Icon name='marker' style={{ marginLeft: 10 }} /> {activity.venue}
                </span>
            </Segment>
            <Segment secondary>
                <ActivityListItemAttendee attendees={activity.attendees!} />
            </Segment>
            <Segment clearing>
                <Button
                    as={Link}
                    to={`/quotes/${activity.id}`}
                    color='orange'
                    floated='right'
                    content='View' />
            </Segment>
        </Segment.Group >
    )
}