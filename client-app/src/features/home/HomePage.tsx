import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";


export default function HomePage() {
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='assets/bible.png' alt='logo' style={{ marginBottom: 12, marginRight: 25 }} />
                    Quote Bible
                    <Image size='massive' src='assets/quill-pen.png' alt='logo' style={{ marginBottom: 12, marginLeft: 25 }} />
                </Header>
                <Header as='h2' inverted content="Welcome to the Quote Bible" />
                <Button as={Link} to='/activities' size='huge' inveerted content='Enter the Bible' />
            </Container>
        </Segment>
    )
}