// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { transformItem } from '../../../utils';

export default async function handler({ query }, res) {
  const { q } = query;
  try {
    const response = await fetch(
      `https://api.mercadolibre.com/sites/MLA/search?q=${q}`
    );
    const data = await response.json();
    if (data.results.length > 0) {
      let categories = [];

      const availableCategoryFilter = data.available_filters.find(
        (filter) => filter.id === 'category'
      );

      if (availableCategoryFilter) {
        const categoriesResponse = await fetch(
          `https://api.mercadolibre.com/categories/${availableCategoryFilter.values[0].id}`
        );
        categories = await categoriesResponse.json();
      } else {
        categories = data.filters.find((filter) => filter.id === 'category')
          .values[0];
      }

      const items = data.results.map((i) => ({
        ...transformItem(i),
        location: i.seller_address.city.name,
      }));

      res.status(200).json({
        author: { name: 'Gonzalo', lastname: 'Castro' },
        categories: categories.path_from_root.map((cat) => cat.name),
        items,
      });
    } else {
      res.status(200).json({
        author: { name: 'Gonzalo', lastname: 'Castro' },
        categories: [],
        items: [],
      });
    }
  } catch (err) {
    res.status(500).json({ message: 'Unexpected error' });
  }
}
