/**
 * seo.js – Injects Schema.org structured data (JSON-LD) across the site.
 * Loaded on every page via <script src="js/seo.js" defer></script>
 *
 * Schemas injected:
 *   • LocalBusiness  – every page
 *   • BreadcrumbList – every page
 *   • FAQPage        – index (homepage) only
 *   • Service        – each service page
 */
(function () {
    'use strict';

    var SITE = 'https://www.scrapdealerhyderabad.com';

    /* ── business constants ────────────────────────────── */
    var biz = {
        name: 'G D Enterprises',
        alt: 'GD Enterprises Scrap & Garbage Dump Service',
        phone: '+918143695940',
        email: 'mdmazharuddin05@gmail.com',
        logo: SITE + '/assets/logo.png',
        social: [
            'https://www.facebook.com/share/18BkPsLoK3/',
            'https://www.instagram.com/gdenterprisesgarbagedump',
            'https://www.youtube.com/@scrapgarbagedumpservices',
            'https://x.com/mazhar_md98283',
            'https://www.linkedin.com/in/md-mazhar-63a0b53a6'
        ]
    };

    /* ── helpers ───────────────────────────────────────── */
    function inject(obj) {
        var s = document.createElement('script');
        s.type = 'application/ld+json';
        s.textContent = JSON.stringify(obj);
        document.head.appendChild(s);
    }

    var page = document.body.getAttribute('data-page'); // null on index

    /* ── 1. LocalBusiness (every page) ─────────────────── */
    inject({
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': SITE + '/#business',
        name: biz.name,
        alternateName: biz.alt,
        description: 'Best scrap dealer and kabadiwala in Hyderabad & Secunderabad. Free doorstep scrap pickup, best market rates, instant cash payment for metal, e-waste, paper, plastic, batteries, furniture and all scrap materials.',
        url: SITE,
        logo: biz.logo,
        image: biz.logo,
        telephone: biz.phone,
        email: biz.email,
        address: {
            '@type': 'PostalAddress',
            streetAddress: '1-4-550/28/A Gulshan Nagar, Bholakpur, Musheerabad',
            addressLocality: 'Hyderabad',
            addressRegion: 'Telangana',
            postalCode: '500020',
            addressCountry: 'IN'
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 17.4180284,
            longitude: 78.4939476
        },
        openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '00:00',
            closes: '23:59'
        },
        priceRange: '₹₹',
        areaServed: [
            { '@type': 'City', name: 'Hyderabad' },
            { '@type': 'City', name: 'Secunderabad' }
        ],
        sameAs: biz.social,
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Scrap Buying Services',
            itemListElement: [
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Electronics Scrap Buying' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AC & Appliances Scrap Buying' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Metal Scrap Buying' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Battery Scrap Buying' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Furniture Scrap Buying' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Vehicle Parts Scrap Buying' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Waste Paper Buying' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Electrical Waste Buying' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Construction Waste Removal' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Office Demolition & Dismantling' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Plastic Waste Buying' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Waste Management Services' } }
            ]
        }
    });

    /* ── 2. BreadcrumbList (every page) ────────────────── */
    var pageMap = {
        'electronics':        'Electronics Scrap Buying',
        'ac-appliances':      'AC & Appliances Scrap',
        'metal-scrap':        'Metal Scrap Buying',
        'batteries':          'Battery Scrap Buying',
        'furniture':          'Furniture Scrap Buying',
        'vehicle-parts':      'Vehicle Parts Scrap',
        'waste-paper':        'Waste Paper Scrap Buying',
        'electrical-waste':   'Electrical Waste Scrap',
        'construction-waste': 'Construction Waste Removal',
        'office-demolition':  'Office Demolition',
        'plastic-waste':      'Plastic Waste Scrap',
        'waste-management':   'Waste Management Services',
        'prices':             'Scrap Material Prices'
    };

    /* maps for new SEO page types */
    var cityMap = {
        'city-hyderabad':    { name: 'Scrap Dealer in Hyderabad',    slug: 'city/hyderabad/' },
        'city-secunderabad': { name: 'Scrap Dealer in Secunderabad', slug: 'city/secunderabad/' }
    };
    var areaMap = {
        'area-gachibowli':  { name: 'Gachibowli',  city: 'city-hyderabad',    slug: 'areas/gachibowli/' },
        'area-kukatpally':  { name: 'Kukatpally',   city: 'city-hyderabad',    slug: 'areas/kukatpally/' },
        'area-madhapur':    { name: 'Madhapur',     city: 'city-hyderabad',    slug: 'areas/madhapur/' },
        'area-kondapur':    { name: 'Kondapur',     city: 'city-hyderabad',    slug: 'areas/kondapur/' },
        'area-hitech-city': { name: 'Hitech City',  city: 'city-hyderabad',    slug: 'areas/hitech-city/' },
        'area-banjara-hills':{ name:'Banjara Hills', city: 'city-hyderabad',   slug: 'areas/banjara-hills/' },
        'area-jubilee-hills':{ name:'Jubilee Hills', city: 'city-hyderabad',   slug: 'areas/jubilee-hills/' },
        'area-ameerpet':    { name: 'Ameerpet',     city: 'city-hyderabad',    slug: 'areas/ameerpet/' },
        'area-miyapur':     { name: 'Miyapur',      city: 'city-hyderabad',    slug: 'areas/miyapur/' },
        'area-dilsukhnagar':{ name: 'Dilsukhnagar', city: 'city-hyderabad',    slug: 'areas/dilsukhnagar/' },
        'area-lb-nagar':    { name: 'LB Nagar',     city: 'city-hyderabad',    slug: 'areas/lb-nagar/' },
        'area-uppal':       { name: 'Uppal',        city: 'city-hyderabad',    slug: 'areas/uppal/' },
        'area-mehdipatnam': { name: 'Mehdipatnam',   city: 'city-hyderabad',   slug: 'areas/mehdipatnam/' },
        'area-malakpet':    { name: 'Malakpet',     city: 'city-hyderabad',    slug: 'areas/malakpet/' },
        'area-charminar':   { name: 'Charminar',    city: 'city-hyderabad',    slug: 'areas/charminar/' },
        'area-tarnaka':     { name: 'Tarnaka',      city: 'city-hyderabad',    slug: 'areas/tarnaka/' },
        'area-bowenpally':  { name: 'Bowenpally',   city: 'city-secunderabad', slug: 'areas/bowenpally/' },
        'area-malkajgiri':  { name: 'Malkajgiri',   city: 'city-secunderabad', slug: 'areas/malkajgiri/' },
        'area-alwal':       { name: 'Alwal',        city: 'city-secunderabad', slug: 'areas/alwal/' },
        'area-sainikpuri':  { name: 'Sainikpuri',   city: 'city-secunderabad', slug: 'areas/sainikpuri/' },
        'area-marredpally': { name: 'Marredpally',  city: 'city-secunderabad', slug: 'areas/marredpally/' },
        'area-trimulgherry':{ name: 'Trimulgherry', city: 'city-secunderabad', slug: 'areas/trimulgherry/' },
        'area-nacharam':    { name: 'Nacharam',     city: 'city-secunderabad', slug: 'areas/nacharam/' }
    };
    var materialMap = {
        'material-copper-scrap':    { name: 'Copper Scrap',    parent: 'metal-scrap', slug: 'materials/copper-scrap/' },
        'material-iron-scrap':      { name: 'Iron Scrap',      parent: 'metal-scrap', slug: 'materials/iron-scrap/' },
        'material-aluminium-scrap': { name: 'Aluminium Scrap', parent: 'metal-scrap', slug: 'materials/aluminium-scrap/' },
        'material-brass-scrap':     { name: 'Brass Scrap',     parent: 'metal-scrap', slug: 'materials/brass-scrap/' }
    };

    var crumbs = [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE + '/' }];

    if (page && pageMap[page]) {
        /* original service / prices pages */
        crumbs.push({ '@type': 'ListItem', position: 2, name: pageMap[page], item: SITE + '/' + page + '.html' });
    } else if (page && cityMap[page]) {
        /* city pages: Home > City */
        crumbs.push({ '@type': 'ListItem', position: 2, name: cityMap[page].name, item: SITE + '/' + cityMap[page].slug });
    } else if (page && areaMap[page]) {
        /* area pages: Home > City > Area */
        var a = areaMap[page], c = cityMap[a.city];
        if (c) crumbs.push({ '@type': 'ListItem', position: 2, name: c.name, item: SITE + '/' + c.slug });
        crumbs.push({ '@type': 'ListItem', position: crumbs.length + 1, name: a.name, item: SITE + '/' + a.slug });
    } else if (page && materialMap[page]) {
        /* material pages: Home > Parent Service > Material */
        var m = materialMap[page];
        if (pageMap[m.parent]) crumbs.push({ '@type': 'ListItem', position: 2, name: pageMap[m.parent], item: SITE + '/' + m.parent + '.html' });
        crumbs.push({ '@type': 'ListItem', position: crumbs.length + 1, name: m.name, item: SITE + '/' + m.slug });
    } else if (page === 'blog') {
        /* blog listing */
        crumbs.push({ '@type': 'ListItem', position: 2, name: 'Blog', item: SITE + '/blog/' });
    } else if (page && page.indexOf('blog-') === 0) {
        /* blog posts: Home > Blog > Post title from h1 */
        crumbs.push({ '@type': 'ListItem', position: 2, name: 'Blog', item: SITE + '/blog/' });
        var h1 = document.querySelector('h1');
        if (h1) crumbs.push({ '@type': 'ListItem', position: 3, name: h1.textContent.trim(), item: window.location.href });
    }

    inject({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: crumbs });

    /* ── 3. FAQPage (homepage only) ────────────────────── */
    if (!page) {
        var items = document.querySelectorAll('.faq-item');
        if (items.length) {
            var qa = [];
            items.forEach(function (el) {
                var q = el.querySelector('.faq-question span');
                var a = el.querySelector('.faq-answer p');
                if (q && a) {
                    qa.push({
                        '@type': 'Question',
                        name: q.textContent.trim(),
                        acceptedAnswer: { '@type': 'Answer', text: a.textContent.trim() }
                    });
                }
            });
            if (qa.length) inject({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: qa });
        }
    }

    /* ── 4. Service schema (service pages) ─────────────── */
    var svcDesc = {
        'electronics':        'We buy old computers, laptops, mobile phones and all e-waste at best prices with free doorstep pickup across Hyderabad & Secunderabad.',
        'ac-appliances':      'Sell your old AC units, refrigerators, washing machines and home appliances for best scrap prices in Hyderabad & Secunderabad.',
        'metal-scrap':        'Top rates for iron, steel, copper, aluminum and brass scrap. Trusted metal scrap dealer in Hyderabad & Secunderabad.',
        'batteries':          'Best prices for old car batteries, inverter batteries, UPS batteries and industrial battery scrap in Hyderabad & Secunderabad.',
        'furniture':          'Sell old wooden furniture, metal furniture, office furniture and get instant cash in Hyderabad & Secunderabad.',
        'vehicle-parts':      'Buy old car parts, bike parts, vehicle scrap and industrial equipment parts at best rates in Hyderabad & Secunderabad.',
        'waste-paper':        'Best prices for old newspapers, books, cardboard and all paper waste. Trusted raddi wala in Hyderabad & Secunderabad.',
        'electrical-waste':   'Sell old wires, cables, fans, motors and electrical components for best scrap prices in Hyderabad & Secunderabad.',
        'construction-waste': 'Professional construction debris removal, demolition waste clearance and building material disposal in Hyderabad & Secunderabad.',
        'office-demolition':  'Complete office dismantling, interior removal, furniture clearance and scrap buyback services in Hyderabad & Secunderabad.',
        'plastic-waste':      'Sell PET bottles, HDPE, plastic containers and industrial plastic waste at best rates in Hyderabad & Secunderabad.',
        'waste-management':   'Comprehensive waste collection, disposal and recycling services for municipal, industrial and commercial waste in Hyderabad & Secunderabad.'
    };

    if (page && svcDesc[page]) {
        inject({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: pageMap[page] + ' – G D Enterprises',
            description: svcDesc[page],
            provider: { '@type': 'LocalBusiness', '@id': SITE + '/#business', name: biz.name },
            areaServed: [
                { '@type': 'City', name: 'Hyderabad' },
                { '@type': 'City', name: 'Secunderabad' }
            ],
            url: SITE + '/' + page + '.html'
        });
    }

    /* ── 5. City / Area page schema ────────────────────── */
    if (page && cityMap[page]) {
        var ci = cityMap[page];
        inject({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Scrap Dealer & Kabadiwala in ' + ci.name.replace('Scrap Dealer in ',''),
            description: 'Best scrap buying service in ' + ci.name.replace('Scrap Dealer in ','') + '. Free doorstep pickup, best market rates & instant cash for all scrap materials.',
            provider: { '@type': 'LocalBusiness', '@id': SITE + '/#business', name: biz.name },
            areaServed: { '@type': 'City', name: ci.name.replace('Scrap Dealer in ','') },
            url: SITE + '/' + ci.slug
        });
    }

    if (page && areaMap[page]) {
        var ai = areaMap[page];
        inject({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Scrap Dealer & Kabadiwala in ' + ai.name,
            description: 'Best scrap buying service in ' + ai.name + '. Free doorstep pickup, best rates & instant cash for all scrap materials.',
            provider: { '@type': 'LocalBusiness', '@id': SITE + '/#business', name: biz.name },
            areaServed: { '@type': 'Place', name: ai.name },
            url: SITE + '/' + ai.slug
        });
    }

    /* ── 6. Material page schema ───────────────────────── */
    if (page && materialMap[page]) {
        var mi = materialMap[page];
        inject({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: mi.name + ' Buying – G D Enterprises',
            description: 'Sell ' + mi.name.toLowerCase() + ' at best rates in Hyderabad & Secunderabad. Free doorstep pickup and instant cash payment.',
            provider: { '@type': 'LocalBusiness', '@id': SITE + '/#business', name: biz.name },
            areaServed: [
                { '@type': 'City', name: 'Hyderabad' },
                { '@type': 'City', name: 'Secunderabad' }
            ],
            url: SITE + '/' + mi.slug
        });
    }

    /* ── 7. Blog Article schema ────────────────────────── */
    if (page && page.indexOf('blog-') === 0) {
        var title = document.querySelector('h1');
        var desc = document.querySelector('meta[name="description"]');
        var pub = document.querySelector('meta[property="article:published_time"]');
        inject({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: title ? title.textContent.trim() : document.title,
            description: desc ? desc.getAttribute('content') : '',
            author: { '@type': 'Organization', name: biz.name },
            publisher: {
                '@type': 'Organization',
                name: biz.name,
                logo: { '@type': 'ImageObject', url: biz.logo }
            },
            datePublished: pub ? pub.getAttribute('content') : '',
            mainEntityOfPage: window.location.href
        });
    }
})();
