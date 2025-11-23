const { createClient } = supabase;

const supabaseClient = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);

async function uploadImage(file) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = fileName;

  const { data, error } = await supabaseClient.storage
    .from(STORAGE_BUCKET)
    .upload(filePath, file);

  if (error) throw error;
  return filePath;
}

function getImageUrl(path) {
  const { data } = supabaseClient.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(path);
  
  return data.publicUrl;
}

async function createImageRecord(imagePath, tags, description) {
  const { data, error } = await supabaseClient
    .from('images')
    .insert([
      {
        image_path: imagePath,
        description: description || null,
        tags: tags
      }
    ])
    .select();

  if (error) throw error;
  return data[0];
}

async function getAllImages() {
  const { data, error } = await supabaseClient
    .from('images')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

async function getImageById(id) {
  const { data, error } = await supabaseClient
    .from('images')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

async function searchImagesByTag(tag) {
  const { data, error } = await supabaseClient
    .from('images')
    .select('*')
    .contains('tags', [tag])
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

async function getTagCounts() {
  const { data, error } = await supabaseClient
    .from('images')
    .select('tags');

  if (error) throw error;

  const tagCount = {};
  data.forEach(image => {
    if (image.tags && Array.isArray(image.tags)) {
      image.tags.forEach(tag => {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      });
    }
  });

  return Object.entries(tagCount)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}
