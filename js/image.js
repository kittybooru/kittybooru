const urlParams = new URLSearchParams(window.location.search);
const imageId = urlParams.get('id');

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

let currentImage = null;

async function loadImage() {
  const loadingEl = document.getElementById('loading');
  const messageEl = document.getElementById('message');
  const detailEl = document.getElementById('imageDetail');

  if (!imageId) {
    loadingEl.style.display = 'none';
    messageEl.innerHTML = '<div class="error">No image ID provided</div>';
    return;
  }

  try {
    loadingEl.style.display = 'block';
    
    const image = await getImageById(imageId);
    currentImage = image;
    
    loadingEl.style.display = 'none';
    detailEl.style.display = 'grid';
    
    const imageUrl = getImageUrl(image.image_path);
    document.getElementById('fullImage').src = imageUrl;
    document.getElementById('fullImage').alt = `Image ${image.id}`;
    
    const tagsEl = document.getElementById('imageTags');
    const tags = image.tags || [];
    tagsEl.innerHTML = tags.map(tag => `
      <a href="index.html?tag=${encodeURIComponent(tag)}" class="tag">${escapeHtml(tag)}</a>
    `).join('');
    
    if (image.description) {
      document.getElementById('descriptionRow').style.display = 'block';
      document.getElementById('imageDescription').textContent = image.description;
    }
    
    const uploadDate = new Date(image.created_at);
    document.getElementById('uploadDate').textContent = uploadDate.toLocaleString();
    
    document.getElementById('imageId').textContent = image.id;
    
    document.getElementById('likeCount').textContent = image.likes || 0;
    document.getElementById('dislikeCount').textContent = image.dislikes || 0;
    
    document.title = `Image ${image.id} - KittyBooru`;
    
    showAdminElements();
    
  } catch (error) {
    loadingEl.style.display = 'none';
    messageEl.innerHTML = `<div class="error">Error loading image: ${error.message}</div>`;
    console.error('Error loading image:', error);
  }
}

document.getElementById('likeBtn').addEventListener('click', async function() {
  try {
    this.disabled = true;
    await likeImage(parseInt(imageId));
    const countEl = document.getElementById('likeCount');
    countEl.textContent = parseInt(countEl.textContent) + 1;
    setTimeout(() => {
      this.disabled = false;
    }, 1000);
  } catch (error) {
    console.error('Error liking image:', error);
    alert('Failed to like image');
    this.disabled = false;
  }
});

document.getElementById('dislikeBtn').addEventListener('click', async function() {
  try {
    this.disabled = true;
    await dislikeImage(parseInt(imageId));
    const countEl = document.getElementById('dislikeCount');
    countEl.textContent = parseInt(countEl.textContent) + 1;
    setTimeout(() => {
      this.disabled = false;
    }, 1000);
  } catch (error) {
    console.error('Error disliking image:', error);
    alert('Failed to dislike image');
    this.disabled = false;
  }
});

document.getElementById('deleteBtn').addEventListener('click', async function() {
  if (!currentImage) return;
  
  if (!confirm('Are you sure you want to delete this image? This cannot be undone.')) {
    return;
  }
  
  try {
    this.disabled = true;
    await deleteImage(currentImage.id, currentImage.image_path);
    alert('Image deleted successfully');
    window.location.href = 'index.html';
  } catch (error) {
    console.error('Error deleting image:', error);
    alert('Failed to delete image: ' + error.message);
    this.disabled = false;
  }
});

loadImage();
