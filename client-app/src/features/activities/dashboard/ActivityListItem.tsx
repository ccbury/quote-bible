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
                    <Item>
                        <Item.Image style={{ marginBottom: 5 }} size='tiny' circular src={activity.host?.image || '/assets/user.png'} />
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`}>
                                {activity.title}
                            </Item.Header>
                            <Item.Description>Hosted By <Link to={`/profiles/${activity.hostUsername}`}>{activity.host?.displayName}</Link></Item.Description>
                            {activity.isHost && (
                                <Item.Description>
                                    <Label basic color='orange'>
                                        Submitted by you
                                    </Label>
                                </Item.Description>
                            )}
                            {activity.isGoing && !activity.isHost && (
                                <Item.Description>
                                    <Label basic color='green'>
                                        You were at this Quote
                                    </Label>
                                </Item.Description>
                            )}
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {format(activity.date!, 'dd MMM yyyy h:mm aa')}
                    <Icon name='marker' /> {activity.venue}
                </span>
            </Segment>
            <Segment secondary>
                <ActivityListItemAttendee attendees={activity.attendees!} />
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button
                    as={Link}
                    to={`/activities/${activity.id}`}
                    color='teal'
                    floated='right'
                    content='View' />
            </Segment>
        </Segment.Group>
    )
}