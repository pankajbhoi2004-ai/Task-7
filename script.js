const userContainer = document.getElementById('userContainer');
const reloadBtn = document.getElementById('reloadBtn');

const fetchUsers = () => {
  userContainer.innerHTML = 'Loading users...';

  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(users => {
      userContainer.innerHTML = ''; // Clear loading text
      users.forEach(user => {
        const card = document.createElement('div');
        card.className = 'user-card';

        card.innerHTML = `
          <h3>${user.name}</h3>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
        `;

        userContainer.appendChild(card);
      });
    })
    .catch(error => {
      userContainer.innerHTML = `<p style="color:red;">Failed to load users: ${error.message}</p>`;
    });
};

// Initial fetch
fetchUsers();

// Reload button
reloadBtn.addEventListener('click', fetchUsers);
