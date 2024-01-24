import { observer } from "mobx-react-lite";
import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function ActivityFilters() {
    const { activityStore: { predicate, setPredicate } } = useStore();
    return (
        <>
            <Menu vertical size='large' style={{ width: '100%', marginTop: 30 }}>
                <Header icon='filter' attached color='orange' content='Filters' />
                <Menu.Item content='All Quotes' active={predicate.has('all')} onClick={() => setPredicate('all', 'true')} />
                <Menu.Item content="Quotes I Attended" active={predicate.has('isGoing')} onClick={() => setPredicate('isGoing', 'true')} />
                <Menu.Item content="My Quotes" active={predicate.has('isHost')} onClick={() => setPredicate('isHost', 'true')} />
            </Menu>
            <Header />
            <Calendar onChange={(date) => setPredicate('startDate', date as Date)} value={predicate.get('startDate') || new Date()} />
        </>
    )
})