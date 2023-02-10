import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';
import {  ProfileActivity } from '../../app/layout/models/activity';


interface Props{
    activity: ProfileActivity;
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