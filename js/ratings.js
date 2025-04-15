document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const currentUserStr = localStorage.getItem('currentUser');
    if (!currentUserStr) {
        window.location.href = 'login.html';
        return;
    }

    const currentUser = JSON.parse(currentUserStr);
    
    // Check if user has access to this page
    if (currentUser.role !== 'owner' && currentUser.role !== 'manager') {
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
    
    // Load users data
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    // Filter out owner and manager
    const employees = users.filter(u => u.role !== 'owner' && u.role !== 'manager');
    
    // Load ratings data
    const ratings = JSON.parse(localStorage.getItem('ratings') || '{}');
    
    // Render employee cards
    const employeesContainer = document.getElementById('employees-container');
    
    employees.forEach(employee => {
        const card = document.createElement('div');
        card.className = 'bg-gray-800 rounded-lg shadow-lg p-4 md:p-6 card-hover';
        
        // Get role display name
        let roleDisplay;
        switch (employee.role) {
            case 'equipment':
                roleDisplay = 'Gestor de Equipamentos';
                break;
            case 'calls':
                roleDisplay = 'Gestor de Chamados';
                break;
            default:
                roleDisplay = employee.role;
                break;
        }
        
        // Create stars
        const currentRating = ratings[employee.id] || 0;
        let starsHtml = '';
        
        for (let i = 1; i <= 5; i++) {
            const starClass = i <= currentRating ? 'text-yellow-400' : 'text-gray-500';
            starsHtml += `
                <button class="p-1 ${starClass} star-btn" data-employee-id="${employee.id}" data-rating="${i}">
                    <i class="fas fa-star"></i>
                </button>
            `;
        }
        
        card.innerHTML = `
            <h3 class="text-lg md:text-xl font-semibold">${employee.name}</h3>
            <p class="text-gray-400 mb-2">${roleDisplay}</p>
            <div class="flex items-center space-x-2">
                <span class="text-sm text-gray-400">Avaliação:</span>
                <div class="flex">
                    ${starsHtml}
                </div>
            </div>
        `;
        
        employeesContainer.appendChild(card);
    });
    
    // Add event listeners for star buttons
    document.querySelectorAll('.star-btn').forEach(button => {
        button.addEventListener('click', function() {
            const employeeId = parseInt(this.getAttribute('data-employee-id'));
            const rating = parseInt(this.getAttribute('data-rating'));
            
            // Update ratings
            const ratings = JSON.parse(localStorage.getItem('ratings') || '{}');
            ratings[employeeId] = rating;
            localStorage.setItem('ratings', JSON.stringify(ratings));
            
            // Update UI
            const employeeStars = document.querySelectorAll(`.star-btn[data-employee-id="${employeeId}"]`);
            employeeStars.forEach((star, index) => {
                if (index < rating) {
                    star.classList.remove('text-gray-500');
                    star.classList.add('text-yellow-400');
                } else {
                    star.classList.remove('text-yellow-400');
                    star.classList.add('text-gray-500');
                }
            });
        });
    });
});