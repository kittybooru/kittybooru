let isAdminMode = false;

function checkAdminSession() {
  return sessionStorage.getItem('admin_authenticated') === 'true';
}

function setAdminSession(value) {
  if (value) {
    sessionStorage.setItem('admin_authenticated', 'true');
  } else {
    sessionStorage.removeItem('admin_authenticated');
  }
  isAdminMode = value;
}

async function promptAdminPassword() {
  const password = prompt('Enter admin password:');
  if (!password) return false;
  
  if (password === 'admin123') {
    setAdminSession(true);
    return true;
  } else {
    alert('Incorrect password');
    return false;
  }
}

async function toggleAdminMode() {
  if (checkAdminSession()) {
    if (confirm('Exit admin mode?')) {
      setAdminSession(false);
      location.reload();
    }
  } else {
    const success = await promptAdminPassword();
    if (success) {
      location.reload();
    }
  }
}

function showAdminElements() {
  if (checkAdminSession()) {
    document.querySelectorAll('.admin-only').forEach(el => {
      el.style.display = '';
    });
    const adminBtn = document.getElementById('adminToggle');
    if (adminBtn) {
      adminBtn.textContent = 'Exit Admin';
      adminBtn.classList.add('admin-active');
    }
  }
}

if (checkAdminSession()) {
  isAdminMode = true;
}
