let allImages = [];
let currentFilter = '';

async function loadGallery() {
  const galleryEl = document.getElementById('gallery');
  const loadingEl = document.getElementById('loading');
  const messageEl = document.getElementById('message');

  try {
    loadingEl.style.display = 'block';
    messageEl.innerHTML = '';
    
    allImages = await getAllImages();
    
    loadingEl.style.display = 'none';
    
    if (allImages.length === 0) {
      messageEl.innerHTML = '<div class="error">No images found. <a href="upload.html" style="color: var(--accent);">Upload your first image!</a></div>';
      return;
    }
    
    displayImages(allImages);
    await loadTagCloud();
    
  } catch (error) {
    loadingEl.style.display = 'none';
    messageEl.innerHTML = `<div class="error">Error loading gallery: ${error.message}</div>`;
    console.error('Error loading gallery:', error);
  }
}

function displayImages(images) {
  const galleryEl = document.getElementById('gallery');
  
  if (images.length === 0) {
    galleryEl.innerHTML = '<div class="loading">No images match your search.</div>';
    return;
  }
  
  galleryEl.innerHTML = images.map(image => {
    const imageUrl = getImageUrl(image.image_path);
    const tags = image.tags || [];
    
    return `
      <div class="gallery-item" onclick="window.location.href='image.html?id=${image.id}'">
        <img src="${imageUrl}" alt="Image ${image.id}" loading="lazy">
        <div class="gallery-item-info">
          <div class="gallery-item-tags">
            ${tags.slice(0, 5).map(tag => `<span class="tag">${tag}</span>`).join('')}
            ${tags.length > 5 ? `<span class="tag">+${tags.length - 5}</span>` : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

async function loadTagCloud() {
  const tagCloudEl = document.getElementById('tagCloud');
  
  try {
    const tagCounts = await getTagCounts();
    
    if (tagCounts.length === 0) {
      tagCloudEl.innerHTML = '<div class="loading">No tags yet</div>';
      return;
    }
    
    tagCloudEl.innerHTML = tagCounts.slice(0, 20).map(({ tag, count }) => `
      <span class="tag" onclick="filterByTag('${tag}')">
        ${tag}<span class="tag-count">${count}</span>
      </span>
    `).join('');
    
  } catch (error) {
    console.error('Error loading tags:', error);
    tagCloudEl.innerHTML = '<div class="error">Error loading tags</div>';
  }
}

function filterByTag(tag) {
  currentFilter = tag;
  document.getElementById('searchInput').value = tag;
  searchImages();
}

async function searchImages() {
  const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
  
  if (!searchTerm) {
    displayImages(allImages);
    return;
  }
  
  try {
    const filtered = await searchImagesByTag(searchTerm);
    displayImages(filtered);
  } catch (error) {
    console.error('Error searching:', error);
    const filtered = allImages.filter(image => 
      image.tags && image.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
    displayImages(filtered);
  }
}

document.getElementById('searchInput').addEventListener('input', searchImages);

loadGallery();
