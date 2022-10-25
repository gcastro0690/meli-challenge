import Image from 'next/image';
import React from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import Button from '../../components/Button';
import Price from '../../components/Price';
import { getBaseUrl, priceFormatter } from '../../utils';

const Item = ({ item }) => {
  return (
    <div className="container">
      <Breadcrumb breadcrumb={item.categories} />

      <div className="Item">
        <div className="Item__main">
          <div className="Item__main__image">
            <Image
              src={item.picture}
              alt={item.title}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="Item__main__description">
            <h2>Descripción del producto</h2>
            <p>{item.description}</p>
          </div>
        </div>
        <div className="Item__actions">
          <span className="Item__actions__status">
            {item.condition === 'new' ? 'Nuevo' : 'Usado'} -
            {` ${item.sold_quantity} vendidos`}
          </span>
          <h2>{item.title}</h2>
          <Price {...item.price} showDecimals />
          <Button>Comprar</Button>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ req, params: { id } }) {
  const response = await fetch(`${getBaseUrl(req)}/api/items/${id}`);
  const data = await response.json();
  if (!data.item) {
    return { notFound: true };
  }
  return {
    props: { ...data },
  };
}

export default Item;
