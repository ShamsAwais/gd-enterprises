/**
 * components.js – Shared navbar, footer, floating buttons & map for SEO pages.
 *
 * Usage in any nested page:
 *   <body data-root="../../">       ← relative path back to project root
 *     <div id="navbar"></div>
 *     ...page content...
 *     <div id="map-section"></div>   ← optional
 *     <div id="floating-buttons"></div>
 *     <div id="footer"></div>
 *     <script src="../../js/components.js"></script>
 *     <script src="../../js/script.js"></script>
 *     <script src="../../js/seo.js" defer></script>
 *   </body>
 */
(function () {
    'use strict';

    var R = document.body.getAttribute('data-root') || '';

    /* ── Navbar ──────────────────────────────────────────── */
    var nav = document.getElementById('navbar');
    if (nav) {
        nav.outerHTML = '<nav class="navbar">'
            + '<div class="container"><div class="navbar-content">'
            + '<a href="' + R + 'index.html" class="logo">'
            + '<img src="' + R + 'assets/logo.png" alt="G D Enterprises Logo" style="height:60px;width:auto;" fetchpriority="high" decoding="async">'
            + '</a>'
            + '<button class="mobile-toggle" id="mobileToggle"><span></span><span></span><span></span></button>'
            + '<ul class="nav-links" id="navLinks">'
            + '<li><a href="' + R + 'index.html">Home</a></li>'
            + '<li class="dropdown">'
            + '<a href="' + R + 'index.html#services" class="dropdown-toggle">Services <i class="fas fa-chevron-down"></i></a>'
            + '<ul class="dropdown-menu">'
            + buildSubmenu('electronics.html', 'fa-laptop', 'Electronics', [
                ['#old-computers','Old Computers'],['#laptops','Laptops & Notebooks'],
                ['#mobile-devices','Mobile Devices'],['#other-electronics','Other Electronics']])
            + buildSubmenu('ac-appliances.html', 'fa-snowflake', 'AC & Appliances', [
                ['#ac-units','AC Units'],['#refrigerators','Refrigerators'],
                ['#washing-machines','Washing Machines'],['#other-appliances','Other Appliances']])
            + buildSubmenu('metal-scrap.html', 'fa-tools', 'Metal Scrap', [
                ['#iron-scrap','Iron Scrap'],['#steel-scrap','Steel Scrap'],
                ['#copper-scrap','Copper Scrap'],['#aluminum-scrap','Aluminum Scrap']])
            + buildSubmenu('batteries.html', 'fa-battery-full', 'Batteries', [
                ['#car-batteries','Car Batteries'],['#industrial-batteries','Inverter Batteries'],
                ['#industrial-batteries','Industrial Batteries'],['#battery-components','Battery Components']])
            + buildSubmenu('furniture.html', 'fa-couch', 'Furniture', [
                ['#wooden-furniture','Wooden Furniture'],['#metal-furniture','Metal Furniture'],
                ['#office-furniture','Office Furniture'],['#furniture-materials','Furniture Materials']])
            + buildSubmenu('vehicle-parts.html', 'fa-car', 'Vehicle Parts', [
                ['#car-parts','Car Parts'],['#bike-parts','Bike Parts'],
                ['#vehicle-scrap','Vehicle Scrap'],['#equipment','Industrial Equipment Parts']])
            + buildSubmenu('waste-paper.html', 'fa-newspaper', 'Waste Paper', [
                ['#newspapers','Newspapers & Magazines'],['#books','Books & Notebooks'],
                ['#cardboard','Cardboard & Packaging'],['#office-paper','Office Paper']])
            + buildSubmenu('electrical-waste.html', 'fa-plug', 'Electrical Waste', [
                ['#wires-cables','Wires & Cables'],['#fans-motors','Motors'],
                ['#fans-motors','Fans & Coolers'],['#transformers','Transformers']])
            + buildSubmenu('construction-waste.html', 'fa-hard-hat', 'Construction Waste', [
                ['#demolition-waste','Demolition Waste Removal'],['#building-materials','Surplus Building Materials'],
                ['#concrete-debris','Concrete Waste'],['#renovation-waste','Renovation Waste']])
            + buildSubmenu('office-demolition.html', 'fa-building', 'Office Demolition', [
                ['#complete-dismantling','Complete Dismantling'],['#interior-removal','Interior Removal'],
                ['#furniture-clearance','Furniture Clearance'],['#buyback-services','Buyback Services']])
            + buildSubmenu('plastic-waste.html', 'fa-recycle', 'Plastic Waste', [
                ['#plastic-bottles','PET Bottles'],['#plastic-containers','Plastic Containers'],
                ['#industrial-plastic','Industrial Plastic'],['#household-plastic','Household Plastic Waste']])
            + buildSubmenu('waste-management.html', 'fa-trash-alt', 'Waste Management', [
                ['#municipal-waste','Municipal Waste'],['#industrial-waste','Industrial Waste'],
                ['#commercial-waste','Commercial Waste'],['#organic-waste','Organic Waste']])
            + '</ul></li>'
            + '<li><a href="' + R + 'prices.html">Prices</a></li>'
            + '<li><a href="' + R + 'blog/">Blog</a></li>'
            + '<li><a href="' + R + 'index.html#contact">Contact</a></li>'
            + '</ul>'
            + '</div></div></nav>';
    }

    function buildSubmenu(page, icon, label, items) {
        var h = '<li class="dropdown-submenu">'
            + '<a href="' + R + page + '"><i class="fas ' + icon + '"></i> ' + label + '</a>'
            + '<ul class="submenu-items">';
        for (var i = 0; i < items.length; i++) {
            h += '<li><a href="' + R + page + items[i][0] + '">' + items[i][1] + '</a></li>';
        }
        return h + '</ul></li>';
    }

    /* ── Floating Buttons ────────────────────────────────── */
    var fb = document.getElementById('floating-buttons');
    if (fb) {
        fb.outerHTML = '<div class="floating-buttons">'
            + '<a href="tel:+918143695940" class="float-btn phone-btn" title="Call us"><i class="fas fa-phone"></i></a>'
            + '<a href="https://wa.me/918143695940" target="_blank" class="float-btn whatsapp-btn" title="WhatsApp us"><i class="fab fa-whatsapp"></i></a>'
            + '</div>';
    }

    /* ── Google Map ──────────────────────────────────────── */
    var mp = document.getElementById('map-section');
    if (mp && !mp.querySelector('iframe')) {
        mp.outerHTML = '<section id="map-section" class="map-section"><div class="container">'
            + '<h2>Visit Our Location</h2><div class="map-container">'
            + '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.8699356502166!2d78.4939476!3d17.4180284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99cce01a43d9%3A0xb1a084d6dd71d73c!2sG%20D%20Enterprises%20%E2%80%93%20Scrap%20%26%20Garbage%20Dump%20Service!5e0!3m2!1sen!2sin!4v1769277419815!5m2!1sen!2sin" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
            + '</div></div></section>';
    }

    /* ── Footer ──────────────────────────────────────────── */
    var ft = document.getElementById('footer');
    if (ft) {
        ft.outerHTML = '<footer class="footer"><div class="container"><div class="footer-content">'
            + '<div class="footer-section">'
            + '<h3>G D Enterprises</h3>'
            + '<p>Hyderabad & Secunderabad\'s most trusted scrap dealer and kabadiwala. Best market rates, free doorstep pickup, and instant cash payment.</p>'
            + '<div class="social-links">'
            + '<a href="https://www.facebook.com/share/18BkPsLoK3/" target="_blank" title="Facebook"><i class="fab fa-facebook"></i></a>'
            + '<a href="https://www.instagram.com/gdenterprisesgarbagedump?igsh=YmJwN2NxYWxoY3Iy" target="_blank" title="Instagram"><i class="fab fa-instagram"></i></a>'
            + '<a href="https://www.youtube.com/@scrapgarbagedumpservices" target="_blank" title="YouTube"><i class="fab fa-youtube"></i></a>'
            + '<a href="https://x.com/mazhar_md98283" target="_blank" title="Twitter"><i class="fab fa-twitter"></i></a>'
            + '</div></div>'
            + '<div class="footer-section"><h3>Our Services</h3><ul>'
            + '<li><a href="' + R + 'electronics.html">Electronics</a></li>'
            + '<li><a href="' + R + 'ac-appliances.html">AC & Appliances</a></li>'
            + '<li><a href="' + R + 'metal-scrap.html">Metal Scrap</a></li>'
            + '<li><a href="' + R + 'batteries.html">Batteries</a></li>'
            + '<li><a href="' + R + 'furniture.html">Furniture</a></li>'
            + '<li><a href="' + R + 'vehicle-parts.html">Vehicle Parts</a></li>'
            + '<li><a href="' + R + 'waste-paper.html">Waste Paper</a></li>'
            + '<li><a href="' + R + 'electrical-waste.html">Electrical Waste</a></li>'
            + '<li><a href="' + R + 'construction-waste.html">Construction Waste</a></li>'
            + '<li><a href="' + R + 'office-demolition.html">Office Demolition</a></li>'
            + '</ul></div>'
            + '<div class="footer-section"><h3>Contact</h3>'
            + '<p><strong>Phone:</strong> <a href="tel:+918143695940">+91 8143695940</a></p>'
            + '<p><strong>Email:</strong> <a href="mailto:mdmazharuddin05@gmail.com">mdmazharuddin05@gmail.com</a></p>'
            + '<p><strong>Hours:</strong> 24/7 Available</p>'
            + '</div></div>'
            + '<div class="footer-bottom"><p>&copy; 2026 G D Enterprises. All rights reserved.</p></div>'
            + '</div></footer>';
    }
})();
