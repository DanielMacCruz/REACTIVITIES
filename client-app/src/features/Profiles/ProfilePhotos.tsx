import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Card, Grid, Header,Image, Tab } from 'semantic-ui-react';
import PhotoUploadWidget from '../../app/common/ImageUpload/PhotoUploadWidget';
import { Photo, Profile } from '../../app/layout/models/profile';
import { useStore } from '../../app/stores/store';

interface Props {
    profile: Profile;
}

export default observer (function ProfilePhotos({profile}: Props){
    const{profileStore: {isCurrentUser, uploadPhoto, uploading, loading, setMainPhoto, deletePhoto}} = useStore();
    const[addPhotoMode, setAddPhotoMode] = useState(false);
    const[target, setTarget] = useState('');
    const[manageMode, setManageMode] = useState(false);

    function handlePhotoUpload(file: Blob){
        uploadPhoto(file).then(()=> setAddPhotoMode(false));
    }

    function handleSetMainPhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>){
        setTarget(e.currentTarget.name);
        setMainPhoto(photo);
    }

    function handleDeletePhoto(photo:Photo,e: SyntheticEvent<HTMLButtonElement>){
        setTarget(e.currentTarget.name);
        deletePhoto(photo);
    }

    return(
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='image' content='Photos'/>
                    {isCurrentUser && (
                        <>
                            {!addPhotoMode &&
                            <Button floated='right' color='green' content={manageMode ? 'All done' : 'Manage'} 
                                onClick={()=> {
                                    setManageMode(!manageMode);
                                    setAddPhotoMode(false);
                                }}/>}
                            {manageMode &&
                                <Button floated='right' content={addPhotoMode ? 'Cancel' : 'Add Photo'} onClick={()=> setAddPhotoMode(!addPhotoMode)}/>
                            }                   
                        </>
                    )}
                </Grid.Column>
                <Grid.Column width={16}>
                    {addPhotoMode ? (
                        <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={uploading}/>
                    ): (
                        <Card.Group itemsPerRow={5}>
                            {profile.photos?.map(photo=>(
                            <Card key={photo.id}>
                                <Image src={photo.url}/>
                                {isCurrentUser && manageMode &&(
                                    <Button.Group fluid widths={2}>
                                        <Button basic color='green' content='main' name={'main' + photo.id} disabled={photo.isMain} 
                                        loading={target === 'main' + photo.id && loading} onClick={e => handleSetMainPhoto(photo, e)}/>
                                        <Button name={photo.id} disabled={photo.isMain} loading={target === photo.id && loading} basic color='red' onClick={e => handleDeletePhoto(photo,e)} icon='trash'/>
                                    </Button.Group>
                                )}
                            </Card>
                        ))  }
                        </Card.Group>
                    )}
                </Grid.Column>
            </Grid>             
        </Tab.Pane>
    )
})