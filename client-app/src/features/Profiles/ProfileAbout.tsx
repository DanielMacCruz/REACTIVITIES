import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Button, Grid, Header, Icon, Item, Segment, Tab } from 'semantic-ui-react';
import MyTextArea from '../../app/common/form/MyTextArea';
import MyTextInput from '../../app/common/form/MyTextInput';
import { Profile } from '../../app/layout/models/profile';
import { useStore } from '../../app/stores/store';
import * as Yup from 'yup';

interface Props{
    profile: Profile;
}

export default observer(function ProfileAbout({profile}:Props) {

    const{profileStore: {loading, isCurrentUser, updateProfile}} = useStore();
    const[editMode, setEditMode] = useState(false);

    const validationSchema = Yup.object({
        displayName: Yup.string().required(),
        bio: Yup.string().max(280).nullable()
    })


    return(
        <Tab.Pane>
            <Grid>
                <Grid.Column width={12}>

                    {editMode &&(                            
                        <Segment clearing>
                        <Formik validationSchema={validationSchema} enableReinitialize initialValues={profile} onSubmit={values => updateProfile(values).then(()=> setEditMode(false))}>
                            {({handleSubmit, isValid, isSubmitting, dirty})=>(
                            <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                                <MyTextInput name='displayName' placeholder ='Display name'/>
                                <MyTextArea  rows={3} name='bio' placeholder='Something about yourself'/>
                                
                                <Button disabled={isSubmitting || !dirty || !isValid} loading={isSubmitting} floated='right' positive type='submit' content='All set'/>
                                <Button type='button' floated='right' content='Cancel' onClick={()=>setEditMode(false)}/>
                            </Form>
                        )}
                        </Formik>
                        </Segment>
                    )}
                    {!editMode && !profile.bio &&(
                        <span>{profile.displayName} is a mysterious one :O</span>
                    )}
                    {!editMode && profile.bio &&(
                       
                            <Segment clearing>
                                <Item.Group>
                                    <Item >
                                        <Icon name='user' size='large'/>
                                            <Item.Content verticalAlign='middle'>
                                                <Header as='h2' content={'About ' + profile.displayName}/> 
                                            </Item.Content>
                                    </Item>
                                </Item.Group>
                            
                           
                                <span style={{whiteSpace: 'pre-wrap'}}>{profile.bio}</span>
                            </Segment>
                        
                    )}
                        
                   
                  
                </Grid.Column>
                <Grid.Column width={4}>
                    {!editMode && isCurrentUser &&(
                        <Button content='Update profile' color='green' floated='right' onClick={()=>setEditMode(true)}/>
                    )}
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    
)})