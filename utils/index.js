export const transformItem = ({
  id,
  title,
  price: amount,
  currency_id: currency,
  pictures,
  condition,
  shipping,
  thumbnail,
}) => ({
  id,
  title,
  price: { currency, amount, decimals: '00' },
  picture: pictures ? pictures[0].url : thumbnail,
  condition,
  free_shipping: shipping?.free_shipping,
});

export const getBaseUrl = (req) => {
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  return req ? `${protocol}://${req.headers.host}` : '';
};

export const priceFormatter = (currency) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: currency,
    maximumFratcionDigits: 0,
  });
