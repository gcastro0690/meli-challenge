import { transformItem } from '../../../utils';

export default async function handler({ query }, res) {
  try {
    const { id } = query;
    const [itemResponse, descriptionResponse] = await Promise.all([
      fetch(`https://api.mercadolibre.com/items/${id}`),
      fetch(`https://api.mercadolibre.com/items/${id}/description`),
    ]);
    const itemData = await itemResponse.json();
    if (!itemData.error) {
      const item = transformItem(itemData);
      const { plain_text: description } = await descriptionResponse.json();

      const categoriesResponse = await fetch(
        `https://api.mercadolibre.com/categories/${itemData.category_id}`
      );
      const categories = await categoriesResponse.json();

      res.status(200).json({
        author: { name: 'Gonzalo', lastname: 'Castro' },
        item: {
          ...item,
          sold_quantity: itemData.sold_quantity,
          description,
          categories: categories.path_from_root.map((cat) => cat.name),
        },
      });
    } else {
      res.status(200).json({
        author: { name: 'Gonzalo', lastname: 'Castro' },
      });
    }
  } catch (err) {
    res.status(500).json({ message: 'Unexpected error' });
  }
}
