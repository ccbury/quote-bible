import { Button, Container, Menu } from 'semantic-ui-react';

import './styles.css'

export default function NavBar() {
    return (
        <Menu inverted fixed='top' >
            <Container>
                <Menu.Item header>
                    <img src='assets/react.svg' alt='logo' style={{ marginRight: '1rem' }} />
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activities' />
                <Menu.Item>
                    <Button positive content='Create Activity' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}