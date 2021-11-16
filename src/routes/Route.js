import { useContext } from 'react'
import {Route, Redirect} from 'react-router-dom'
import { UserContext } from '../context/AuthContext'


export default function RouteWrapper({
    component: Component,
    isPrivate,
    ...rest
}){

    const {singed, loading } = useContext(UserContext)
// esse singed e true se tiver algo no localStorege
    if(loading){
        <div></div>
    }

    if(!singed && isPrivate ){
        return <Redirect to='/'/>
        // caso ele não esteja logando e isPrivate for tru ele vai manda para login
    }
    if(singed && !isPrivate){
        return <Redirect to='/dashboard' />
    }

    return(
        <Route 
            {...rest}
            render={props =>(
                <Component {...props} />
            )}
        />
    )
}