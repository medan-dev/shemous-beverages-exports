'use server'

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceRoleKey = process.env.PORTAL_ADMIN_KEY!

export async function saveProductAction(payload: any, productId?: string) {
  try {
    if (!supabaseUrl || !serviceRoleKey) {
      return { error: 'Server configuration missing SUPABASE_URL or PORTAL_ADMIN_KEY' }
    }

    const adminSupabase = createClient(supabaseUrl, serviceRoleKey)

    let result
    if (productId) {
      console.log('[ServerAction] Updating product:', productId)
      result = await adminSupabase
        .from('products')
        .update(payload)
        .eq('id', productId)
        .select()
    } else {
      console.log('[ServerAction] Inserting new product')
      result = await adminSupabase
        .from('products')
        .insert([payload])
        .select()
    }

    if (result.error) {
      console.error('[ServerAction] Supabase error:', result.error.message)
      return { error: result.error.message }
    }

    console.log('[ServerAction] Save successful, record count:', result.data?.length)
    return { success: true, data: result.data }
  } catch (err: any) {
    console.error('[ServerAction] Unexpected error:', err.message)
    return { error: err.message || 'Unknown server error occurred' }
  }
}
