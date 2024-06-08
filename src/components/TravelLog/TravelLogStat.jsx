import { FacebookRounded } from '@mui/icons-material';
import { WhatsappLogo, TwitterLogo, ArrowLeft } from 'phosphor-react';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import { doc, getDoc } from '@firebase/firestore';
import MainNav from '../Navbar/MainNav';
import { Link, useParams } from 'react-router-dom';

const TravelLogStat = () => {
  const { id } = useParams();
  const [memory, setMemory] = useState(null);

  useEffect(() => {
    const getDocument = async () => {
      try {
        const docRef = doc(db, 'Memories', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setMemory({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    }
    getDocument();
  }, [id]);

  const shareURL = window.location.href;

  function shareToMedia(platform) {
    let shareLink;
    switch (platform) {
      case 'Facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${shareURL}`;
        break;
      case 'Twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${shareURL}&text=Check%20out%20this%20awesome%20memory`;
        break;
      case 'Whatsapp':
        shareLink = `https://api.whatsapp.com/send?text=Check%20out%20this%20awesome%20memory%20${shareURL}`;
        break;
      default:
        console.error("Unsupported Platform");
        return;
    }
    window.open(shareLink, '_blank');
  }

  if (!memory) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <MainNav />
      <div className='container travelstatcon py-3'>
        <Link style={{textDecoration: "none", color: '#333'}} to={'/'}><ArrowLeft size={20}/> <p>Back</p></Link>
        <div className="row my-4" id={memory.id}>
          <div className='col-lg col-md-2 sm-2 logo'>
            <WhatsappLogo role='button' className='whatsapp' style={{ color: "lightgreen" }} size={32} onClick={() => shareToMedia('Whatsapp')} />
            <FacebookRounded role='button' className='facebook' fontSize='large' onClick={() => shareToMedia('Facebook')} />
            <TwitterLogo role='button' className='twitter' style={{ color: "lightskyblue" }} size={32} onClick={() => shareToMedia('Twitter')} />
          </div>
          <div className="col-lg-5 col-md-11-sm-11">
            <p>{memory.date}</p>
            <h2>{memory.title}</h2>
            <p>{memory.description}</p>
          </div>
          <div className="col-lg-6 col-md-11 sm-11">
            <img src={memory.imgURL} className='img-fluid rounded' height={600} alt={memory.title} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TravelLogStat;