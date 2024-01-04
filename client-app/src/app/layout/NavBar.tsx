import { Button, Container, Menu } from 'semantic-ui-react';

import './styles.css'
import { useStore } from '../stores/store';

export default function NavBar() {
    const { activityStore } = useStore();
    return (
        <Menu
            inverted
            fixed='top' >
            <Container>
                <Menu.Item
                    header>
                    <img
                        src='assets/react.svg'
                        alt='logo'
                        style={{ marginRight: '1rem' }} />
                    Reactivities
                </Menu.Item>
                <Menu.Item
                    name='Activities' />
                <Menu.Item>
                    <Button
                        onClick={() => activityStore.openForm()}
                        positive
                        content='Create Activity' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}