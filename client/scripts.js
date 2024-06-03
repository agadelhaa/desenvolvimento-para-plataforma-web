document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const usersTableBody = document.getElementById('usersTableBody');
  
    if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('floatingInputEmail').value;
        const password = document.getElementById('floatingInputPassword').value;
        const loginData = { email, password };
        const response = await fetch('http://localhost:8000/api/v1/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(loginData)
        });
  
        const result = await response.json();
        
        if (result.success) {
          alert('Login realizado com sucesso');
          window.location.href = 'index.html';
        } else {
          alert('Email ou senha inválido');
        }
      });
    }
  
    if (registerForm) {
      registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
  
        const firstName = document.getElementById('validationCustom01').value;
        const lastName = document.getElementById('validationCustom02').value;
        const email = document.getElementById('validationCustom03').value;
        const password = document.getElementById('inputPassword5').value;
  
        const formData = {
          firstName,
          lastName,
          email,
          password
        };
  
        const response = await fetch('http://localhost:8000/api/v1/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
  
        const result = await response.json();
        if (result.success) {
          alert('Usuário cadastrado com sucesso');
          window.location.href = 'login.html';
        } else {
          alert('Erro ao registrar o usuário: ' + result.message);
        }
      });
    }
  
    if (usersTableBody) {
      const loadUsers = async () => {
        const response = await fetch('http://localhost:8000/api/v1/users');
        const result = await response.json();
  
        if (result.users) {
          usersTableBody.innerHTML = result.users.map(user => `
            <tr>
              <th scope="row">${user._id}</th>
              <td>${user.firstName}</td>
              <td>${user.lastName}</td>
              <td>${user.email}</td>
              <td>
                <button class="btn btn-danger" onclick="deleteUser('${user._id}')">Excluir</button>
              </td>
            </tr>
          `).join('');
        }
      };
  
      loadUsers();
    }
  });
  
  async function deleteUser(id) {
    const response = await fetch(http://localhost:8000/api/v1/users/${id}, {
      method: 'DELETE'
    });
  
    const result = await response.json();
    if (result.user) {
      alert('Usuário excluído com sucesso');
      window.location.reload();
    } else {
      alert('Erro ao excluir o usuário');
    }
  }
  