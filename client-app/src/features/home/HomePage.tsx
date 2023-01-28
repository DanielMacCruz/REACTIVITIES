import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button, Icon} from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoginForm from "../Users/LoginForm";
import RegisterForm from "../Users/RegisterForm";

export default observer (function HomePage () {
    const {userStore, modalStore} = useStore();
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image src='/assets/logofinal2.png' alt='logo' style={{marginBottom:0}}/>
                    
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                    <Header as='h2' inverted content='Welcome to Act' />
                    <Button as={Link} to='/activities' size='huge' content inverted>Go to activities {(<Icon name='arrow right'/>)} </Button> 

                    
                    </>
                    
                ):(
                    <>
                    <Button onClick={()=>modalStore.openModal(<LoginForm/>)} size='huge' inverted> Login</Button>
                    <Button onClick={()=>modalStore.openModal(<RegisterForm/>)} size='huge' inverted> Register</Button>
                    </>
                )
            }
                
                
            </Container>
            </Segment>
    )
})