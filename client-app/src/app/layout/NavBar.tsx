import { Button, Container, Menu } from 'semantic-ui-react';

import './styles.css'
import { NavLink } from 'react-router-dom';

export default function NavBar() {
    return (
        <Menu
            inverted
            fixed='top' >
            <Container>
                <img
                    src='assets/bible.png'
                    alt='logo'
                    height="35em"
                    width="35em"
                    style={{ marginTop: 'auto', marginBottom: 'auto', marginRight: '3rem' }} />
                <Menu.Item
                    as={NavLink}
                    to='/'
                    header>
                    Home
                </Menu.Item>
                <Menu.Item
                    as={NavLink}
                    to='/activities'
                    name='Activities' />
                <Menu.Item
                    as={NavLink}
                    to='/errors'
                    name='Errors' />
                <Menu.Item>
                    <Button
                        as={NavLink}
                        to='/createActivity'
                        positive
                        content='Create Activity' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}