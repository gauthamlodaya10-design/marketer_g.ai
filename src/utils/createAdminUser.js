import { supabase } from '@/lib/customSupabaseClient';

/**
 * Creates the admin user account using the edge function
 * This should only be run once to set up the initial admin account
 */
export async function createAdminUser() {
  try {
    const { data, error } = await supabase.functions.invoke('create-admin-user', {
      body: JSON.stringify({})
    });
    
    if (error) {
      console.error('❌ Error invoking create-admin-user function:', error);
      throw error;
    }
    
    console.log('✅ Admin user creation response:', data);
    return data;
  } catch (error) {
    console.error('❌ Failed to create admin user:', error);
    throw error;
  }
}