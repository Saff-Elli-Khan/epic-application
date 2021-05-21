export interface PackageInterface {
  name: string;
  version: string;
  description: string;
  brand: {
    name: string;
    country: string;
    address: string;
  };
  author: string;
  license: string;
}

export interface LanguageInterface {
  name: string;
  code: string;
  nativeName: string;
}

export interface CurrencyInterface {
  code: string;
  name: string;
  rate: null | number;
  symbol: string;
  image: string;
}
