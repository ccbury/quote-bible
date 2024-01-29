import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";

export default observer(function ActivityDetails() {

    const { activityStore } = useStore();
    const { selectedActivity: activity, loadActivity, loadingInitial, clearSelectedActivity } = activityStore;
    const { id } = useParams();
    const isMobile = window.screen.width <= 768;


    useEffect(() => {
        if (id) loadActivity(id)
        return () => clearSelectedActivity();
    }, [ id, loadActivity, clearSelectedActivity ])

    if (loadingInitial || !activity) return <LoadingComponent />;

    return (
        <Grid>
            <Grid.Column width={isMobile ? 16 : 10}>
                <ActivityDetailedHeader activity={activity} />
                <ActivityDetailedInfo activity={activity} />
                {isMobile && (
                    <ActivityDetailedSidebar activity={activity} />
                )}
                <ActivityDetailedChat activityId={activity.id} />
            </Grid.Column>
            {
                !isMobile && (
                    <Grid.Column width={6}>
                        <ActivityDetailedSidebar activity={activity} />
                    </Grid.Column>
                )
            }


        </Grid>
    )
})