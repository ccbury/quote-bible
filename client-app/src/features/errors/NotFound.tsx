import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export default function NotFound() {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name='question circle outline' />
                <h2>Oops - we couldn't find the page you were looking for! </h2>
                <p>Quote Bible is in Beta, please report this error..</p>
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/quotes'>
                    Return to Quotes
                </Button>
            </Segment.Inline>
        </Segment>
    )
}