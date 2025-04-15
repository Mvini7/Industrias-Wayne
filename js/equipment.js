document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const currentUserStr = localStorage.getItem('currentUser');
    if (!currentUserStr) {
        window.location.href = 'login.html';
        return;
    }

    const currentUser = JSON.parse(currentUserStr);
    
    // Check if user has access to this page
    if (currentUser.role !== 'owner' && currentUser.role !== 'manager' && currentUser.role !== 'equipment') {
        window.location.href = 'dashboard.html';
        return;
    }
    
    // Update greeting
    document.getElementById('user-greeting').textContent = `Olá, ${currentUser.name}`;
    if (document.getElementById('mobile-user-greeting')) {
        document.getElementById('mobile-user-greeting').textContent = `Olá, ${currentUser.name}`;
    }
    
    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    
    if (mobileMenuBtn && mobileMenu && mobileMenuClose) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.add('active');
        });
        
        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    }
    
    // Load equipment data
    const equipmentData = JSON.parse(localStorage.getItem('equipment') || '{}');
    
    // Set form values
    document.getElementById('weapons').value = equipmentData.weapons || 0;
    document.getElementById('lostWeapons').value = equipmentData.lostWeapons || 0;
    document.getElementById('vehicles').value = equipmentData.vehicles || 0;
    document.getElementById('availableVehicles').value = equipmentData.availableVehicles || 0;
    
    // Update rates
    updateRates();
    
    // Add event listeners for input changes
    document.getElementById('weapons').addEventListener('input', updateRates);
    document.getElementById('lostWeapons').addEventListener('input', updateRates);
    document.getElementById('vehicles').addEventListener('input', updateRates);
    document.getElementById('availableVehicles').addEventListener('input', updateRates);
    
    // Save button event listener
    document.getElementById('save-equipment').addEventListener('click', function() {
        const equipment = {
            weapons: parseInt(document.getElementById('weapons').value) || 0,
            lostWeapons: parseInt(document.getElementById('lostWeapons').value) || 0,
            vehicles: parseInt(document.getElementById('vehicles').value) || 0,
            availableVehicles: parseInt(document.getElementById('availableVehicles').value) || 0
        };
        
        localStorage.setItem('equipment', JSON.stringify(equipment));
        alert('Dados de equipamentos atualizados com sucesso!');
    });
    
    // Function to update rates
    function updateRates() {
        const weapons = parseInt(document.getElementById('weapons').value) || 0;
        const lostWeapons = parseInt(document.getElementById('lostWeapons').value) || 0;
        const vehicles = parseInt(document.getElementById('vehicles').value) || 0;
        const availableVehicles = parseInt(document.getElementById('availableVehicles').value) || 0;
        
        // Update loss rate
        const lossRateElement = document.getElementById('loss-rate');
        if (weapons > 0) {
            const lossRate = (lostWeapons / weapons) * 100;
            lossRateElement.textContent = `${lossRate.toFixed(1)}%`;
            lossRateElement.className = lossRate > 10 ? 'text-red-400' : 'text-green-400';
        } else {
            lossRateElement.textContent = 'N/A';
            lossRateElement.className = 'text-gray-400';
        }
        
        // Update availability rate
        const availabilityRateElement = document.getElementById('availability-rate');
        if (vehicles > 0) {
            const availabilityRate = (availableVehicles / vehicles) * 100;
            availabilityRateElement.textContent = `${availabilityRate.toFixed(1)}%`;
            availabilityRateElement.className = availabilityRate < 70 ? 'text-red-400' : 'text-green-400';
        } else {
            availabilityRateElement.textContent = 'N/A';
            availabilityRateElement.className = 'text-gray-400';
        }
    }
});