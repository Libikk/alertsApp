import React from 'react';
import Link from 'next/link';
import '../../styles/productList.scss';

type MyProps = {
    products: Array
  };

export default class ProductsList extends React.Component<MyProps> {
    render() {

        const { products } = this.props
      return (
          <section className="product-list__container">
              {
                products && products.map(singleProduct => {
                    const { productUrl, hostName, imageUrl, productName } = singleProduct;
                    return (
                        <section className="container__product">
                            <header>
                                <h2 className="product__host-name">{hostName}</h2>
                                <div className="product__img-wrapper">
                                    <img src={imageUrl} alt={'productName'} onError={(e)=> { e.target.onerror = null; e.target.src="https://via.placeholder.com/200x200"}}/>
                                </div>
                            </header>
                            <body>
                                <Link href={productUrl} >
                                    <a className="">
                                        {productName || 'LINK'}
                                    </a>
                                </Link>
                            </body>
                        </section>
                    )
                })
              }
          </section>
    );
  }
}