document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const currentUserStr = localStorage.getItem('currentUser');
    if (!currentUserStr) {
        window.location.href = 'login.html';
        return;
    }

    const currentUser = JSON.parse(currentUserStr);
    
    // Check if user has access to this page
    if (currentUser.role !== 'owner' && currentUser.role !== 'manager' && currentUser.role !== 'calls') {
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
    
    // Ensure calls data is initialized
    initializeCallsData();
    
    // Load calls data
    const calls = JSON.parse(localStorage.getItem('calls') || '[]');
    
    // Render calls table
    renderCallsTable(calls);
    
    // Modal functionality
    const modal = document.getElementById('add-call-modal');
    const modalOverlay = modal.querySelector('.modal-overlay');
    const modalClose = modal.querySelector('.modal-close');
    const addCallBtn = document.getElementById('add-call-btn');
    
    // Set today's date as default
    document.getElementById('call-date').valueAsDate = new Date();
    
    // Open modal
    addCallBtn.addEventListener('click', function() {
        modal.classList.add('modal-active');
    });
    
    // Close modal
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    
    function closeModal() {
        modal.classList.remove('modal-active');
    }
    
    // Add new call
    document.getElementById('add-call-submit').addEventListener('click', function() {
        const title = document.getElementById('call-title').value;
        const description = document.getElementById('call-description').value;
        const status = document.getElementById('call-status').value;
        const date = document.getElementById('call-date').value;
        
        if (!title || !description) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        const newId = calls.length > 0 ? Math.max(...calls.map(c => c.id)) + 1 : 1;
        const newCall = {
            id: newId,
            title,
            description,
            status,
            date
        };
        
        calls.push(newCall);
        localStorage.setItem('calls', JSON.stringify(calls));
        
        // Re-render table
        renderCallsTable(calls);
        
        // Reset form and close modal
        document.getElementById('call-title').value = '';
        document.getElementById('call-description').value = '';
        document.getElementById('call-status').value = 'in-progress';
        document.getElementById('call-date').valueAsDate = new Date();
        closeModal();
    });
    
    // Function to initialize calls data if not exists
    function initializeCallsData() {
        if (!localStorage.getItem('calls')) {
            const defaultCalls = [
                {
                    id: 1,
                    title: "Invasão no Banco de Gotham",
                    description: "Múltiplos suspeitos armados tentando entrar no prédio",
                    status: "in-progress",
                    date: "2023-05-15"
                },
                {
                    id: 2,
                    title: "Atividade suspeita no Asilo Arkham",
                    description: "Possível tentativa de fuga em andamento",
                    status: "in-progress",
                    date: "2023-05-14"
                },
                {
                    id: 3,
                    title: "Solicitação de proteção VIP",
                    description: "Evento de arrecadação do prefeito precisa de segurança",
                    status: "resolved",
                    date: "2023-05-10"
                },
                {
                    id: 4,
                    title: "Solicitação de patrulha na Zona Leste",
                    description: "Aumento de atividade criminal reportada na região",
                    status: "discarded",
                    date: "2023-05-08"
                },
                {
                    id: 5,
                    title: "Alarme disparado na Wayne Enterprises",
                    description: "Sistema de segurança detectou movimento no laboratório principal",
                    status: "in-progress",
                    date: "2023-05-16"
                },
                {
                    id: 6,
                    title: "Escolta para transporte de valores",
                    description: "Transferência de equipamentos de alta tecnologia para o centro de pesquisas",
                    status: "in-progress",
                    date: "2023-05-17"
                }
            ];
            localStorage.setItem('calls', JSON.stringify(defaultCalls));
        }
    }
    
    // Function to render calls table
    function renderCallsTable(calls) {
        const tableBody = document.getElementById('calls-table-body');
        tableBody.innerHTML = '';
        
        if (calls.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td colspan="6" class="px-4 py-3 text-center text-gray-400">
                    Nenhum chamado encontrado
                </td>
            `;
            tableBody.appendChild(row);
            return;
        }
        
        calls.forEach(call => {
            const row = document.createElement('tr');
            row.className = 'border-t border-gray-700';
            
            // Status badge
            let statusBadge;
            switch (call.status) {
                case 'resolved':
                    statusBadge = '<span class="px-2 py-1 text-xs rounded-full bg-green-600 text-white">Resolvido</span>';
                    break;
                case 'discarded':
                    statusBadge = '<span class="px-2 py-1 text-xs rounded-full bg-red-600 text-white">Descartado</span>';
                    break;
                case 'in-progress':
                default:
                    statusBadge = '<span class="px-2 py-1 text-xs rounded-full bg-yellow-600 text-white">Em Andamento</span>';
                    break;
            }
            
            // For mobile, we'll show a shorter description
            const shortDesc = call.description.length > 30 ? call.description.substring(0, 30) + '...' : call.description;
            
            row.innerHTML = `
                <td class="px-4 py-3">${call.id}</td>
                <td class="px-4 py-3">${call.title}</td>
                <td class="px-4 py-3 hide-on-mobile">${call.description}</td>
                <td class="px-4 py-3">${call.date}</td>
                <td class="px-4 py-3">${statusBadge}</td>
                <td class="px-4 py-3">
                    <div class="flex justify-center space-x-2">
                        <button class="text-green-500 hover:text-green-400" title="Marcar como Resolvido" data-id="${call.id}" data-action="resolve">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="text-yellow-500 hover:text-yellow-400" title="Marcar como Em Andamento" data-id="${call.id}" data-action="progress">
                            <i class="fas fa-clock"></i>
                        </button>
                        <button class="text-red-500 hover:text-red-400" title="Marcar como Descartado" data-id="${call.id}" data-action="discard">
                            <i class="fas fa-times"></i>
                        </button>
                        <button class="text-gray-400 hover:text-gray-300" title="Excluir Chamado" data-id="${call.id}" data-action="delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            tableBody.appendChild(row);
        });
        
        // Add event listeners for action buttons
        document.querySelectorAll('[data-action]').forEach(button => {
            button.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                const action = this.getAttribute('data-action');
                
                switch (action) {
                    case 'resolve':
                        updateCallStatus(id, 'resolved');
                        break;
                    case 'progress':
                        updateCallStatus(id, 'in-progress');
                        break;
                    case 'discard':
                        updateCallStatus(id, 'discarded');
                        break;
                    case 'delete':
                        deleteCall(id);
                        break;
                }
            });
        });
    }
    
    // Function to update call status
    function updateCallStatus(id, status) {
        const calls = JSON.parse(localStorage.getItem('calls') || '[]');
        const updatedCalls = calls.map(call => 
            call.id === id ? { ...call, status } : call
        );
        
        localStorage.setItem('calls', JSON.stringify(updatedCalls));
        renderCallsTable(updatedCalls);
    }
    
    // Function to delete call
    function deleteCall(id) {
        if (confirm('Tem certeza que deseja excluir este chamado?')) {
            const calls = JSON.parse(localStorage.getItem('calls') || '[]');
            const updatedCalls = calls.filter(call => call.id !== id);
            
            localStorage.setItem('calls', JSON.stringify(updatedCalls));
            renderCallsTable(updatedCalls);
        }
    }
});