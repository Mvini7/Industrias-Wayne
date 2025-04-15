document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        window.location.href = 'dashboard.html';
    }

    // Handle login form submission
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Find user with matching credentials
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
            // Store current user in localStorage
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = 'dashboard.html';
        } else {
            // Show error message
            const errorAlert = document.getElementById('error-alert');
            errorAlert.classList.remove('hidden');
            
            // Clear form
            document.getElementById('password').value = '';
        }
    });
});