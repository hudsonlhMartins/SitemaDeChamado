import { Switch} from 'react-router-dom'
import SingIn from '../pages/SingIn'
import SingUp from '../pages/SingUp'
import Dashboard from '../pages/Dashboard'
import Route from './Route'
import Profile from '../pages/Profile'
import Customers from '../pages/Customers'
import New from '../pages/New'

export default function Rotas(){
    return(
        <Switch>
            <Route path='/' exact component={SingIn} />
            <Route path='/register' exact component={SingUp} />
            <Route path='/dashboard' exact component={Dashboard} isPrivate />
            <Route path='/profile' exact component={Profile} isPrivate={true} />
            <Route path='/customers' exact component={Customers} isPrivate/>
            <Route path='/new' exact component={New} isPrivate/>


        </Switch>
    )
}
// quando a pagina for privada e so vc colocar isPrivate e esta sendo splagente do RouteWrapper