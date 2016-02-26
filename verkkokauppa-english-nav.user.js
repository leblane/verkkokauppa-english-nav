// ==UserScript==
// @name         Verkkokauppa English Nav
// @namespace    https://www.github.com/leblane/
// @version      0.1.1
// @description  Translates the navigation on verkkokauppa.com into English
// @author       leblane
// @match        *://www.verkkokauppa.com/*
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/zepto/1.1.6/zepto.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.10.0/lodash.min.js
// ==/UserScript==

var common_things = [
    ['#mainNav > h2:nth-child(1)', 'PRODUCTS'],
    ['#mainNav > h2:nth-child(3)', 'SERVICES'],
    ['#QA-main-nav > label > a', 'Products'],
    ['#QA-side-search > label > a', 'Search'],
    ['#header-search > fieldset > label.vk-button > span', 'Search'],
    ['#middle-section > ul > li:nth-child(1) > a', '<i class="vk-icon icon-map"></i>Stores'],
    ['#middle-section > ul > li:nth-child(2) > a', '<i class="vk-icon icon-businessguy"></i>Company Information'],
    ['#middle-section > ul > li:nth-child(3) > a', '<i class="vk-icon icon-help"></i>Help'],
    ['#header-newsletter-button', '<i class="vk-icon icon-letter"></i>Newsletter'],
    ['#login .vk-header__register', 'Register'],
    ['#login .vk-header__login', 'Login'],
    ['#menu-stores', 'Stores'],
    ['#storeHours > li > span', 'Opening Hours'],
    ['#menu-investors', 'Investors and Media'],
    ['#footer > ul.footer-nav > li:nth-child(3) > span', 'Social Media'],
    ['#q-field > label', 'Search Terms'],
    ['#fieldset-category > label', 'Category'],
    ['#b-field > label', 'Brand'],
    ['#fieldset-priceRange > label', 'Price (Euros)'],
    ['#sidebar-search-form > ul > li:nth-child(5) > div > dl > dt > label', 'Available At'],
    ['#sidebar-search-form > ul > li:nth-child(6) > div > dl > dt > label', 'Filters'],
    ['#sideSearch > p > a', 'Need search tips?'],
    ['.vk-product-row__cart-add', 'Add to Cart'],
    ['.vk-pagination-link.next', 'Next&nbsp;⇢'],
    ['.vk-pagination-link.prev', '⇠&nbsp;Prev'],
    ['.vk-pagination-link.last', 'Last page'],
    ['#default-filters-container > div.per-page-options-container > label', 'Products per page'],
    ['#default-filters-container > div.filter-options-container > label', 'Sort by:'],
    /* This is a bit iffy, they're so going to change it at some point */
    ['#default-filters-container > div.filter-options-container > nav > dl > dd > ul > li:nth-child(1) > a', 'Most relevant'],
    ['#default-filters-container > div.filter-options-container > nav > dl > dd > ul > li:nth-child(2) > a', 'Price, cheapest first'],
    ['#default-filters-container > div.filter-options-container > nav > dl > dd > ul > li:nth-child(3) > a', 'Price, highest first'],
    ['#default-filters-container > div.filter-options-container > nav > dl > dd > ul > li:nth-child(4) > a', 'Availability'],
    ['#default-filters-container > div.filter-options-container > nav > dl > dd > ul > li:nth-child(5) > a', 'Top'],
    ['#default-filters-container > div.filter-options-container > nav > dl > dd > ul > li:nth-child(6) > a', 'Title'],
    ['#default-filters-container > div.filter-options-container > nav > dl > dd > ul > li:nth-child(7) > a', 'Rating, best first'],
    ['#default-filters-container > div.filter-options-container > nav > dl > dd > ul > li:nth-child(8) > a', 'Reting, worst first'],
    ['#default-filters-container > div.filter-options-container > nav > dl > dd > ul > li:nth-child(9) > a', 'Newest'],
    ['.vk-price-tag__title', 'Price']
    
];

var categories = {
	'Grillaus ja kokkaus': ['Grilling and Cooking', {
            'Grillit ja grillaustarvikkeet': 'Barbecues and grills',
            'Kattaus ja tarjoilu': 'Tableware',
            'Kattilat ja kasarit': 'Pots and pans',
            'Lahjat': 'Gifts',
            'Leivonta': 'Baking',
            'Padat ja uunivuoat': 'Cassarole Dishes',
            'Paistinpannut': 'Frying Pans',
            'Ruoanvalmistusvälineet': 'Cooking Utensils',
            'Säilytys ja pakkaaminen': 'Storage and packaging',
            'Veitset': 'Knives',
            'Weber': 'Weber',
        }                      
    ],
    'Hifi ja audio': ['HiFi and Audio', {
        'Kaiuttimet': 'Speakers',
        'Kiinnikkeet ja jalustat': 'Mounts and Tripods',
        'Kuulokkeet': 'Headphones',
        'Pienhifi': 'Small Hifi',
        'Sanelimet': 'Voice Recorders',
        'Soittimet': 'Portable Players',
        'Vahvistimet': 'Amplifiers'
    }],
    'Kaapelit': ['Cables', {
        'Audio': 'Audio',
        'Auto': 'Car',
        'Komponentit': 'Components',
        'Oheislaitteet': 'Peripherals',
        'Tarvikkeet': 'Supplies',
        'Verkko': 'Network',
        'Video': 'Video',
        'Virta': 'Power'
    }], 
    'Kamerat': ['Cameras', {
        'Action-kamerat': 'Action Camera',
        'Autokamerat': 'Car Camers',
        'Digikamerat': 'Digital Cameras',
        'Digivideokamerat': 'Digital Video Camers',
        'Ilmakuvaus': 'Aerial Photography',
        'Jalustat': 'Tripods',
        'Järjestelmäkamerat': 'SLR Cameras',
        'Kiikarit ja kaukoputket': 'Binoculars and Telescopes',
        'Laukut ja kotelot': 'Bags and Cases',
        'Muistikortit': 'Memory Cards',
        'Objektiivit': 'Lenses',
        'Oheistuotteet': 'Accessories',
        'Pikakamerat': 'Instant Cameras',
        'Riistakamerat': 'Trail Cameras',
        'Suotimet': 'Filters',
        'Valaisu': 'Illumination'
    }],
    'Kellot': ['Watches', {
        'Aktiivisuusrannekkeet': 'Activity Trackers',
        'Sykemittarit': 'Heart Rate Monitors',
        'Tarvikkeet': 'Accessories',
        'Urheilukellot': 'Sports Watches',
        'Älykellot': 'Smart Watches'
    }],
    'Kodinkoneet': ['Domestic Appliances', {
        'Astianpesukoneet': 'Dishwashers',
        'Erillisuuni- ja keittotasopaketit': 'Oven/Hob Packages',
        'Jääkaappi- ja pakastinpaketit': 'Fridge/Freezer Packages',
        'Kodinkonepaketit': 'Over/Hob/Fridge Packages',
        'Kuivauskaapit': 'Drying Cabinets',
        'Kuivausrummut': 'Tumble Dryers',
        'Kylmälaitteet': 'Refrigeration Equipment',
        'Liedet ja uunit': 'Ovens and Hobs',
        'Liesituulettimet': 'Cooker Hoods',
        'Mankelit': 'Mangles',
        'Mikroaaltouunit': 'Microwaves',
        'Pesutornit': 'Washing Machine / Tumble Dryer Packages (Stackable)',
        'Pyykinpesukoneet': 'Washing Machines',
        'Tarvikkeet': 'Accessories'
    }],
    'Komponentit': ['Components', {
        'Asemat': 'Drives',
        'Asennus ja jäähdytys': 'Installation and Cooling',
        'Emolevyt': 'Motherboards',
        'Kotelot': 'Cases',
        'Kovalevyt': 'Hard Drives',
        'Mikrokontrollerit': 'Microcontrollers',
        'Muistit': 'Memory',
        'Näytönohjaimet': 'Graphics Cards',
        'Ohjainkortit': 'Controller Cards',
        'Prosessorit': 'Processors',
        'Virtalähteet': 'Power Supplies',
        'Äänikortit': 'Sound Cards'
    }],
    'Koti ja piha': ['Home and Garden', {
        'Kastelu': 'Irrigation',
        'Lamput ja valaisimet': 'Lamps and Lighting',
        'Puutarha': 'Garden',
        'Siivous ja kodinhoito': 'Cleany and Laundry',
        'Sisustus': 'Decor',
        'Sähkö ja elektroniikka': 'Electricity and Electronics'
    }],
    'Laukut ja matkailu': ['Bags and Travel', {
        'Festarivarustus': 'Festivals',
        'Kannettaville tietokoneille': 'For notebooks',
        'Lapset': 'Children',
        'Lompakot ja kukkarot': 'Wallets and Purses',
        'Matkalaukut': 'Travel Bags',
        'Matkatekstiilit': 'Travel Gear and Accessories',
        'Muut': 'Other',
        'Reput': 'Backpacks',
        'Sadesuojat': 'Waterproofs',
        'Soittimille': 'MP3 Players',
        'Tableteille': 'Tablets',
        'Urheilu': 'Sports',
        'Vesitiiviit suojat': 'Waterproof Covers',
        'Vyölaukut': 'Belts'
    }],
    'Lelut': ['Toys', {
        'Askartelu ja pukeutuminen': 'Crafts and Fancy Dress',
        'Kauko-ohjattavat': 'Remote Controlled',
        'Klassikkolelut': 'Classic Toys',
        'Lahjat ja keräilyesineet': 'Gifts and Collectibles',
        'Nuket ja pehmolelut': 'Dolls and Cuddly Toys',
        'Pelit ja ulkolelut': 'Games and Outdoor Toys',
        'Rakentaminen ja tiede': 'Construction and Science',
    }],
    'Musiikki': ['Music', {
        'DJ-laitteet': 'DJ Equipment',
        'Kitarat': 'Guitars',
        'Kosketinsoittimet': 'Keyboards',
        'Mikrofonit': 'Microphones',
        'Muut tuotteet': 'Other Products',
        'Ohjelmistot': 'Softwate',
        'PA- ja esitystekniikka': 'PA and Stage Equipment',
        'Rummut': 'Drums',
        'Studiolaitteet': 'Studio Equipment',
        'Studiomonitorit': 'Studio Monitors',
        'Syntetisaattorit': 'Synthesizers',
        'Tallentimet': 'Recording',
        'Äänikortit':  'Sound Cards'
    }],
    'Muut tuotteet': ['Other Products', {
        'Autotarvikkeet': 'Car Accessories',
        'Kampanjat': 'Promotions',
        'Lahjakortit': 'Gift Cards',
        'Lapset': 'Children',
        'Matkustus ja retkeily': 'Travel and Hiking',
        'Myymälätuotteet': 'Shop Products',
        'Sekalaiset': 'Sundries',
        'Sponsorointi': 'Sponsored',
        'Vaatteet': 'Clothing'
    }],
    'Oheislaitteet': ['Peripherals', {
        'Asemat': 'Drives',
        'Faxit': 'Fax Machines',
        'Hiiret': 'Mice',
        'Kuvanlukijat': 'Scanners',
        'Kytkinlaatikot ja jakajat': 'Switch Boxes and Dividers',
        'Mikrofonit': 'Microphones',
        'Muut': 'Other',
        'Näppäimistöt': 'Keyboards',
        'Näytöt': 'Screens',
        'Piirtopöydät': 'Graphics Tablets',
        'Sähköiset kirjat': 'E-Readers',
        'Tulostimet': 'Printers',
        'Ulkoiset kovalevyt': 'External Hard Drives',
        'USB-muistit': 'USB Flash DRives',
        'Videoeditointi': 'Video Editing',
        'Videoprosessorit/Skaalaimet': 'Video processors / Scalers',
        'Virransyöttö': 'Power Supplies',
        'Web-kamerat': 'Webcams'
    }],
    'Ohjelmistot': ['Software', {
        'Aktivointikortit': 'Activation Cards',
        'Kuvat ja video': 'Images and video',
        'Musiikki': 'Music',
        'Opiskelijoille': 'For Studens',
        'Tietoturva': 'Security',
        'Toimisto': 'Office',
        'Työkalut ja käyttöjärjestelmät': 'Tools and Utilities',
        'Uuden tietokoneen ostajalle': 'For new computers',
        'Volyymilisenssit': 'Volume Licences'
    }],
    'Pelit ja viihde': ['Games and Entertainment', {
        'Elokuvat': 'Movies',
        'Oheistuotteet': 'Related Products',
        'Pelikonsolit ja tarvikkeet': 'Game Consoles and Accessories',
        'Peliohjaimet': 'Game Controllers',
        'Pelit 3DS':  '3DS Games',
        'Pelit DS': 'DS Games',
        'Pelit Mac': 'Mac Games',
        'Pelit PC': 'PC Games',
        'Pelit PS Vita': 'PS Vita Games',
        'Pelit PS2': 'PS2 Games',
        'Pelit PS3': 'PS3 Games',
        'Pelit PS4': 'PS4 Games',
        'Pelit PSP': 'PSP Games',
        'Pelit Wii': 'Wii Games',
        'Pelit Wii U': 'Wii U Games',
        'Pelit Xbox 360': 'Xbox 360 Games',
        'Pelit Xbox One': 'Xbox One Games'
    }],
    'Pienkoneet': ['Small Appliances', {
        'Hiilihapotuslaitteet': 'Carbonators',
        'Ilmastointi ja huoneilma': 'Air-conditioning and Ventilation',
        'Kahvi': 'Coffee Machines',
        'Kauneus &amp; terveys': 'Health &amp; Beauty',
        'Keittiökoneet': 'Kitchen Appliances',
        'Kodinhoito': 'Home Maintenance',
        'Parranajokoneet ja trimmerit': 'Shavers and Trimmers',
        'Pölynimurit': 'Vacuum Cleaners',
        'Sähköhammasharjat': 'Electric Toothbrushes'
    }],
    'Puhelimet': ['Phones', {
        'Autotarvikkeet': 'Car Accesories',
        'Handsfree': 'Hands Free',
        'Laturit, datakaapelit, akut': 'Chargers, Data Cables, Batteries',
        'Laukut ja kotelot': 'Bags and Cases',
        'Muut tarvikkeet': 'Other Accesories',
        'Navigointi': 'Navigation',
        'Puettavat älylaitteet': 'Wearable Devices',
        'Puhelimet': 'Phones',
        'Suojakalvot': 'Protective Films'
    }],
    'Ruoka ja juoma': ['Food and Drink', {
        'Herkkukorit': 'Deli Hampers',
        'Juomat': 'Drinks',
        'Kahvi ja tee': 'Coffee and Tea',
        'Koti ja keittiö': 'Home and Kitchen',
        'Lapset': 'Children',
        'Lisäravinteet':  'Nutritional Supplements',
        'Makeiset ja keksit': 'Sweets and Biscuits',
        'Maustaminen': 'Seasoning',
        'Snacksit ja pähkinät': 'Snacks and Nuts',
        'Taukotilat': 'Break room',
        'Valmisruoka': 'Ready made food'
    }],
    'Tarvike/toimisto': ['Office Supplies', {
        'Arkistointi ja säilytys': 'Filing and Storage',
        'Ergonomia': 'Ergonomics',
        'Hiirimatot': 'Mouse Mats',
        'Kirjoitus- ja esitystaulut': 'Writing- and Whiteboards',
        'Konferenssipuhelimet': 'Conference Phones',
        'Kynät ja kynätarvikkeet': 'Pens and Accessories',
        'Laskimet': 'Calculators',
        'Mapit ja kansiot': 'Maps and Folders',
        'Mediat': 'Media',
        'Nitojat ja lävistäjät': 'Staplers and hole punchers',
        'Pakkausmateriaalit': 'Packing Material',
        'Paristot, akut ja laturit': 'Batteries and Chargers',
        'Puhdistus': 'Cleaning Supplies',
        'Sekalaiset': 'Miscellaneous',
        'Sidonta ja laminointi': 'Binding and Laminating',
        'Silppurit ja leikkurit': 'Shredders and Cutters',
        'Teipit ja liimat': 'Tapes and adhesives',
        'Tietoturvasuojat': 'Computer Security',
        'Tulostus': 'Printing',
        'Vihkot ja muistikirjat': 'Notebooks and Diaries'
    }],
    'Tietokoneet': ['Computer Hardware', {
        'Kannettavat': 'Portable',
        'Palvelimet': 'Servers',
        'Pöytä': 'Desktops',
        'Rungot': 'Barebone PCs',
        'Tabletit': 'Tablets',
        'Thin-Client': 'Thin-Client'
    }],
    'TV/Video': ['TV/Video', {
        'Antennit': 'Antennas',
        'Blu-ray / DVD': 'Blu-ray / DVD',
        'Digiboksit': 'Digiboxes',
        'Kotiteatterijärjestelmät': 'Home Cinema',
        'Mediatoistimet': 'Media Players',
        'Projektorit': 'Projectors',
        'Tarvikkeet ja kiinnikkeet': 'Accessories and Fittings',
        'Televisiot': 'Televisions'
    }],
    'Työkalut': ['Tools', {
        'Aggregaatit ja juotos': 'Aggregates and Soldering',
        'Käsityökalut': 'Hand Tools',
        'Liimat ja teipit': 'Adhesives and Tapes',
        'Moottorisahat': 'Chainsaws',
        'Painepesurit ja imurit': 'Pressure Washers and Vacuum Cleaners',
        'Sähkötyökalut': 'Power Tools',
        'Säilytys ja työpöydät': 'Storage and Desks',
        'Terät ja tarvikkeet': 'Blades and Accessories',
        'Tikkaat': 'Ladders'
    }],
    'Urheilu ja ravinteet': ['Sports and Nurtition', {
        'Fitness ja kuntoilu': 'Fitness and Excercise',
        'Kellot': 'Watchs',
        'Lisäravinteet': 'Nutritional Supplements',
        'Pyöräily': 'Cycling',
        'Ulkoilu ja retkeily': 'Outdoor Activities and Camping',
        'Urheiluelektroniikka': 'Sports Electronics'
    }],
    'Vauvat ja perhe': ['Kids and Family', {
        'Elektroniikka': 'Electronics',
        'Huonekalut ja sisustus': 'Furniture and Decor',
        'Imetys ja ruokailu': 'Breast-feeding and Bottles',
        'Kantaminen': 'Carrying',
        'Lastenruoka': 'Baby Food',
        'Lastenvaunut ja rattaat': 'Prams and Pushchairs',
        'Nukkuminen ja petivaatteet': 'Sleeping and Bedding',
        'Polkupyöräily': 'Cycling',
        'Tarvikkeet': 'Supplies',
        'Turvaistuimet': 'Car Seats',
        'Vaipat': 'Nappies',
        'Vauvalelut': 'Baby Toys'
    }],
    'Verkko': ['Networking', {
        'Automaatio ja etäohjaus': 'Automation and Remote Controll',
        'Hälytysjärjestelmät': 'Alarm Systems',
        'Kytkimet': 'Switches',
        'Langattomat': 'Wireless',
        'Modeemit': 'Modems',
        'Muut': 'Other',
        'Palomuurit': 'Firewalls',
        'Sähköverkkoon': 'Electricity Networking',
        'Tallennusratkaisut': 'Storage Solutions',
        'Valvonta': 'Surveillance',
        'Verkkokortit': 'Network Cards'
    }],
    
    /* Services */
    'Asennuspalvelut': ['Instalation services', {}],
    'Huoltopalvelut': ['After sales sefvice', {}],
    'Liittymät': ['Subscriptions', {}],
    'Yritysmyynti': ['Business Sales', {}]
};

var activeCategoryElement = $('#mainNav > .navigation > li[class^="cat"].active > a');
var activeCategory;
if(activeCategoryElement) {
    activeCategory = activeCategoryElement.text();
}

/* Main Categories */
var elements = $('#mainNav > .navigation > li[class^="cat"] > a, #mainNav > .navigation > li[class^="servicesbusinesssales"] > a');
_.each(elements, function(i) {
    var $i = $(i);
    var text = $i.text();
    
    if(text in categories) {
        $i.html($i.html().replace(text, categories[text][0]));
    }
});

/* Sub Categories */
if(activeCategoryElement) {
    var elements = $('#mainNav > .navigation > li[class^="cat"].active > ul > li > a');
    _.each(elements, function(i) {
        var $i = $(i);
        var text = $i.text();
        text = $('<div/>').text(text).html();
        
        if(text in categories[activeCategory][1]) {
            $i.html($i.html().replace(text, categories[activeCategory][1][text]));
        }
    });
}

/* Common Things */
_.each(common_things, function(thing) {
    $(thing[0]).html(thing[1]);
});


/* Special Cases */
$('#sideSearch-submit').val('Search Products');
$('#searchTerms, #header-search > fieldset > label:nth-child(2) > input').attr('placeholder', 'Enter a keyword or part number');
$('#mnp').attr('placeholder', 'Min price');
$('#mxp').attr('placeholder', 'Max price');

$('.vk-product-row__meta .vk-label').each(function(index, e) {
    console.log(e);
    var $e = $(e);
    $(e).html($e.html().replace('Tuote', 'Product'));
});
