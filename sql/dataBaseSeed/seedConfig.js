const moment = require('moment');
const seedConfig = {
    websites: [
        {
            url: '"https://4ecoshop.co.uk"',
            urlToProduct: '"https://4ecoshop.co.uk/gb/superfoods/"',
            selector: '".discount-percentage"',
            createdAt: `"${moment().format('YYYY-MM-DD hh:ss')}"`,
            regexCheck: '"/save/i"',
            isClientSideCheck: false
        },
        {
            url: '"https://groceries.asda.com"',
            urlToProduct: '"https://groceries.asda.com/product/"',
            selector: '"#itemDetails .promoBanner"',
            createdAt: `"${moment().format('YYYY-MM-DD hh:ss')}"`,
            regexCheck: '"/rollback/i"',
            isClientSideCheck: true
        }
    ],
    products: [
        {
            websiteId: 1,
            createdAt: `"${moment().format('YYYY-MM-DD hh:ss')}"`,
            url: '"509-barley-grass-ground-dried-grass-100g-intenson.html"'
        },
        {
            websiteId: 1,
            createdAt: `"${moment().format('YYYY-MM-DD hh:ss')}"`,
            url: '"wheat-seeds-rice/1101-energy-mix-nuts-dobra-kaloria-200g.html"'
        },
        {
            websiteId: 1,
            createdAt: `"${moment().format('YYYY-MM-DD hh:ss')}"`,
            url: '"63-vanilla-pudding-organic-gluten-free-40g-amylon-8594006666473.html"'
        },
        {
            websiteId: 1,
            createdAt: `"${moment().format('YYYY-MM-DD hh:ss')}"`,
            url: '"117-tahini-sesame-butter-185g-primavika-5900672300871.html"'
        },
        {
            websiteId: 1,
            createdAt: `"${moment().format('YYYY-MM-DD hh:ss')}"`,
            url: '"natural-cosmetics/932-deo-sport-xufas-in-cream.html"'
        },
        {
            websiteId: 1,
            createdAt: `"${moment().format('YYYY-MM-DD hh:ss')}"`,
            url: '"932-deo-sport-xufas-in-cream.html"'
        },


        {
            websiteId: 2,
            createdAt: `"${moment().format('YYYY-MM-DD hh:ss')}"`,
            isClientSideCheck: true,
            url: '"ham-pork-slices/asda-thick-dry-cured-ham-slices/910000226837"' // yes
        },
        {
            websiteId: 2,
            createdAt: `"${moment().format('YYYY-MM-DD hh:ss')}"`,
            isClientSideCheck: true,
            url: '"nicotine-gums/asda-nicotine-replace-2mg-gum-peppermint-flavour/910002911935"' // no
        },
        {
            websiteId: 2,
            createdAt: `"${moment().format('YYYY-MM-DD hh:ss')}"`,
            isClientSideCheck: true,
            url: '"fillets-grills/birds-eye-2-chicken-chargrills-periperi/910003005798"' // no
        },
        {
            websiteId: 2,
            createdAt: `"${moment().format('YYYY-MM-DD hh:ss')}"`,
            isClientSideCheck: true,
            url: '"kids-yogurts/yeo-valley-little-yeos-fruity-favourites-yogurt/1000000471824"'// no
        },
        {
            websiteId: 2,
            createdAt: `"${moment().format('YYYY-MM-DD hh:ss')}"`,
            isClientSideCheck: true,
            url: '"chicken-turkey/asda-4-lime-coriander-chicken-breast-sizzle-steaks/1000132169293"'// no
        },
        {
            websiteId: 2,
            createdAt: `"${moment().format('YYYY-MM-DD hh:ss')}"`,
            isClientSideCheck: true,
            url: '"kids-yogurts/frubes-strawberry-flavour-yogurt/1000078555632"' //yes
        },
        {
            websiteId: 2,
            createdAt: `"${moment().format('YYYY-MM-DD hh:ss')}"`,
            isClientSideCheck: true,
            url: '"oil/ktc-pure-butter-ghee/27535622"' // yes
        },
        {
            websiteId: 2,
            createdAt: `"${moment().format('YYYY-MM-DD hh:ss')}"`,
            isClientSideCheck: true,
            url: '"cooking-oils/east-end-pure-butter-ghee-for-cooking/910002823480"' // no
        }
    ]
}

module.exports = seedConfig;