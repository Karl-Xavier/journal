import React, { useEffect, useState } from 'react'
import { db } from '../../firebaseConfig'
import { collection, getDocs, deleteDoc, doc } from '@firebase/firestore'
import { Link } from 'react-router-dom'
import { Trash } from 'phosphor-react'

const TravelLog = () => {
    const [memories, setMemories] = useState([])
    const memoryCollection = collection(db, 'Memories')

    useEffect(() => {
        const getMemories = async () => {
            const data = await getDocs(memoryCollection)
            setMemories(data.docs.map((doc) => ({
                ...doc.data(), 
                id: doc.id 
            })))
        }
        getMemories()
    }, [])

    async function handelDel(id){
        try {
            const deleteDocument = doc(db, 'Memories', id); 
            await deleteDoc(deleteDocument); 
            setMemories(memories.filter(memory => memory.id !== id)); 
        } catch (error) {
            console.error('Error deleting document:', error);
        }
    }

    if(!memories){
        return (
            <p>No Memories!</p>
        )
    }

  return (
    <div className='container'>
        <h2>Memories</h2>
        <div className='log mt-3'>
            {memories.map((memory) => {
                return (
                    
                        <div className='memolink'>
                            <Link key={memory.id} style={{color: "#333", textDecoration: "none"}} to={`/travelLogStats/${memory.id}`}>
                            <h2>{memory.title}</h2>
                            <p style={{color: "grey", fontStyle: "italic"}}>Created on: {memory.createAt}</p>
                            </Link>
                            <Trash onClick={() => handelDel(memory.id)} role='button' className='trash' size={30}/>
                        </div>
                )
            })}
        </div>
    </div>
  )
}

export default TravelLog