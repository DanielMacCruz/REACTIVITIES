import { observer } from 'mobx-react-lite';
import { Fragment, useEffect } from 'react';
import { Header} from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ProfileEventCard from '../../Profiles/ProfileEventCard';
import ActivityListItem from './ActivityListItem';


export default observer (function ActivityList() {
    const{activityStore} = useStore();
    const {groupedActivities,setIsInProfile} = activityStore;
    
    useEffect(()=>{
        setIsInProfile(false);
      }, [setIsInProfile])
    
    
    return(
        <>
        {groupedActivities.map(([group,activities]) => (
            <Fragment key={group}>
            <Header sub color='teal'>
            {group}
            </Header>
            {activities.map(a => (
                <ActivityListItem key={a.id} activity={a}/>
                ))}
                </Fragment>
                ))}
                </>
                
                )
            })