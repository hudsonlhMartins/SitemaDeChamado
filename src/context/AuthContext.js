import React ,{createContext, useState, useEffect} from 'react'
import { db } from '../services/firebaseConnection'
import { auth } from '../services/firebaseConnection'

import {createUserWithEmailAndPassword, signOut} from 'firebase/auth'
import {setDoc, doc} from 'firebase/firestore'
import { async } from '@firebase/util'

export const UserContext = createContext({})

function AuthProvider({children}){
    const [user, setUser]= useState()
    const [loadingAuth, setloadingAuth] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{

        function loadingStorege (){
            const storegeUser = localStorage.getItem('sitemaUser')
            if(storegeUser){
                setUser(JSON.parse(storegeUser))
                setLoading(false)
            }
            setLoading(false)
            }
            loadingStorege()
        
    }, [])    


    async function singUp(email, password, nome){
        setloadingAuth(true)
        const cadastrandoAuth = await createUserWithEmailAndPassword(auth, email, password).then(async value=>{
            const dadoId = doc(db, 'users', value.user.uid)
            const avatarUrl = null
            await setDoc(dadoId, {nome: nome, avatarUrl}).then(()=>{
            // caso ele consigar salvar com sucesso vai entrar nessa then
                let dado = {
                    id: value.user.uid,
                    name: nome,
                    email: email,
                    avatarUrl: avatarUrl
                }
                setUser(dado)
                setloadingAuth(false)
                addLocacalStorege(dado)
            })
        }).catch(error =>{
            console.log(error)
            setloadingAuth(false)
        })
    }

    function addLocacalStorege(dado){
        localStorage.setItem('sitemaUser', JSON.stringify(dado))
    }

    async function SingOut(){
        await signOut(auth)
        setUser(null)
        localStorage.removeItem('sitemaUser')
    }

    return(
        <UserContext.Provider value={{
                singed: !!user, 
                user, 
                loading,
                singUp,
                SingOut
                }}>
            {children}
        </UserContext.Provider>
    )
}

export default  AuthProvider