export interface ProductI {
  id: string;
  brand: {
    name: string;
  };
  title: string;
  quantity: string;
  article: string;
  yourPriceUAH: {
    amount: string;
    currency: {
      code: string;
    };
  };
}
