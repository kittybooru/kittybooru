#!/bin/bash

cat > js/config.js << EOF
const SUPABASE_CONFIG = {
  url: '${SUPABASE_URL}',
  anonKey: '${SUPABASE_ANON_KEY}'
};

const STORAGE_BUCKET = 'images';
EOF

echo "Config file generated successfully"
