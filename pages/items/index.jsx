import Image from 'next/image';
import React from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import Price from '../../components/Price';
import { getBaseUrl, priceFormatter } from '../../utils';

export default function Items({ items, categories }) {
  return items.length > 0 ? (
    <div className="container">
      <Breadcrumb breadcrumb={categories} />
      {items.slice(0, 4).map((item) => (
        <ItemCard key={`item_${item.id}`} {...item} />
      ))}
    </div>
  ) : (
    <div className="NoResults container">
      <h2>No results</h2>
    </div>
  );
}

export const ItemCard = ({ id, title, picture, price, location }) => (
  <div
    className="ItemCard"
    onClick={() => (window.location.href = `/items/${id}`)}
  >
    <div className="ItemCard__thumb">
      <Image src={picture} alt={picture} layout="fill" objectFit="contain" />
    </div>
    <div className="ItemCard__info">
      <span>
        <Price {...price} />
        <div className="ItemCard__info__shipping">
          <Image
            src={'/assets/ic_shipping.png'}
            alt={picture}
            layout="fill"
            objectFit="contain"
          />
        </div>
      </span>
      <h2>{title}</h2>
    </div>
    <div className="ItemCard__location">{location}</div>
  </div>
);

export async function getServerSideProps({ req, query: { search } }) {
  const response = await fetch(`${getBaseUrl(req)}/api/items?q=${search}`);
  const data = await response.json();

  return {
    props: { ...data },
  };
}
