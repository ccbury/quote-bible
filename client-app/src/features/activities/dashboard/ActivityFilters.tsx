import { observer } from "mobx-react-lite";
import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function ActivityFilters() {
    const { activityStore: { predicate, setPredicate } } = useStore();
    const style = {
        borderColor: 'orange',
        borderWidth: 3,
        borderStyle: 'solid'
    }
    return (
        <>
            <Menu vertical size='large' style={{ width: '100%', marginTop: 30 }}>
                <Header icon='filter' attached color='orange' content='Filters' />
                <Menu.Item content='All Quotes' active={predicate.has('all')} onClick={() => setPredicate('all', 'true')} style={predicate.has('all') ? style : null} />
                <Menu.Item content="Quotes I Attended" active={predicate.has('isGoing')} onClick={() => setPredicate('isGoing', 'true')} style={predicate.has('isGoing') ? style : null} />
                <Menu.Item content="My Quotes" active={predicate.has('isHost')} onClick={() => setPredicate('isHost', 'true')} style={predicate.has('isHost') ? style : null} />
            </Menu>
            <Header />
            <Calendar onChange={(date) => setPredicate('startDate', date as Date)} value={predicate.get('startDate') || new Date()} />
        </>
    )
})