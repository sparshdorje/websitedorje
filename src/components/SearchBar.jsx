'use client';

import { Search, X, ImageIcon } from 'lucide-react';
import { useState } from 'react';
import { Input } from './ui/input';
import ProductService from '@/services/product';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';

const SearchBar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchClick = () => {
    setShowSearch(true);
    onInputChange();
  };

  const closeSearch = () => {
    setShowSearch(false);
    setSearchResults([]);
  };

  const onInputChange = async (e) => {
    const searchText = e?.target?.value || '';
    try {
      const response = await ProductService.getProductsBySearchText({
        searchText,
      });

      const products = response?.data?.data?.products?.edges || [];

      if (products.length > 0) {
        setSearchResults(products);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  if (showSearch) {
    return (
      <div className="relative flex-1">
        <div className="flex items-center gap-2 border-2 border-text-gray-500 rounded-full px-2 flex-1">
          <Input
            onChange={(e) => onInputChange(e)}
            className="bg-white outline-none border-none rounded-full disable-focus-ring"
            placeholder={'Search Items'}
          />
          <X
            onClick={closeSearch}
            className="h-4 w-4 flex-shrink-0 text-gray-400 hover:text-gray-500 cursor-pointer"
          />
        </div>

        <div className="absolute right-0 left-0 min-h-[400px] w-full bg-white z-30 border-black shadow-md rounded-md p-3 flex flex-1 flex-col gap-3">
          {searchResults.length > 0 ? (
            <>
              {searchResults?.map((product, idx) => (
                <Link
                  href={`/products/${product?.node?.handle}`}
                  onClick={() => {
                    setSearchResults([]);
                    setShowSearch(false);
                  }}
                >
                  <div key={idx} className="w-full flex gap-2">
                    <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
                      {product?.node?.images?.edges?.[0]?.node.url ? (
                        <Image
                          loading="lazy"
                          src={product?.node?.images?.edges?.[0]?.node.url}
                          alt={product.node.title}
                          width={300}
                          height={300}
                          className="h-full w-full absolute object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-secondary">
                          <ImageIcon
                            aria-hidden="true"
                            className="h-4 w-4 text-muted-foreground"
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col self-start">
                      <span className="line-clamp-1 text-sm font-medium mb-1 font-fraunces text-wrap">
                        {product.node.title}
                      </span>

                      <span className="font-questrial text-sm font-semibold">
                        {formatPrice(
                          product?.node?.variants?.edges?.[0]?.node?.price
                            ?.amount
                        )}
                      </span>

                      <span className="font-questrial text-gray-600 text-xs font-medium">
                        {product?.node?.variants?.edges?.[0]?.node?.title}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </>
          ) : (
            <div className="flex flex-col flex-1 items-center justify-center w-full h-full">
              <div className="font-fraunces text-base font-semibold">
                No Item Found
              </div>
              <div className="font-questrial text-xs">
                Type a Product Name to search
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <Search
        onClick={handleSearchClick}
        className="h-6 w-6 flex-shrink-0 text-gray-400 hover:text-gray-500 cursor-pointer"
      />
    </div>
  );
};

export default SearchBar;
