const moment = require('moment');

const seedConfig = {
  websites: [
    {
      url: '"https://4ecoshop.co.uk"',
      urlToProduct: '"https://4ecoshop.co.uk/gb/superfoods/"',
      selector: '".product-price .discount-percentage"',
      createdAt: `"${moment().format('YYYY-MM-DD hh:ss')}"`,
      regexCheck: '"save"',
      isClientSideCheck: true,
    },
    {
      url: '"https://groceries.asda.com"',
      urlToProduct: '"https://groceries.asda.com/product/"',
      selector: '"#itemDetails .promoBanner"',
      createdAt: `"${moment().format('YYYY-MM-DD hh:ss')}"`,
      regexCheck: '"rollback"',
      isClientSideCheck: true,
    },
  ],
  products: [
    {
      websiteId: 1,
      createdAt: `"${moment().format('YYYY-MM-DD hh:ss')}"`,
      productUrl: '"509-barley-grass-ground-dried-grass-100g-intenson.html"',
    },
    {
      websiteId: 1,
      createdAt: `"${moment().format('YYYY-MM-DD hh:ss')}"`,
      productUrl: '"wheat-seeds-rice/1101-energy-mix-nuts-dobra-kaloria-200g.html"',
    },
    {
      websiteId: 1,
      createdAt: `"${moment().format('YYYY-MM-DD hh:ss')}"`,
      productUrl: '"63-vanilla-pudding-organic-gluten-free-40g-amylon-8594006666473.html"',
    },
    {
      websiteId: 1,
      createdAt: `"${moment().format('YYYY-MM-DD hh:ss')}"`,
      productUrl: '"117-tahini-sesame-butter-185g-primavika-5900672300871.html"',
    },
    {
      websiteId: 1,
      createdAt: `"${moment().format('YYYY-MM-DD hh:ss')}"`,
      productUrl: '"natural-cosmetics/932-deo-sport-xufas-in-cream.html"',
    },
    {
      websiteId: 1,
      createdAt: `"${moment().format('YYYY-MM-DD hh:ss')}"`,
      productUrl: '"932-deo-sport-xufas-in-cream.html"',
    },


    {
      websiteId: 2,
      createdAt: `"${moment().format('YYYY-MM-DD hh:ss')}"`,
      isClientSideCheck: true,
      productUrl: '"ham-pork-slices/asda-thick-dry-cured-ham-slices/910000226837"', // yes
    },
    {
      websiteId: 2,
      createdAt: `"${moment().format('YYYY-MM-DD hh:ss')}"`,
      isClientSideCheck: true,
      productUrl: '"nicotine-gums/asda-nicotine-replace-2mg-gum-peppermint-flavour/910002911935"', // no
    },
    {
      websiteId: 2,
      createdAt: `"${moment().format('YYYY-MM-DD hh:ss')}"`,
      isClientSideCheck: true,
      productUrl: '"fillets-grills/birds-eye-2-chicken-chargrills-periperi/910003005798"', // no
    },
    {
      websiteId: 2,
      createdAt: `"${moment().format('YYYY-MM-DD hh:ss')}"`,
      isClientSideCheck: true,
      productUrl: '"kids-yogurts/yeo-valley-little-yeos-fruity-favourites-yogurt/1000000471824"', // no
    },
    {
      websiteId: 2,
      createdAt: `"${moment().format('YYYY-MM-DD hh:ss')}"`,
      isClientSideCheck: true,
      productUrl: '"chicken-turkey/asda-4-lime-coriander-chicken-breast-sizzle-steaks/1000132169293"', // no
    },
    {
      websiteId: 2,
      createdAt: `"${moment().format('YYYY-MM-DD hh:ss')}"`,
      isClientSideCheck: true,
      productUrl: '"kids-yogurts/frubes-strawberry-flavour-yogurt/1000078555632"', // yes
    },
    {
      websiteId: 2,
      createdAt: `"${moment().format('YYYY-MM-DD hh:ss')}"`,
      isClientSideCheck: true,
      productUrl: '"oil/ktc-pure-butter-ghee/27535622"', // yes
    },
    {
      websiteId: 2,
      createdAt: `"${moment().format('YYYY-MM-DD hh:ss')}"`,
      isClientSideCheck: true,
      productUrl: '"cooking-oils/east-end-pure-butter-ghee-for-cooking/910002823480"', // no
    },

    {
      websiteId: 2,
      createdAt: `"${moment().format('YYYY-MM-DD hh:ss')}"`,
      isClientSideCheck: true,
      productUrl: '"washing-capsules-liquitabs/surf-tropical-lily-ylang-ylang-washing-capsules-30-washes/910003180806"', // yes
    },
    {
      websiteId: 2,
      createdAt: `"${moment().format('YYYY-MM-DD hh:ss')}"`,
      isClientSideCheck: true,
      productUrl: '"olive-oil/farchioni-il-casolare-extra-virgin-olive-oil/910002433869"', // no
    },
    {
      websiteId: 2,
      createdAt: `"${moment().format('YYYY-MM-DD hh:ss')}"`,
      isClientSideCheck: true,
      productUrl: '"duck-game-venison/asda-extra-special-whole-duck/1000005551124"', // no
    },
    {
      websiteId: 2,
      createdAt: `"${moment().format('YYYY-MM-DD hh:ss')}"`,
      isClientSideCheck: true,
      productUrl: '"intensive-conditioner-masks/garnier-ultimate-blends-hair-food-banana-3in1-dry-hair-mask-treatment/1000109748224"', // no
    },
    {
      websiteId: 2,
      createdAt: `"${moment().format('YYYY-MM-DD hh:ss')}"`,
      isClientSideCheck: true,
      productUrl: '"lamb-joints/asda-butchers-selection-lamb-leg-bone-in-joint-typically-2.15kg/6037108"', // no
    },
    {
      websiteId: 2,
      createdAt: `"${moment().format('YYYY-MM-DD hh:ss')}"`,
      isClientSideCheck: true,
      productUrl: '"beef-joints/asda-butchers-selection-large-beef-joint-typically-1.8kg/5996903"', // no
    },
  ],
  scans: [],
};

module.exports = seedConfig;
