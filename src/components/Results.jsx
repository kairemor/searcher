import React, { useState, useEffect } from 'react';
import { IonLoading, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/react';
import './Results.css';

function Results({ loading, products }) {
  const [items, setItems] = useState([]);
  const [index, setIndex] = useState(10)

  const fetchShowed = () => {
    setItems(products.slice(0, index))
  }

  useEffect(() => {
    fetchShowed();
  }, [products])

  function searchNext($event) {
    setIndex(index + 10)
    fetchShowed()
    $event.target.complete();

    if (index >= products.length) {
      setDisableInfiniteScroll(true)
    }
  }

  const [disableInfiniteScroll, setDisableInfiniteScroll] = useState(false);

  return (
    <IonGrid>
      <div className="products">
        <IonRow>
          {
            products ? items.map((product, index) => (
              <IonCol key={index} size="6">
                <IonCard>
                  <IonCardContent>
                    <div className='product '>
                      <a href={product.link}>
                        <div className="product__info">
                          <p>{product.title.substring(0, 30)}...</p>
                          <p className="product__price">
                            <strong>{product.price}</strong>
                          </p>
                        </div>
                        <img className="product__image" src={product.image} alt={product.title.substr(0, 20)} />
                      </a>
                      <button className={(() => {
                        switch (product.from) {
                          case "jumia": return "product__button jumia";
                          case "konga": return "product__button konga";
                          case "payporte": return "product__button payporte";
                          default: return "product__button jumia";
                        }
                      })()}>
                        {product.from}
                      </button>
                    </div>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            )) : ('')
          }
          <IonInfiniteScroll threshold="100px" disabled={disableInfiniteScroll}
            onIonInfinite={(e) => searchNext(e)}>
            <IonInfiniteScrollContent
              loadingText="Loading more products...">
            </IonInfiniteScrollContent>
          </IonInfiniteScroll>
        </IonRow>


        <IonLoading
          cssClass='my-custom-class'
          isOpen={loading}
          message={'Please wait...'}
        />

      </div>
    </IonGrid>

  )
}

export default Results;