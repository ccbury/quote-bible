import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";


export default observer(function HomePage() {
    const { userStore, modalStore } = useStore();
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image size='huge' src='/assets/bible.png' alt='logo' style={{ marginBottom: 12, marginRight: 25 }} />
                    Quote Bible
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                        <Button as={Link} to='/quotes' size='huge' inverted content='Go to Quotes' sx={{ mt: '40rem' }} />
                    </>
                ) : (
                    <>
                        <Button onClick={() => modalStore.openModal(<LoginForm />)} size='huge' inverted content='Login' />
                        <Button onClick={() => modalStore.openModal(<RegisterForm />)} size='huge' inverted content='Register' />
                    </>
                )}

            </Container>
        </Segment>
    )
})