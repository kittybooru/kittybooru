const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('imageFile');
const uploadForm = document.getElementById('uploadForm');
const uploadBtn = document.getElementById('uploadBtn');
const previewEl = document.getElementById('preview');
const messageEl = document.getElementById('message');

dropZone.addEventListener('click', () => {
  fileInput.click();
});

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('dragover');
  
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    fileInput.files = files;
    handleFileSelect();
  }
});

fileInput.addEventListener('change', handleFileSelect);

function handleFileSelect() {
  const file = fileInput.files[0];
  if (!file) return;
  
  if (!file.type.startsWith('image/')) {
    showMessage('Please select an image file', 'error');
    return;
  }
  
  const reader = new FileReader();
  reader.onload = (e) => {
    previewEl.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
  };
  reader.readAsDataURL(file);
}

uploadForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const file = fileInput.files[0];
  if (!file) {
    showMessage('Please select an image', 'error');
    return;
  }
  
  const tagsInput = document.getElementById('tags').value.trim();
  const description = document.getElementById('description').value.trim();
  
  if (!tagsInput) {
    showMessage('Please add at least one tag', 'error');
    return;
  }
  
  const tags = tagsInput.split(',').map(tag => tag.trim().toLowerCase()).filter(tag => tag);
  
  if (tags.length === 0) {
    showMessage('Please add at least one valid tag', 'error');
    return;
  }
  
  uploadBtn.disabled = true;
  uploadBtn.textContent = 'Uploading...';
  messageEl.innerHTML = '';
  
  try {
    const imagePath = await uploadImage(file);
    
    const imageRecord = await createImageRecord(imagePath, tags, description);
    
    showMessage('Image uploaded successfully! Redirecting...', 'success');
    
    setTimeout(() => {
      window.location.href = `image.html?id=${imageRecord.id}`;
    }, 1500);
    
  } catch (error) {
    console.error('Upload error:', error);
    showMessage(`Upload failed: ${error.message}`, 'error');
    uploadBtn.disabled = false;
    uploadBtn.textContent = 'Upload Image';
  }
});

function showMessage(message, type) {
  messageEl.innerHTML = `<div class="${type}">${message}</div>`;
}
