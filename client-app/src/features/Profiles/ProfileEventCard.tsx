import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';
import { UserActivity } from '../../app/layout/models/userActivity';

interface Props{
    activity: UserActivity;
}

export default observer (function ProfileEventCard({activity}: Props){
    const formattedDate : Date = new Date(activity.date!);

    return(
        <Card as={Link} to={`/activities/${activity.id}`} >
            <Image src={`/assets/categoryImages/${activity.category}.jpg`}/>
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Description>
                <>
                {formattedDate.toDateString()}
                </>
                </Card.Description>
            </Card.Content>
        </Card>
    )
})


