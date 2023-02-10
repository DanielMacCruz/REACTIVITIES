import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { Grid, Menu, Segment, Image, Card } from 'semantic-ui-react'
import { PagingParams } from '../../app/layout/models/pagination'
import { Profile } from '../../app/layout/models/profile'
import { useStore } from '../../app/stores/store'
import ProfileEventCard from './ProfileEventCard'

interface Props{
  profile: Profile;
}

export default observer (function ProfileEventsMenu({profile}:Props) {
    
  const {activityStore} = useStore();
  const{setIsInProfile, setCurrentProfile, setPredicate, predicate, listProfileActivities, profileActivityRegistry, setPagingParams, pagination} = activityStore;
  const[loadingNext, setLoadingNext] = useState(false);

  const handleItemClick = (e: any, { name }: any) =>{
    setPredicate(name, 'true');
    console.log(name);
    } 
  
  

  function handleGetNext() {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1))
    listProfileActivities(profile.username).then(()=> setLoadingNext(false));
  }

  useEffect(()=>{
    if(profileActivityRegistry.size <= 1) listProfileActivities(profile.username);
    setCurrentProfile(profile.username);
    setIsInProfile(true);
  }, [setCurrentProfile, listProfileActivities, profileActivityRegistry.size,profile.username])


  return (
    <div>
      <Segment>
        
        
        {profileActivityRegistry.entries().next().value &&(
            <ProfileEventCard key={profileActivityRegistry.entries().next().value.id} activity={profileActivityRegistry.entries().next().value} />
        )}
        {console.log(profileActivityRegistry.size)}


        
        <Menu pointing secondary>
          <Menu.Item
            name='future'
            content='Future events'
            active={predicate.has('future')}
            onClick={handleItemClick}
          />
          <Menu.Item
            name='past'
            content='Past events'
            active={predicate.has('past')}
            onClick={ handleItemClick}
          />
          <Menu.Item
            name='hosting'
            content='Hosting'
            active={predicate.has('hosting')}
            onClick={ handleItemClick}
          />
        </Menu>
        <Grid>
            <Grid.Column width={16}/>
           
        <InfiniteScroll pageStart={0} loadMore={handleGetNext} hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages} initialLoad={false}>
            <Card.Group itemsPerRow={5}>
            <>
            {profileActivityRegistry.forEach(a => (
            <ProfileEventCard key={a.id} activity={a} />
            
            ))}
            {console.log(profileActivityRegistry.size)}
            </>
            </Card.Group>
        </InfiniteScroll>
        </Grid>
        

        {predicate.has('future') && (
           <Card.Group itemsPerRow={5}>
           <>
           {profileActivityRegistry.forEach(a => (
           <ProfileEventCard key={a.id} activity={a} />
           
           ))}
           {console.log(profileActivityRegistry.size)}
           </>
           </Card.Group>
        )}
        {predicate.has('past') && (
          <span> PAST EVENTS </span>
        )}
        {predicate.has('hosting') && (
          <span> HOSTING </span>
        )}
      </Segment>
    </div>
  )
})


