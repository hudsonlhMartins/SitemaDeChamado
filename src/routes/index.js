import { Switch} from 'react-router-dom'
import SingIn from '../pages/SingIn'
import SingUp from '../pages/SingUp'
import Dashboard from '../pages/Dashboard'
import Route from './Route'
import Profile from '../pages/Profile'

export default function Rotas(){
    return(
        <Switch>
            <Route path='/' exact component={SingIn} />
            <Route path='/register' exact component={SingUp} />
            <Route path='/dashboard' exact component={Dashboard} isPrivate />
            <Route path='/profile' exact component={Profile} isPrivate />


        </Switch>
    )
}
// quando a pagina for privada e so vc colocar isPrivate e esta sendo splagente do RouteWrapper