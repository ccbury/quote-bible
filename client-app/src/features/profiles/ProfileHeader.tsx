import { Divider, Grid, Header, Item, Segment, Statistic, Image } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { observer } from "mobx-react-lite";
import FollowButton from "./FollowButton";

interface Props {
    profile: Profile;
}
export default observer(function ProfileHeader({ profile }: Props) {
    const isMobile = window.screen.width <= 768;
    return (
        <Segment>
            <Grid>
                <Grid.Column width={isMobile ? 16 : 12}>
                    <Item.Group>
                        <Item>
                            <Image avatar size='small' src={profile.image || '/assets/user.png'} />
                            <Item.Content verticalAlign="middle">
                                <Header as='h1' content={profile.displayName} />
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
                <Grid.Column width={isMobile ? 16 : 4}>
                    <Statistic.Group widths={2}>
                        <Statistic label={profile.followersCount === 1 ? 'Follower' : 'Followers'} value={profile.followersCount} />
                        <Statistic label='Following' value={profile.followingCount} />
                    </Statistic.Group>
                    <Divider />
                    <FollowButton profile={profile} />
                </Grid.Column>
            </Grid>
        </Segment>
    )
})