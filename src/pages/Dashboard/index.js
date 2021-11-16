import { useContext } from 'react';
import {UserContext} from '../../context/AuthContext'
import Header from '../../components/Header';

function Dashboard() {
  const {SingOut}= useContext(UserContext)

  function sair(){
    SingOut()
  }

  return (
    <div>
      <Header/>
      <h1>euuu</h1>
      
    </div>
  );
}

export default Dashboard;

// 