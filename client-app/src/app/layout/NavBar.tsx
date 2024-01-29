import { Button, Container, Menu, Image, Dropdown } from 'semantic-ui-react';

import './styles.css'
import { Link, NavLink } from 'react-router-dom';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

export default observer(function NavBar() {
    const { userStore: { user, logout } } = useStore();
    const isMobile = window.screen.width <= 768;

    return (
        isMobile ? (
            <Menu
                inverted
                fixed='top'
                maxWidth={window.screen.width} >
                <Container>
                    <img
                        src='assets/bible.png'
                        alt='logo'
                        height="35em"
                        width="35em"
                        style={{ marginTop: 'auto', marginBottom: 'auto', marginRight: '1rem', marginLeft: '3rem' }} />
                    <Menu.Item
                        as={NavLink}
                        to='/'
                        header>
                        Home
                    </Menu.Item>
                    <Menu.Item
                        as={NavLink}
                        to='/quotes'
                        name='Quote List' />
                    <Menu.Item position='right'>
                        <Image src={user?.image || '/assets/user.png'} avatar spaced='right' />
                        <Dropdown pointing="top right">
                            <Dropdown.Menu >
                                <Dropdown.Item as={Link} to={`/profiles/${user?.username}`} text='My Profile' icon='user' />
                                <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>
                </Container>
            </Menu>
        ) : (
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
                        to='/quotes'
                        name='Quote List' />
                    {/* <Menu.Item
                    as={NavLink}
                    to='/errors'
                    name='Errors' /> */}
                    <Menu.Item>
                        <Button
                            as={NavLink}
                            to='/createActivity'
                            color='orange'
                            content='New Quote' />
                    </Menu.Item>
                    <Menu.Item position='right'>
                        <Image src={user?.image || '/assets/user.png'} avatar spaced='right' />
                        <Dropdown pointing="top left" text={user?.displayName}>
                            <Dropdown.Menu >
                                <Dropdown.Item as={Link} to={`/profiles/${user?.username}`} text='My Profile' icon='user' />
                                <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>
                </Container>
            </Menu>
        )
    )
})