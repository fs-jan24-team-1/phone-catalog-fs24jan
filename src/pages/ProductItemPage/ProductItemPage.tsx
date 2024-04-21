import React, { useEffect, useState } from 'react';
import { getAccessories, getPhones, getTablets } from '../../api';
import { useParams } from 'react-router-dom';
import { ProductItemType } from '../../types/ProductItemType';
import { NotFoundPage } from '../NotFoundPage';
import { ButtonColor } from '../../components/UI/ButtonColor';
import styles from './productItemPage.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export const ProductItemPage = () => {
  const products = useSelector((state: RootState) => state.product.products);
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductItemType | null>(null);
  const [selectedColor, setSelectedColor] = useState(
    product?.colorsAvailable[0],
  );
  const [selectedCapacity, setSelectedCapacity] = useState(
    product?.capacityAvailable[0],
  );

  const productCategory = products.find(item => item.itemId === productId)?.category;
  let [items] = useState<ProductItemType[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (productCategory === 'phones') {
          items = await getPhones();
        } else if (productCategory === 'tablets') {
          items = await getTablets();
        } else if (productCategory === 'accessories') {
          items = await getAccessories();
        }

        const foundProduct = items.find(item => item.id === productId);
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error('Error fetching product');
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productCategory, productId]);


  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };
  console.log(handleColorChange, selectedColor);

  const handleCapacityChange = (capacity: string) => {
    setSelectedCapacity(capacity);
  };

  return (
    <div className="product-item">
      {product ? (
        <>
          <h1 className="title">{product.name}</h1>
          <div className="product-details">
            <div className="product-images">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={product.name}
                  className={`product-image ${index === 0 ? `${styles.mainImage}` : `${styles.thumbnailImage}`}`}
                />
              ))}
            </div>
            <div className="product-info">
              <p>
                <strong>Category:</strong> {product.category}
              </p>
              <p>
                <strong>Color:</strong>
              </p>
              <div className="color-buttons">
                {product.colorsAvailable.map((color, index) => (
                  <ButtonColor
                    key={index}
                    colorDevice={color}
                  />
                ))}
              </div>
              <p>
                <strong>Capacity:</strong>
              </p>
              <div className="capacity-buttons">
                {product.capacityAvailable.map((capacity, index) => (
                  <button
                    key={index}
                    onClick={() => handleCapacityChange(capacity)}
                    className={`capacity-button ${selectedCapacity === capacity ? 'selected' : ''}`}
                  >
                    {capacity}
                  </button>
                ))}
              </div>
              <p>
                <strong>Price:</strong> ${product.priceRegular}
              </p>
              <p>
                <strong>Description:</strong>
              </p>
              {product.description.map((desc, index) => (
                <div key={index}>
                  <p>
                    <strong>{desc.title}</strong>
                  </p>
                  <ul>
                    {desc.text.map((text, idx) => (
                      <li key={idx}>{text}</li>
                    ))}
                  </ul>
                </div>
              ))}
              <p>
                <strong>Screen:</strong> {product.screen}
              </p>
              <p>
                <strong>Resolution:</strong> {product.resolution}
              </p>
              <p>
                <strong>Processor:</strong> {product.processor}
              </p>
              <p>
                <strong>RAM:</strong> {product.ram}
              </p>
              <p>
                <strong>Camera:</strong> {product.camera}
              </p>
              <p>
                <strong>Zoom:</strong> {product.zoom}
              </p>
              <p>
                <strong>Cell:</strong>
              </p>
              <ul>
                {product.cell.map((cell, idx) => (
                  <li key={idx}>{cell}</li>
                ))}
              </ul>
            </div>
          </div>
        </>
      ) : (
        <NotFoundPage />
      )}
    </div>
  );
};
