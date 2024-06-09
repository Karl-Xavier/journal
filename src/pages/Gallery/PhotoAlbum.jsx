import React, { useState } from 'react'
import MainNav from '../../components/Navbar/MainNav'
import './GalleryStyles.css'
import 'bootstrap/dist/css/bootstrap.css'
import { Scan, Upload } from 'phosphor-react'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, imgDB } from '../../firebaseConfig'
import { v4 } from 'uuid'
import { addDoc, collection } from '@firebase/firestore'
import { toast } from 'react-toastify'

const PhotoAlbum = () => {
  const [images, setImages] = useState('')
  const [title, setTitle] = useState('')
  const [uploading, setUploading] = useState(false)

  const handleUploadFile = async (e) => {
    setUploading(true)
    const file = ref(imgDB, `Gallery/${v4()}`)
    try {
      const snapshot = await uploadBytes(file, e.target.files[0])
      const url = await getDownloadURL(snapshot.ref)
      setImages(url)
      setUploading(false)
    } catch (error) {
      console.error("Error uploading image: ", error)
      toast.error("Error uploading image")
      setUploading(false)
    }
  }

  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const day = now.getDate()
  const today = `${year}/${month}/${day}`

  const albums = collection(db, 'GalleryImg')
  const newImg = async(e) => {
    e.preventDefault()
    if (!images) {
      toast.error("Please upload an image first")
      return
    }
    try {
      await addDoc(albums, {
        imageURL: images,
        title: title,
        createdAt: today
      })
      toast.success("Uploaded Successfully", {position: "top-center"})
      window.location.href = '/gallery'
    } catch (error) {
      toast.error("Error uploading image", {position: "top-center"})
      console.error("Error adding document: ", error)
    }
  }

  return (
    <div>
      <MainNav/>
      <div className="container">
        <h2>Add a New Image to Your Gallery</h2>
        <div className="container">
          <form onSubmit={newImg}>
            <input
              type="text" 
              placeholder='Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='imgtitle'
              required
            />
            <input
              type="file"
              required
              onChange={handleUploadFile}
              id='file'
              style={{display: "none"}}
            />
            <label disabled={uploading} className="imgBarr" htmlFor="file">
              <span>Drop</span> an Image Here
            </label>
            <button className="btn btn-primary img-upload my-3" type="submit" disabled={uploading}>
              {uploading ? 'Scanning...' : 'Upload'} {uploading ? <Scan size={20}/> : <Upload size={20}/>}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PhotoAlbum
