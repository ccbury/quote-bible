import { Button, Card, Image } from "semantic-ui-react";
import { ActivityProps } from "../../../app/interface/ActivitiesProps";

export default function ActivityDetails({ activity }: ActivityProps) {
    return (
        <Card fluid>
            <Image src={`/assets/cetegoryImage/${activity.category}.jpg`} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button basic color='blue' content='Edit' />
                    <Button basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}