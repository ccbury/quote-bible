import { observer } from "mobx-react-lite";
import Calendar from "react-calendar";
import { Button, Header, Menu } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { NavLink } from 'react-router-dom';
import { useState } from "react";


export default observer(function ActivityFilters() {
    const { activityStore: { predicate, setPredicate } } = useStore();
    const isMobile = window.screen.width <= 768;
    const [ showCalendar, setShowCalendar ] = useState(false);

    const style = {
        borderColor: 'orange',
        borderWidth: 3,
        borderStyle: 'solid'
    }
    return (
        <>
            {isMobile && (
                <Button
                    as={NavLink}
                    to='/createActivity'
                    color='orange'
                    content='New Quote'
                    style={{ width: '100%' }} />
            )}
            <Menu vertical size='large' style={{ width: '100%', marginTop: 30 }}>
                <Header icon='filter' attached color='orange' content='Filters' />
                <Menu.Item content='All Quotes' active={predicate.has('all')} onClick={() => setPredicate('all', 'true')} style={predicate.has('all') ? style : null} />
                <Menu.Item content="Quotes I Attended" active={predicate.has('isGoing')} onClick={() => setPredicate('isGoing', 'true')} style={predicate.has('isGoing') ? style : null} />
                <Menu.Item content="My Quotes" active={predicate.has('isHost')} onClick={() => setPredicate('isHost', 'true')} style={predicate.has('isHost') ? style : null} />
                {!isMobile ? null : !showCalendar ? (
                    <Menu.Item content="Show Calendar" onClick={() => setShowCalendar(!showCalendar)} />
                ) : (
                    <Menu.Item content="Hide Calendar" onClick={() => setShowCalendar(!showCalendar)} />
                )}
            </Menu>
            <Header />
            {isMobile ? showCalendar && (
                <div style={{ marginBottom: 20 }}>
                    <Calendar onChange={(date) => setPredicate('startDate', date as Date)} value={predicate.get('startDate') || new Date()} />
                </div>
            )
                : <Calendar onChange={(date) => setPredicate('startDate', date as Date)} value={predicate.get('startDate') || new Date()} />
            }
        </>
    )
})