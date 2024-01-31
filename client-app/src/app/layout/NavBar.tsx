import { Container, Menu, Image, Dropdown } from 'semantic-ui-react';

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
                    <Dropdown pointing="top left" icon={<Image
                        src='https://res.cloudinary.com/dolmv7ozw/image/upload/v1706661562/psynsnhwdhywsl6vkdet.png'
                        alt='logo'
                        height='30em'
                        width='35em'
                        style={{ marginLeft: '1em', marginTop: '1em', marginBottom: '1em' }} />}>
                        <Dropdown.Menu >
                            <Dropdown.Item as={Link} to={`/`} text='Home' icon='home' />
                            <Dropdown.Item as={Link} to={`/quotes`} text='Quotes' icon='stack exchange' />
                            <Dropdown.Item as={Link} to={`/createActivity`} text='New Quote' icon='plus' />
                        </Dropdown.Menu>
                    </Dropdown>
                    <Menu.Item position='right'>
                        <Dropdown pointing="top right" icon={<Image src={user?.image || '/assets/user.png'} avatar spaced='right' />}>
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
                    <Menu.Item
                        as={NavLink}
                        to='/createActivity'
                        name='New Quote' />
                    {/* <Button
                            as={NavLink}
                            to='/createActivity'
                            color='orange'
                            content='New Quote' /> */}
                    {/* </Menu.Item> */}
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