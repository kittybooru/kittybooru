const urlParams = new URLSearchParams(window.location.search);
const imageId = urlParams.get('id');

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
    
    loadingEl.style.display = 'none';
    detailEl.style.display = 'grid';
    
    const imageUrl = getImageUrl(image.image_path);
    document.getElementById('fullImage').src = imageUrl;
    document.getElementById('fullImage').alt = `Image ${image.id}`;
    
    const tagsEl = document.getElementById('imageTags');
    const tags = image.tags || [];
    tagsEl.innerHTML = tags.map(tag => `
      <a href="index.html?tag=${encodeURIComponent(tag)}" class="tag">${tag}</a>
    `).join('');
    
    if (image.description) {
      document.getElementById('descriptionRow').style.display = 'block';
      document.getElementById('imageDescription').textContent = image.description;
    }
    
    const uploadDate = new Date(image.created_at);
    document.getElementById('uploadDate').textContent = uploadDate.toLocaleString();
    
    document.getElementById('imageId').textContent = image.id;
    
    document.title = `Image ${image.id} - KittyBooru`;
    
  } catch (error) {
    loadingEl.style.display = 'none';
    messageEl.innerHTML = `<div class="error">Error loading image: ${error.message}</div>`;
    console.error('Error loading image:', error);
  }
}

loadImage();
