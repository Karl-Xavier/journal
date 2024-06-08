import React, { useState } from 'react'
import { imgDB, db } from '../../firebaseConfig'
import { collection, addDoc } from '@firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'
import './travel.css'
import 'bootstrap/dist/css/bootstrap.css'
import { Scan, Upload } from 'phosphor-react'
import { toast } from 'react-toastify'
import MainNav from '../Navbar/MainNav'

const TravelLogForm = () => {
  const [date, setDate] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [img, setImg] = useState("")
  const [uploading, setUploading] = useState(false)

  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const day = now.getDate()
  const today = `${year}/${month}/${day}`

  const uploadImage = async (e) => {
    setUploading(true)
    const image = ref(imgDB, `imgFolder/${v4()}`)
    try {
      const data = await uploadBytes(image, e.target.files[0])
      const val = await getDownloadURL(data.ref)
      setImg(val)
      setUploading(false)
    } catch (error) {
      console.error("Error uploading image: ", error)
      toast.error("Error uploading image")
      setUploading(false)
    }
  }

  const collectionRef = collection(db, "Memories")
  const memory = async (e) => {
    e.preventDefault()
    if (!img) {
      toast.error("Please upload an image first")
      return
    }
    try {
      await addDoc(collectionRef, {
        date: date,
        title: title,
        description: description,
        imgURL: img,
        createAt: today
      })
      toast.success("Uploaded successfully", {position: "top-center"})
      window.location.href = '/'
    } catch (error) {
      toast.error("Something went wrong", {position: "top-center"})
      console.error("Error adding document: ", error)
    }
  }

  return (
    <div>
      <MainNav/>
      <div className='container py-4 travelform'>
        <form onSubmit={memory}>
          <input 
            type="text"
            value={date}
            placeholder='Event Date e.g dd/mm/yyyy'
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <input 
            type="text" 
            value={title}
            placeholder='Title e.g My First Trip'
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            type="text" 
            value={description}
            placeholder='Description.....'
            onChange={(e) => setDescription(e.target.value)}
            className='description'
            required
          />
          <div>
            <h3>Add Travel Image</h3>
            <input 
              type="file"
              onChange={uploadImage}
              className='imgbar'
              required
              disabled={uploading}
            />
          </div>
          <button className='btn btn-primary' type="submit" disabled={uploading}>
            {uploading ? 'Scanning...' : 'Upload'} {uploading ? <Scan size={20}/> : <Upload size={20}/>}
          </button>
        </form>
      </div>
    </div>
  )
}

export default TravelLogForm
