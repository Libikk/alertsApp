import React from 'react';
import Link from 'next/link';
import DiscountIcon from '../../static/svg/discounted.svg';

import { useDispatch } from 'react-redux';
import { deleteUserProduct } from '../../dispatchers/productDispatchers';

import ReactGA, { event } from 'react-ga';
import '../../styles/productsList.scss';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

interface ProductsListT {
    hostName: string,
    imageUrl: string,
    productName: string,
    productUrl: string,
    createdAt: string | undefined,
    isActive: number,
    productId: number,
    isPromo: number,
    productDiscountedPrice: string,
    productPrice: string,
  }

type MyProps = {
    products: Array<ProductsListT> | null,
    pageName: string,
};

const ProductsList = (props: MyProps) => {
    const dispatch = useDispatch()

    const onClickDeleteUserProduct = (productId :number) => {
        event({ category: 'product-list', action: 'click', label: 'delete-user-product' });
        return dispatch(deleteUserProduct(productId))
    }

    const truncate = (url: string) => {
        const maxUrlLength = 65;
        if (url && url.length > maxUrlLength) return url.substring(0, maxUrlLength) + '...';
        return url;
    };

    const onProductClick = (productId: number) => {
        console.log('productId: ', productId, typeof productId);
        event({ category: 'product-list', action: 'click', label: 'delete-user-product', value: productId });
    }

        const { products, pageName } = props
        const isLandingPage = pageName === 'landingPage';
      return (
          <section className="product-list__container">
              {
                products && products.map(singleProduct => {
                    const { productUrl, hostName, imageUrl, productName, productId, isActive, isPromo, productDiscountedPrice, productPrice } = singleProduct;
                    return (
                        <section className="container__product" key={productName + productId}>
                            <div className={`product__product-wrapper ${ !isActive && !isLandingPage && 'inactive-product' }`}>
                                <header>
                                    <h2 className="header__host-name">{hostName}</h2>
                                    <div className="header__img-wrapper">
                                        <img src={imageUrl || 'https://via.placeholder.com/200x200'} alt={'productName'} />
                                        {isPromo ? <DiscountIcon /> : ''}
                                        {
                                            !isLandingPage &&
                                            <div className="img-wrapper__delete-icon">
                                                <DeleteOutline onClick={() => onClickDeleteUserProduct(productId)}/>
                                            </div>
                                        }
                                    </div>
                                </header>
                                <div className="body">
                                    <ReactGA.OutboundLink eventLabel="product" to={productUrl} target="_blank">
                                        <a className="body__url">
                                            {productName || truncate(productUrl)}
                                        </a>
                                    </ReactGA.OutboundLink>
                                    {(productDiscountedPrice && productPrice) ?
                                        <div className="body__product-prices">
                                            <span className="product-prices__current-price">{productPrice}</span>
                                            <span className="product-prices__arrow"> --></span>
                                            <span className="product-prices__discounted-price">{productDiscountedPrice}</span>
                                        </div> :
                                        <div className="body__product-prices-unavailable">
                                            <span>Product prices are not available yet</span>
                                        </div>
                                    }
                                </div>
                                <article className="product-wrapper__inactive-message">
                                    <span>This product needs to be verified</span>
                                </article>
                            </div>
                        </section>
                    )
                })
              }
          </section>
    );
}

export default ProductsList;
