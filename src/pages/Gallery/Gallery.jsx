import React, { useEffect, useState } from 'react'
import MainNav from '../../components/Navbar/MainNav'
import './GalleryStyles.css'
import 'bootstrap/dist/css/bootstrap.css'
import { Trash } from 'phosphor-react'
import { Link } from 'react-router-dom'
import { collection, deleteDoc, getDocs, doc } from '@firebase/firestore'
import { db } from '../../firebaseConfig'

const Gallery = () => {
  const [images, setImages] = useState([])

  const imgToGet = collection(db, 'GalleryImg')

  useEffect(() => {
    const getImage = async() => {
      const data = await getDocs(imgToGet)
      setImages(data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      })))
    }

    getImage()
  })

  const handleDelete = async (id) => {
    if (!id || typeof id !== 'string') {
      console.error("Invalid document ID:", id);
      return;
    }
    try {
      const docToDelete = doc(db, 'GalleryImg', id);
      await deleteDoc(docToDelete);
      setImages(images.filter(img => img.id !== id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  }

  return (
    <div>
      <MainNav/>
      <div className="container">
          <h2>Gallery</h2>
          <div className="container">
          <div className="row">
            {images.map((img) => {
              return(
                <div className="col-lg-4 col-md-6 my-2" key={img.id}>
                  <div className="card box-shadow">
                    <img src={img.imageURL} className="img-fluid rounded" alt={img.title} />
                    <div className="card-body">
                      <h3>{img.title}</h3>
                      <p style={{fontStyle: "italic", color: "lightgrey"}}>created on: {img.createdAt}</p>
                    </div>
                    <div className="card-footer">
                      <Trash onClick={() => handleDelete(img.id)} role='button' className='trash' size={30}/>
                    </div>
                  </div>
                </div>
              )
            })}
            </div>
            <Link className="btn btn-primary my-3 img-upload" style={{color: '#fff', textDecoration: "none"}} to={'/photoCard'}> New Image</Link>
          </div>
      </div>
    </div>
  )
}

export default Gallery