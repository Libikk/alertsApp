import React from 'react';

type MyProps = {
    customLdObject: {
        title: string,
        imgPath: string,
        description: string,
    }
}

const portalDiscountedProducts = 'https://ddiscounthero.com/static/images/discounted-products.png';
const portalLogoUrl = 'https://ddiscounthero.com/static/images/logo-without-background.png';
const portalUrl = 'https://ddiscounthero.com/';
const portalDescription = 'DDiscountHero - track discounts of your favorite products and get them cheaper!';
const portalHeadline = `DDiscountHero - products discount tracker`;

const MetaTags = ({ customLdObject = {} } :MyProps) => {
    const defaultTags = {
      ogTitle: <meta property="og:title" content={portalHeadline} />,
      ogImage: <meta property="og:image" content={portalDiscountedProducts} />,
      imageSize: <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />,
      ogDescription: <meta property="og:description" content={portalDescription} />,
      description: <meta name="description" content={portalDescription} />,
      ogSiteName: <meta property="og:site_name" content="ddiscounthero.com" />,
      ld: <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
        __html:
        `{
          '@context': 'http://schema.org',
          '@type': 'Organization',
          name: 'DDiscounthero',
          headline: ${customLdObject.title || portalHeadline},
          image: ${customLdObject.imgPath || portalDiscountedProducts},
          description: ${customLdObject.description || portalDescription},
          logo: ${portalLogoUrl},
          url: ${portalUrl}
        }`,
      }}
      />,
    };
    return Object.values({
      ...defaultTags,
    });
}

export default MetaTags;

