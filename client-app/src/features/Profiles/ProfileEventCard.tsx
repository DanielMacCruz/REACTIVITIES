<<<<<<< HEAD
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';
import { Activity } from '../../app/layout/models/activity';


interface Props{
    activity: Activity;
}


export default observer (function ProfileEventCard({activity}: Props){
    return(
        <>
        <Card as={Link} to={`/activities/${activity.id}`} >
            <Image src={`/assets/categoryImages/${activity.category}.jpg` || '/assets/user.png'}/>
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Description>
                 {activity.date?.toDateString()}
                </Card.Description>
            </Card.Content>
        </Card>
        </>
    )
})
=======
import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Image } from 'semantic-ui-react';
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


>>>>>>> 0092e0c
