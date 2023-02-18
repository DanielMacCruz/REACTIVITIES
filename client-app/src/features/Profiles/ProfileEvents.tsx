import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { CardGroup, Menu, Segment } from 'semantic-ui-react'
import { Profile } from '../../app/layout/models/profile';
import { useStore } from '../../app/stores/store';
import ProfileEventCard from './ProfileEventCard';
import ProfileEventCardPlaceholder from './ProfileEventCardPlaceholder';

interface Props{
    profile: Profile;
}

export default observer(function ProfileEvents ({ profile }: Props) {
    const [activeItem, setActiveItem] = useState()
    const handleItemClick = (e: any, { name }: any) => {
        setActiveItem(name);
        profileStore.loadActivities(profile.username, name);
    }
    const { profileStore } = useStore();

    

    return (
        <div>
            <Segment>
                <Menu pointing secondary>
                    <Menu.Item
                        name='future'
                        content='Future Events'
                        active={activeItem === 'future'}
                        onClick={handleItemClick}
                    />
                    <Menu.Item
                        name='past'
                        content='Past Events'
                        active={activeItem === 'past'}
                        onClick={handleItemClick}
                    />
                    <Menu.Item
                        name='hosting'
                        content='Hosting'
                        active={activeItem === 'hosting'}
                        onClick={handleItemClick}
                    />
                </Menu>
                
                {profileStore.loadingActivities ?(
                  <ProfileEventCardPlaceholder/>
                  ):(
                  <>
                  {activeItem === 'future' && (
                      <CardGroup itemsPerRow={4}>
                          {profileStore.activitiesRegistry.map((a) => (
                              <ProfileEventCard key={a.id} activity={a} />
                          ))}
                      </CardGroup>
                  )}
                  {activeItem === 'past' && (
                      <CardGroup itemsPerRow={4}>
                          {profileStore.activitiesRegistry.map((a) => (
                              <ProfileEventCard key={a.id} activity={a} />
                          ))}
                      </CardGroup>
                  )}
                  {activeItem === 'hosting' && (
                      <CardGroup itemsPerRow={4}>
                          {profileStore.activitiesRegistry.map((a) => (
                              <ProfileEventCard key={a.id} activity={a} />
                          ))}
                      </CardGroup>
                  )}
                  </>
                  )}
                
            </Segment>
        </div>
    )
})
