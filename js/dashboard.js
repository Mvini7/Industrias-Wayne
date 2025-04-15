document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const currentUserStr = localStorage.getItem('currentUser');
    if (!currentUserStr) {
        window.location.href = 'login.html';
        return;
    }

    const currentUser = JSON.parse(currentUserStr);
    
    // Update greeting
    document.getElementById('user-greeting').textContent = `Olá, ${currentUser.name}`;
    if (document.getElementById('mobile-user-greeting')) {
        document.getElementById('mobile-user-greeting').textContent = `Olá, ${currentUser.name}`;
    }
    
    // Handle logout
    document.getElementById('logout-btn').addEventListener('click', logout);
    if (document.getElementById('mobile-logout-btn')) {
        document.getElementById('mobile-logout-btn').addEventListener('click', logout);
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
    
    // Generate dashboard cards based on user role
    const dashboardCards = document.getElementById('dashboard-cards');
    
    // Equipment Management Card - for owner, manager, equipment
    if (currentUser.role === 'owner' || currentUser.role === 'manager' || currentUser.role === 'equipment') {
        const equipmentCard = document.createElement('div');
        equipmentCard.className = 'bg-gray-800 rounded-lg shadow-lg p-4 md:p-6 hover:bg-gray-750 transition-colors card-hover';
        equipmentCard.innerHTML = `
            <div class="flex items-center space-x-3 mb-4">
                <div class="bg-blue-600 p-3 rounded-lg">
                    <i class="fas fa-truck text-white"></i>
                </div>
                <h3 class="text-lg md:text-xl font-semibold">Gestão de Equipamentos</h3>
            </div>
            <p class="text-gray-400 mb-4">Gerencie armas, veículos e equipamentos da empresa.</p>
            <a href="equipment.html" class="block w-full bg-blue-600 hover:bg-blue-700 text-center text-white py-2 px-4 rounded">
                Acessar
            </a>
        `;
        dashboardCards.appendChild(equipmentCard);
    }
    
    // Calls Management Card - for owner, manager, calls
    if (currentUser.role === 'owner' || currentUser.role === 'manager' || currentUser.role === 'calls') {
        const callsCard = document.createElement('div');
        callsCard.className = 'bg-gray-800 rounded-lg shadow-lg p-4 md:p-6 hover:bg-gray-750 transition-colors card-hover';
        callsCard.innerHTML = `
            <div class="flex items-center space-x-3 mb-4">
                <div class="bg-green-600 p-3 rounded-lg">
                    <i class="fas fa-phone-alt text-white"></i>
                </div>
                <h3 class="text-lg md:text-xl font-semibold">Gestão de Chamados</h3>
            </div>
            <p class="text-gray-400 mb-4">Gerencie chamados e ocorrências de segurança.</p>
            <a href="calls.html" class="block w-full bg-green-600 hover:bg-green-700 text-center text-white py-2 px-4 rounded">
                Acessar
            </a>
        `;
        dashboardCards.appendChild(callsCard);
    }
    
    // Ratings Card - for owner, manager
    if (currentUser.role === 'owner' || currentUser.role === 'manager') {
        const ratingsCard = document.createElement('div');
        ratingsCard.className = 'bg-gray-800 rounded-lg shadow-lg p-4 md:p-6 hover:bg-gray-750 transition-colors card-hover';
        ratingsCard.innerHTML = `
            <div class="flex items-center space-x-3 mb-4">
                <div class="bg-yellow-600 p-3 rounded-lg">
                    <i class="fas fa-star text-white"></i>
                </div>
                <h3 class="text-lg md:text-xl font-semibold">Avaliação de Funcionários</h3>
            </div>
            <p class="text-gray-400 mb-4">Avalie o desempenho dos funcionários da empresa.</p>
            <a href="ratings.html" class="block w-full bg-yellow-600 hover:bg-yellow-700 text-center text-white py-2 px-4 rounded">
                Acessar
            </a>
        `;
        dashboardCards.appendChild(ratingsCard);
    }
    
    function logout() {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    }
});