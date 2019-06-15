const serverSideScan = require('./ServerSide');
const clientSideScan = require('./ClientSide');

let websites = [
    {
        name:"4ecoshop",
        link: 'https://4ecoshop.co.uk/gb/superfoods/',
        selector: '.discount-percentage',
        options: {
          regexCheck: /save/i
        },
        item: [
            {
                itemId: '509-barley-grass-ground-dried-grass-100g-intenson.html'
            },
            {
                itemId: 'wheat-seeds-rice/1101-energy-mix-nuts-dobra-kaloria-200g.html'
            },
            {
                itemId: '63-vanilla-pudding-organic-gluten-free-40g-amylon-8594006666473.html'
            },
            {
                itemId: '117-tahini-sesame-butter-185g-primavika-5900672300871.html'
            },
            {
                itemId: 'natural-cosmetics/932-deo-sport-xufas-in-cream.html'
            },
            {
                itemId: '932-deo-sport-xufas-in-cream.html'
            }
        ]
    },
    {
        name:"asda",
        link: 'https://groceries.asda.com/product/',
        selector: '.discount-percentage',
        clientSideCheck: true,
        options: {
          regexCheck: /save/i
        },
        item: [
            {
                itemId: 'nicotine-gums/asda-nicotine-replace-2mg-gum-peppermint-flavour/910002911935' // no
            },
            {
                itemId: 'ham-pork-slices/asda-thick-dry-cured-ham-slices/910000226837' // yes
            },
            {
                itemId: 'kids-yogurts/frubes-strawberry-flavour-yogurt/1000078555632' // yes
            },
            {
                itemId: 'kids-yogurts/yeo-valley-little-yeos-fruity-favourites-yogurt/1000000471824'// no
            },
            {
                itemId: 'chicken-turkey/asda-4-lime-coriander-chicken-breast-sizzle-steaks/1000132169293'// no
            },
            {
                itemId: 'fillets-grills/birds-eye-2-chicken-chargrills-periperi/910003005798' // no
            }
        ]
    }
]

websites.forEach((singleWeb) => {
    singleWeb.item.forEach((singleItem) => {

        if (singleWeb.clientSideCheck) {
            return 0
        }

    return serverSideScan.getServerSideCheck(
        singleWeb.link + singleItem.itemId,
        singleItem.selector || singleWeb.selector,
        singleItem.options || singleWeb.options
    )
    .then(isPromo => console.log('isPromo: ', isPromo, 'for: ' + singleItem.itemId))
    })
})
