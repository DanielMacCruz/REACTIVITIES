import { observer } from 'mobx-react-lite';
import { Card, Icon, Image, Placeholder, PlaceholderHeader, PlaceholderImage, PlaceholderLine } from 'semantic-ui-react';

export default observer (function ProfileEventCardPlaceholder(){
    return(
        <Card.Group itemsPerRow={4}>
            <Card>
                <Placeholder>
                    <Placeholder.Image style={{height: 72}}/>
                    <PlaceholderHeader>
                        <PlaceholderLine />
                    </PlaceholderHeader>
                    <PlaceholderLine />
                    <PlaceholderLine />
                   
                </Placeholder>
           </Card>
           <Card>
                <Placeholder>
                    <Placeholder.Image style={{height: 72}}/>
                    <PlaceholderHeader>
                        <PlaceholderLine />
                    </PlaceholderHeader>
                    <PlaceholderLine />
                    <PlaceholderLine />
                   
                </Placeholder>
           </Card>
           <Card>
                <Placeholder>
                    <Placeholder.Image style={{height: 72}}/>
                    <PlaceholderHeader>
                        <PlaceholderLine />
                    </PlaceholderHeader>
                    <PlaceholderLine />
                    <PlaceholderLine />
                   
                </Placeholder>
           </Card>
           
        </Card.Group>


           
    )
})
