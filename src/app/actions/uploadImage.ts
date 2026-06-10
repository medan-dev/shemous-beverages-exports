'use server'

import { createClient } from '@supabase/supabase-js'

export async function uploadProductImage(formData: FormData) {
  try {
    const file = formData.get('file') as File
    const path = formData.get('path') as string

    if (!file || !path) {
      return { error: 'Missing file or path parameter' }
    }

    // Initialize Supabase correctly with the Service Role Key
    // This allows us to bypass Row Level Security restrictions since the user is not authenticated natively
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const serviceRoleKey = process.env.PORTAL_ADMIN_KEY! // The key found in .env.local

    if (!serviceRoleKey) {
      return { error: 'Server configuration missing PORTAL_ADMIN_KEY' }
    }

    console.log('[UploadAction] Starting upload for:', path)
    const adminSupabase = createClient(supabaseUrl, serviceRoleKey)

    // Convert File into a format Supabase can upload
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload with service role override
    const { data, error } = await adminSupabase.storage
      .from('products')
      .upload(path, buffer, {
        contentType: file.type,
        upsert: true
      })

    if (error) {
      console.error('[UploadAction] Supabase error:', error.message)
      return { error: error.message }
    }

    console.log('[UploadAction] Upload successful:', data.path)
    return { success: true, data }
  } catch (err: any) {
    console.error('[UploadAction] Unexpected error:', err.message)
    return { error: err.message || 'Unknown upload error occurred' }
  }
}
