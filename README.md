# Elastic Path Moltin Gridsome Source

Elastic Path Moltin API source plugin for Gridsome. Pulls catalogue data from your Moltin Store into a Gridsome project. 

## Installation

`npm install --save-dev @bounteous/gridsome-source-moltin`

## Usage

`gridsome.config.js`
```js
const { join } = require('path');

module.exports = {
  plugins: [
    {
      use: '@bounteous/gridsome-source-moltin',
      options: {
        // Your Moltin Store Client ID
        // (🔗 https://dashboard.moltin.com/app)
        // It's a good idea to store this in an .env file
        clientId: process.env.GRIDSOME_MOLTIN_CLIENT_ID, 
        
        // Optional, Recommended. A directory to cache your store's files.
        // Enables the `image` field in MoltinFile types
        downloadPath: join(__dirname, '../content/moltin/files'),
      },
    },
  ],
};
```

## Schema

This source plugin currently imports a subset of the data available in the following types:

* MoltinProduct
* MoltinFile
* MoltinBrand
* MoltinCategory
* MoltinCollection

## Routes & Templates

You can create [template pages](https://gridsome.org/docs/templates/) for your project like so:

`gridsome.config.js`
```js
module.exports = {
  // …
  templates: {
    MoltinBrand: '/brand/:slug',
    MoltinCategory: '/category/:slug',
    MoltinCollection: '/collection/:slug',
    MoltinProduct: '/product/:slug',
  },
  // …
};
```

`templates/MoltinProduct.vue`
```vue
<template>
  <Layout>
    <h2>{{ $page.product.name }}</h2>

    <p>{{ $page.product.description }}</p>

    <g-image :src="$page.product.main_image.image_desktop" />

    </div>
  </Layout>
</template>

<page-query>
  query($id: ID!) {
    product: moltinProduct(id: $id) {
      id
      sku
      slug
      name
      status
      description
      manage_stock
      commodity_type
      created_at
      updated_at
      price {
        amount
      }
      main_image {
        id
        type
        file_name
        mime_type
        created_at
        # You can use named queries to fetch the same image in multiple sizes
        # Note: you can only use the `image` field if you've turned on file caching. 
        #   See Usage, above.
        image_mobile: image(width: 390, quality: 90)
        image_desktop: image(width: 590, quality: 90)
      }
      categories: belongsTo(filter: { typeName: { eq: MoltinCategory } }) {
        edges {
          node {
            ... on MoltinCategory {
              id
              name
              path
            }
          }
        }
      }
      brands: belongsTo(filter: { typeName: { eq: MoltinBrand } }) {
        edges {
          node {
            ... on MoltinBrand {
              id
              name
              path
            }
          }
        }
      }
      collections: belongsTo(filter: { typeName: { eq: MoltinCollection } }) {
        edges {
          node {
            ... on MoltinCollection {
              id
              name
              path
            }
          }
        }
      }
    }
  }
</page-query>
```

## License

This project is licensed under the MIT License. See LICENSE for details.

## Who we are

> Bounteous creates big-picture digital solutions that help leading companies deliver transformational brand experiences.

Founded in 2003 in Chicago, Bounteous creates big-picture digital solutions that help leading companies deliver transformational brand experiences. Our expertise includes Strategy, Experience Design, Technology, Analytics and Insight, and Marketing. Bounteous forms problem-solving partnerships with our clients to envision, design, and build their digital futures.

[We're hiring!](https://www.bounteous.com/careers/) And we are the commerce and front end experts you've been looking for. [Meet us](https://www.bounteous.com/).
