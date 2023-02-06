import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { Grid, Menu, Segment, Image } from 'semantic-ui-react'
import { PagingParams } from '../../app/layout/models/pagination'
import { useStore } from '../../app/stores/store'
import ProfileEventCard from './ProfileEventCard'

export default observer (function ProfileEventsMenu() {
    
  const [activeItem, setActiveItem] = useState('future events')
  const handleItemClick = (e: any, { name }: any) => setActiveItem(name)
  const {activityStore} = useStore();
  const{loadActivities, activityRegistry, setPagingParams, pagination} = activityStore;
  const[loadingNext, setLoadingNext] = useState(false);
  

  function handleGetNext() {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1))
    loadActivities().then(()=> setLoadingNext(false));
  }

  useEffect(()=>{
    if(activityRegistry.size <= 1) loadActivities();
  }, [loadActivities, activityRegistry.size])


  return (
    <div>
      <Segment>
        <Menu pointing secondary>
          <Menu.Item
            name='future events'
            active={activeItem === 'future events'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name='past events'
            active={activeItem === 'past events'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name='hosting'
            active={activeItem === 'hosting'}
            onClick={handleItemClick}
          />
        </Menu>
        <Grid>
            <Grid.Column width={16}/>
           
        <InfiniteScroll pageStart={0} loadMore={handleGetNext} hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages} initialLoad={false}>
            <>

            {activityRegistry.forEach(a => (
            <ProfileEventCard key={a.id} activity={a} />
            
            ))}
            {console.log(activityRegistry.size)}
            </>
        </InfiniteScroll>
        </Grid>
        

        {activeItem === 'future events' && (
          <span> FUTURE EVENTS </span>
        )}
        {activeItem === 'past events' && (
          <span> PAST EVENTS </span>
        )}
        {activeItem === 'hosting' && (
          <span> HOSTING </span>
        )}
      </Segment>
    </div>
  )
})


