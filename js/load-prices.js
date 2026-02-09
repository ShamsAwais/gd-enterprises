// Load Prices from Firebase Realtime Database
// This script loads prices dynamically from Firebase and populates the price tables

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Loading indicator
function showLoading() {
    document.querySelectorAll('.price-table tbody').forEach(tbody => {
        tbody.innerHTML = '<tr><td colspan="3" style="text-align: center; padding: 20px;"><i class="fas fa-spinner fa-spin"></i> Loading prices...</td></tr>';
    });
}

// Function to populate a price table
function populateTable(category, data) {
    const categoryMap = {
        'electronics': 'electronics-prices',
        'metals': 'metal-prices',
        'plastic': 'plastic-prices',
        'batteries': 'battery-prices',
        'paper': 'paper-prices',
        'appliances': 'appliance-prices',
        'furniture': 'furniture-prices',
        'vehicle': 'vehicle-prices',
        'electrical': 'electrical-prices'
    };

    const sectionId = categoryMap[category];
    if (!sectionId) return;

    const section = document.getElementById(sectionId);
    if (!section) return;

    const tbody = section.querySelector('.price-table tbody');
    if (!tbody) return;

    // Clear existing rows
    tbody.innerHTML = '';

    // Populate with new data
    if (data && Array.isArray(data) && data.length > 0) {
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.item || 'N/A'}</td>
                <td>${item.condition || 'N/A'}</td>
                <td>${item.rateRange || 'N/A'}</td>
            `;
            tbody.appendChild(row);
        });
    } else {
        tbody.innerHTML = '<tr><td colspan="3" style="text-align: center; padding: 20px;">No prices available</td></tr>';
    }
}

// Load prices from Firebase
function loadPrices() {
    showLoading();

    const pricesRef = database.ref('prices');
    
    pricesRef.once('value')
        .then(snapshot => {
            const prices = snapshot.val();
            
            if (prices) {
                // Populate all tables
                Object.keys(prices).forEach(category => {
                    populateTable(category, prices[category]);
                });
                console.log('✅ Prices loaded successfully from Firebase');
            } else {
                console.warn('⚠️ No prices found in Firebase. Loading from local JSON...');
                loadLocalPrices();
            }
        })
        .catch(error => {
            console.error('❌ Error loading prices from Firebase:', error);
            console.log('Loading from local JSON as fallback...');
            loadLocalPrices();
        });
}

// Fallback: Load prices from local JSON file
function loadLocalPrices() {
    fetch('data/prices.json')
        .then(response => response.json())
        .then(prices => {
            Object.keys(prices).forEach(category => {
                populateTable(category, prices[category]);
            });
            console.log('✅ Prices loaded from local JSON');
        })
        .catch(error => {
            console.error('❌ Error loading local prices:', error);
            document.querySelectorAll('.price-table tbody').forEach(tbody => {
                tbody.innerHTML = '<tr><td colspan="3" style="text-align: center; padding: 20px; color: red;">Error loading prices. Please refresh the page.</td></tr>';
            });
        });
}

// Listen for real-time updates
function listenForUpdates() {
    const pricesRef = database.ref('prices');
    
    pricesRef.on('value', snapshot => {
        const prices = snapshot.val();
        if (prices) {
            Object.keys(prices).forEach(category => {
                populateTable(category, prices[category]);
            });
            console.log('🔄 Prices updated in real-time');
        }
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    loadPrices();
    listenForUpdates();
});
