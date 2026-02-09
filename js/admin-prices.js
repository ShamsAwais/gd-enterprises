// Admin Panel JavaScript for Managing Prices
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

let currentPrices = {};

// Category display names
const categoryNames = {
    electronics: '📱 Electronics & E-Waste',
    metals: '🔩 Metal Scrap',
    plastic: '♻️ Plastic Waste',
    batteries: '🔋 Batteries',
    paper: '📰 Waste Paper',
    appliances: '❄️ AC & Appliances',
    furniture: '🪑 Furniture',
    vehicle: '🚗 Vehicle Parts',
    electrical: '⚡ Electrical Waste'
};

// Login Form Handler
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('loginError');
    
    try {
        await auth.signInWithEmailAndPassword(email, password);
        errorMsg.style.display = 'none';
        showAdminPanel();
    } catch (error) {
        errorMsg.textContent = error.message;
        errorMsg.style.display = 'block';
    }
});

// Logout Handler
document.getElementById('logoutBtn').addEventListener('click', () => {
    auth.signOut();
    hideAdminPanel();
});

// Auth State Observer
auth.onAuthStateChanged(user => {
    if (user) {
        showAdminPanel();
        loadPrices();
    } else {
        hideAdminPanel();
    }
});

// Show/Hide Panels
function showAdminPanel() {
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'block';
}

function hideAdminPanel() {
    document.getElementById('loginContainer').style.display = 'block';
    document.getElementById('adminPanel').style.display = 'none';
}

// Load Prices from Firebase
async function loadPrices() {
    const loading = document.getElementById('loading');
    const content = document.getElementById('adminContent');
    
    loading.style.display = 'block';
    content.style.display = 'none';
    
    try {
        const snapshot = await database.ref('prices').once('value');
        currentPrices = snapshot.val();
        
        if (!currentPrices) {
            console.log('ℹ️ Firebase database is empty. Initialize it using the button below.');
            // Initialize with empty structure
            currentPrices = getDefaultPrices();
        } else {
            console.log('✅ Loaded prices from Firebase:', 
                Object.values(currentPrices).reduce((sum, arr) => sum + (arr?.length || 0), 0), 
                'items');
        }
        
        renderCategories();
        loading.style.display = 'none';
        content.style.display = 'block';
    } catch (error) {
        console.error('❌ Error loading prices:', error);
        loading.style.display = 'none';
        content.style.display = 'block';
        alert('⚠️ Error connecting to Firebase:\n\n' + error.message + 
              '\n\nPlease check:\n' +
              '1. Internet connection\n' +
              '2. Firebase configuration in firebase-config.js\n' +
              '3. Firebase Realtime Database is enabled');
    }
}

// Get default empty price structure
function getDefaultPrices() {
    return {
        electronics: [],
        metals: [],
        plastic: [],
        batteries: [],
        paper: [],
        appliances: [],
        furniture: [],
        vehicle: [],
        electrical: []
    };
}

// Render All Categories
function renderCategories() {
    const container = document.getElementById('categoriesContainer');
    const setupBanner = document.getElementById('setupBanner');
    container.innerHTML = '';
    
    // Check if database is empty
    let isEmpty = true;
    Object.keys(categoryNames).forEach(category => {
        if (currentPrices[category] && currentPrices[category].length > 0) {
            isEmpty = false;
        }
    });
    
    // Show setup banner if empty
    if (isEmpty && setupBanner) {
        setupBanner.style.display = 'block';
    } else if (setupBanner) {
        setupBanner.style.display = 'none';
    }
    
    Object.keys(categoryNames).forEach(category => {
        const section = createCategorySection(category);
        container.appendChild(section);
    });
}

// Create Category Section
function createCategorySection(category) {
    const section = document.createElement('div');
    section.className = 'category-section';
    section.id = `category-${category}`;
    
    const header = document.createElement('div');
    header.className = 'category-header';
    header.innerHTML = `
        <h2>${categoryNames[category]}</h2>
        <button class="btn-small btn-add" onclick="addPriceItem('${category}')">
            <i class="fas fa-plus"></i> Add Item
        </button>
    `;
    
    const itemsContainer = document.createElement('div');
    itemsContainer.id = `items-${category}`;
    
    section.appendChild(header);
    section.appendChild(itemsContainer);
    
    // Render existing items
    if (currentPrices[category]) {
        currentPrices[category].forEach((item, index) => {
            itemsContainer.appendChild(createPriceItem(category, item, index));
        });
    }
    
    return section;
}

// Create Price Item Row
function createPriceItem(category, item, index) {
    const div = document.createElement('div');
    div.className = 'price-item';
    div.innerHTML = `
        <input type="text" placeholder="Item Name" value="${item.item || ''}" 
               data-category="${category}" data-index="${index}" data-field="item">
        <input type="text" placeholder="Condition" value="${item.condition || ''}"
               data-category="${category}" data-index="${index}" data-field="condition">
        <input type="text" placeholder="Rate Range" value="${item.rateRange || ''}"
               data-category="${category}" data-index="${index}" data-field="rateRange">
        <button class="btn-small btn-delete" onclick="deletePriceItem('${category}', ${index})">
            <i class="fas fa-trash"></i>
        </button>
    `;
    
    // Add event listeners for live updates
    div.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', updatePriceData);
    });
    
    return div;
}

// Add New Price Item
window.addPriceItem = function(category) {
    if (!currentPrices[category]) {
        currentPrices[category] = [];
    }
    
    const newItem = { item: '', condition: '', rateRange: '' };
    currentPrices[category].push(newItem);
    
    const container = document.getElementById(`items-${category}`);
    const index = currentPrices[category].length - 1;
    container.appendChild(createPriceItem(category, newItem, index));
};

// Delete Price Item
window.deletePriceItem = function(category, index) {
    if (confirm('Are you sure you want to delete this item?')) {
        currentPrices[category].splice(index, 1);
        renderCategories();
    }
};

// Update Price Data
function updatePriceData(event) {
    const input = event.target;
    const category = input.dataset.category;
    const index = parseInt(input.dataset.index);
    const field = input.dataset.field;
    
    if (!currentPrices[category]) {
        currentPrices[category] = [];
    }
    
    if (!currentPrices[category][index]) {
        currentPrices[category][index] = {};
    }
    
    currentPrices[category][index][field] = input.value;
}

// Save All Changes
document.getElementById('saveBtn').addEventListener('click', async () => {
    const btn = document.getElementById('saveBtn');
    const successMsg = document.getElementById('successMessage');
    
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
    
    try {
        await database.ref('prices').set(currentPrices);
        
        successMsg.style.display = 'block';
        btn.innerHTML = '<i class="fas fa-check"></i> Saved!';
        
        setTimeout(() => {
            successMsg.style.display = 'none';
            btn.innerHTML = '<i class="fas fa-save"></i> Save All Changes';
            btn.disabled = false;
        }, 3000);
    } catch (error) {
        alert('Error saving prices: ' + error.message);
        btn.innerHTML = '<i class="fas fa-save"></i> Save All Changes';
        btn.disabled = false;
    }
});

// Refresh Prices
document.getElementById('refreshBtn').addEventListener('click', () => {
    if (confirm('Reload prices from database? Any unsaved changes will be lost.')) {
        loadPrices();
    }
});

// Initialize Database with Default Prices
document.getElementById('initializeBtn')?.addEventListener('click', async () => {
    const btn = document.getElementById('initializeBtn');
    if (!btn) return;
    
    if (!confirm('This will populate your database with all current scrap prices. Continue?')) {
        return;
    }
    
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Initializing...';
    
    try {
        // Use hardcoded prices (fetch doesn't work with file:// protocol)
        currentPrices = getHardcodedPrices();
        
        console.log('Initializing database with', 
            Object.values(currentPrices).reduce((sum, arr) => sum + arr.length, 0), 
            'price items...');
        
        // Save to Firebase
        await database.ref('prices').set(currentPrices);
        
        const totalItems = Object.values(currentPrices).reduce((sum, arr) => sum + arr.length, 0);
        
        alert('✅ Database initialized successfully!\n\n' +
              '📦 Added ' + totalItems + ' price items across 9 categories.\n\n' +
              'You can now edit any prices and click Save.');
        
        // Reload to show the data
        await loadPrices();
        
    } catch (error) {
        console.error('Error initializing:', error);
        alert('❌ Error initializing database:\n\n' + error.message + 
              '\n\nPlease check:\n' +
              '1. Internet connection\n' +
              '2. Firebase configuration in firebase-config.js\n' +
              '3. Firebase Database is enabled\n' +
              '4. Database rules allow writing');
        btn.innerHTML = '<i class="fas fa-database"></i> Initialize Database with Current Prices';
        btn.disabled = false;
    }
});

// Hardcoded prices as fallback
function getHardcodedPrices() {
    return {
        electronics: [
            { item: "Desktop Computers (Complete)", condition: "Working/Non-Working", rateRange: "₹500-2,000/unit" },
            { item: "Laptops", condition: "Working/Non-Working", rateRange: "₹800-5,000/unit" },
            { item: "Mobile Phones", condition: "Working/Non-Working", rateRange: "₹100-3,000/unit" },
            { item: "Computer Monitors (LCD/LED)", condition: "Working", rateRange: "₹200-800/unit" },
            { item: "Printers & Scanners", condition: "Any Condition", rateRange: "₹150-600/unit" },
            { item: "Keyboards & Mice", condition: "Bulk Quantity", rateRange: "₹10-50/unit" },
            { item: "E-Waste (Motherboards, CPUs)", condition: "Mixed", rateRange: "₹200-1,500/kg" }
        ],
        metals: [
            { item: "Iron Scrap (Heavy)", condition: "Clean, Heavy Metal", rateRange: "₹28-35/kg" },
            { item: "Iron Scrap (Light)", condition: "Thin Sheets, Tins", rateRange: "₹20-28/kg" },
            { item: "Steel Scrap (MS)", condition: "Mild Steel", rateRange: "₹30-38/kg" },
            { item: "Stainless Steel (304)", condition: "Clean SS", rateRange: "₹180-220/kg" },
            { item: "Copper Wire (Clean)", condition: "Pure Copper", rateRange: "₹520-580/kg" },
            { item: "Copper Wire (Mixed)", condition: "With Insulation", rateRange: "₹300-420/kg" },
            { item: "Aluminum Scrap (Clean)", condition: "Pure Aluminum", rateRange: "₹140-170/kg" },
            { item: "Aluminum Utensils", condition: "Old Vessels", rateRange: "₹120-150/kg" },
            { item: "Brass Scrap", condition: "Clean Brass", rateRange: "₹320-380/kg" },
            { item: "Cast Iron", condition: "Heavy Items", rateRange: "₹25-32/kg" }
        ],
        plastic: [
            { item: "PET Bottles (Type 1)", condition: "Clean, Sorted", rateRange: "₹25-35/kg" },
            { item: "HDPE Plastic", condition: "Industrial Grade", rateRange: "₹30-40/kg" },
            { item: "PP Plastic (Type 5)", condition: "Mixed Colors", rateRange: "₹20-30/kg" },
            { item: "PVC Plastic", condition: "Pipes & Fittings", rateRange: "₹15-25/kg" },
            { item: "ABS/Engineering Plastic", condition: "Clean", rateRange: "₹40-60/kg" },
            { item: "Mixed Plastic Waste", condition: "Bulk, Unsorted", rateRange: "₹10-20/kg" },
            { item: "Plastic Containers", condition: "Food Grade", rateRange: "₹18-28/kg" },
            { item: "Plastic Film/Sheets", condition: "Industrial", rateRange: "₹12-22/kg" }
        ],
        batteries: [
            { item: "Car Battery (Lead-Acid)", condition: "Standard 12V", rateRange: "₹120-160/kg" },
            { item: "Car Battery (Lead-Acid)", condition: "Per Unit (Average)", rateRange: "₹1,800-2,500/unit" },
            { item: "Inverter Battery", condition: "150Ah-200Ah", rateRange: "₹2,500-4,000/unit" },
            { item: "UPS Battery", condition: "Small to Medium", rateRange: "₹800-1,500/unit" },
            { item: "Industrial Battery", condition: "Large Capacity", rateRange: "₹130-180/kg" },
            { item: "Bike Battery", condition: "12V Small", rateRange: "₹300-600/unit" },
            { item: "Battery Plates (Lead)", condition: "Scrap Lead", rateRange: "₹140-180/kg" }
        ],
        paper: [
            { item: "Old Newspapers", condition: "Clean, Bundled", rateRange: "₹12-16/kg" },
            { item: "Magazines & Glossy Paper", condition: "Mixed", rateRange: "₹8-12/kg" },
            { item: "Old Books (Regular)", condition: "Paperback Books", rateRange: "₹10-14/kg" },
            { item: "Notebooks & Copies", condition: "Used School Books", rateRange: "₹8-12/kg" },
            { item: "Cardboard Boxes", condition: "Clean, Folded", rateRange: "₹10-14/kg" },
            { item: "Brown Cartons", condition: "Heavy Duty", rateRange: "₹12-16/kg" },
            { item: "Office Paper (White)", condition: "A4, Clean", rateRange: "₹14-18/kg" },
            { item: "Mixed Paper Waste", condition: "Bulk, Unsorted", rateRange: "₹6-10/kg" },
            { item: "Hard Cover Books", condition: "With Hard Cover", rateRange: "₹6-10/kg" }
        ],
        appliances: [
            { item: "Window AC (Non-Working)", condition: "1.0-1.5 Ton", rateRange: "₹2,000-4,000/unit" },
            { item: "Split AC (Non-Working)", condition: "1.0-1.5 Ton", rateRange: "₹2,500-5,000/unit" },
            { item: "Window AC (Working)", condition: "1.0-1.5 Ton", rateRange: "₹4,000-8,000/unit" },
            { item: "Split AC (Working)", condition: "1.0-1.5 Ton", rateRange: "₹5,000-10,000/unit" },
            { item: "Refrigerator (Single Door)", condition: "150-250L", rateRange: "₹1,500-3,500/unit" },
            { item: "Refrigerator (Double Door)", condition: "250-350L", rateRange: "₹2,500-5,000/unit" },
            { item: "Washing Machine (Top Load)", condition: "6-7 kg", rateRange: "₹1,200-2,500/unit" },
            { item: "Washing Machine (Front Load)", condition: "6-7 kg", rateRange: "₹1,500-3,000/unit" },
            { item: "Microwave Oven", condition: "Any Size", rateRange: "₹500-1,200/unit" },
            { item: "Water Heater (Geyser)", condition: "15-25L", rateRange: "₹400-1,000/unit" }
        ],
        furniture: [
            { item: "Wooden Furniture", condition: "Good Quality Wood", rateRange: "₹15-35/kg" },
            { item: "Wooden Furniture", condition: "Per Item (Average)", rateRange: "₹500-3,000/piece" },
            { item: "Metal Furniture", condition: "Iron/Steel Frames", rateRange: "₹25-35/kg" },
            { item: "Office Chairs", condition: "With Metal Base", rateRange: "₹200-800/unit" },
            { item: "Office Tables", condition: "Wooden/Metal", rateRange: "₹500-2,500/unit" },
            { item: "Almirah/Wardrobes", condition: "Large Size", rateRange: "₹1,000-4,000/unit" },
            { item: "Sofa Sets", condition: "Wooden Frame", rateRange: "₹1,500-5,000/set" }
        ],
        vehicle: [
            { item: "Car Scrap (Full Vehicle)", condition: "Per Ton", rateRange: "₹25,000-35,000/ton" },
            { item: "Bike Scrap (Full)", condition: "Old Two-Wheeler", rateRange: "₹2,000-5,000/unit" },
            { item: "Car Engine (Scrap)", condition: "Non-Working", rateRange: "₹3,000-8,000/unit" },
            { item: "Radiator", condition: "Copper/Aluminum", rateRange: "₹200-600/kg" },
            { item: "Catalytic Converter", condition: "With Precious Metals", rateRange: "₹2,000-8,000/unit" },
            { item: "Alloy Wheels", condition: "Aluminum", rateRange: "₹120-180/kg" },
            { item: "Steel Wheels/Rims", condition: "Iron/Steel", rateRange: "₹25-35/kg" },
            { item: "Used Tires", condition: "Scrap Rubber", rateRange: "₹15-30/kg" }
        ],
        electrical: [
            { item: "Copper Wire (Bare)", condition: "Pure Copper", rateRange: "₹520-580/kg" },
            { item: "Copper Wire (Insulated)", condition: "With PVC Cover", rateRange: "₹300-420/kg" },
            { item: "Aluminum Wire", condition: "Bare/Insulated", rateRange: "₹140-170/kg" },
            { item: "Electrical Cables (Mixed)", condition: "House Wiring", rateRange: "₹200-350/kg" },
            { item: "Electric Motors", condition: "Small to Medium", rateRange: "₹80-150/kg" },
            { item: "Ceiling Fans", condition: "Old/Non-Working", rateRange: "₹150-350/unit" },
            { item: "Transformers", condition: "With Copper Coils", rateRange: "₹200-400/kg" },
            { item: "Inverters/UPS", condition: "Old Units", rateRange: "₹500-1,500/unit" },
            { item: "Electrical Panels", condition: "With Components", rateRange: "₹100-250/kg" }
        ]
    };
}
