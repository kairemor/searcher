import React, { useState } from 'react';
import { IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import { search } from 'ionicons/icons';
import axios from 'axios';
import Results from '../components/Results';
import './Tab1.css';

const Tab1 = () => {
  const [input, setInput] = useState()
  const [home, setHome] = useState(true)
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])

  const searcher = (e) => {
    setHome(false)
    setLoading(true)
    e.preventDefault()
    axios.get(`https://searcher-product.herokuapp.com/api?search=${input}`)
      .then(data => {
        console.log(data.data);
        setLoading(false)
        setProducts(data.data.data)
      })
      .catch(err => console.log(err))
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className="search_container">
            <div className="container__search">
              <div className="container__searchContainer">
                <form onSubmit={(e) => searcher(e)} method="get">
                  <input onChange={(e) => setInput(e.target.value)} type="text" name="search" placeholder="Search... Laptop " />
                  <IonButton fill="clear" onClick={e => searcher(e)} >
                    <IonIcon icon={search} />
                  </IonButton>
                </form>
              </div>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Let Find Searcher</IonTitle>
          </IonToolbar>
        </IonHeader>
        <>
          {
            home ? (
              <div className="header">
                <video autoPlay>
                  <source src="https://searcher-product.herokuapp.com/home.mp4" type="video/mp4" />
                </video>

              </div>
            ) : ("")
          }
        </>
        <Results loading={loading} products={products} />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
