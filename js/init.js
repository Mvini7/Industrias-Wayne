document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser && window.location.pathname.includes('index.html')) {
        window.location.href = 'dashboard.html';
    }
    
    // Initialize default data if not exists
    initializeData();
});

function initializeData() {
    // Initialize users data
    if (!localStorage.getItem('users')) {
        try {
            fetch('json/users.json')
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem('users', JSON.stringify(data));
                })
                .catch(error => {
                    console.error('Error loading users data:', error);
                    setDefaultUsers();
                });
        } catch (error) {
            console.error('Error loading users data:', error);
            setDefaultUsers();
        }
    }

    // Initialize equipment data
    if (!localStorage.getItem('equipment')) {
        try {
            fetch('json/equipment.json')
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem('equipment', JSON.stringify(data));
                })
                .catch(error => {
                    console.error('Error loading equipment data:', error);
                    setDefaultEquipment();
                });
        } catch (error) {
            console.error('Error loading equipment data:', error);
            setDefaultEquipment();
        }
    }

    // Initialize calls data
    if (!localStorage.getItem('calls')) {
        try {
            fetch('json/calls.json')
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem('calls', JSON.stringify(data));
                })
                .catch(error => {
                    console.error('Error loading calls data:', error);
                    setDefaultCalls();
                });
        } catch (error) {
            console.error('Error loading calls data:', error);
            setDefaultCalls();
        }
    }

    // Initialize ratings data
    if (!localStorage.getItem('ratings')) {
        try {
            fetch('json/ratings.json')
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem('ratings', JSON.stringify(data));
                })
                .catch(error => {
                    console.error('Error loading ratings data:', error);
                    setDefaultRatings();
                });
        } catch (error) {
            console.error('Error loading ratings data:', error);
            setDefaultRatings();
        }
    }
}

function setDefaultUsers() {
    const users = [
        {
            id: 1,
            username: 'bruce',
            password: 'wayne123',
            name: 'Bruce Wayne',
            role: 'owner'
        },
        {
            id: 2,
            username: 'alfred',
            password: 'pennyworth123',
            name: 'Alfred Pennyworth',
            role: 'manager'
        },
        {
            id: 3,
            username: 'lucius',
            password: 'fox123',
            name: 'Lucius Fox',
            role: 'equipment'
        },
        {
            id: 4,
            username: 'gordon',
            password: 'jim123',
            name: 'Jim Gordon',
            role: 'calls'
        }
    ];
    localStorage.setItem('users', JSON.stringify(users));
}

function setDefaultEquipment() {
    const equipment = {
        weapons: 150,
        lostWeapons: 12,
        vehicles: 45,
        availableVehicles: 38
    };
    localStorage.setItem('equipment', JSON.stringify(equipment));
}

function setDefaultCalls() {
    const calls = [
        {
            id: 1,
            title: "Security breach at Gotham Bank",
            description: "Multiple armed suspects attempting entry",
            status: "in-progress",
            date: "2023-05-15"
        },
        {
            id: 2,
            title: "Suspicious activity at Arkham Asylum",
            description: "Possible escape attempt in progress",
            status: "in-progress",
            date: "2023-05-14"
        },
        {
            id: 3,
            title: "VIP protection request",
            description: "Mayor's fundraising event needs security",
            status: "resolved",
            date: "2023-05-10"
        },
        {
            id: 4,
            title: "Patrol request in East End",
            description: "Increased criminal activity reported",
            status: "discarded",
            date: "2023-05-08"
        }
    ];
    localStorage.setItem('calls', JSON.stringify(calls));
}

function setDefaultRatings() {
    const ratings = {
        3: 4, // Lucius Fox - 4 stars
        4: 3  // Jim Gordon - 3 stars
    };
    localStorage.setItem('ratings', JSON.stringify(ratings));
}