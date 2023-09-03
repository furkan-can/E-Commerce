export const fetchProductData = async () => {
    try {
      const response = await fetch(`https://5fc9346b2af77700165ae514.mockapi.io/products`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching product data:', error);
      return null;
    }
  };