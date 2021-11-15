import { useContext } from 'react';
import {UserContext} from '../../context/AuthContext'

function Dashboard() {
  const {SingOut}= useContext(UserContext)

  function sair(){
    SingOut()
  }

  return (
    <div>
      <h1>DashBoard</h1>
      <button onClick={sair} >Sair</button>
    </div>
  );
}

export default Dashboard;
