import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tdwgmdolnayeehenrvnf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkd2dtZG9sbmF5ZWVoZW5ydm5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyNzUxMzcsImV4cCI6MjA5Mjg1MTEzN30.Meny0Yg7zQQadhG1CEir0TE76Kql9FA8IqktsH6u1o8';

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default customSupabaseClient;

export { 
    customSupabaseClient,
    customSupabaseClient as supabase,
};
