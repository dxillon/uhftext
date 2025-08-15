import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const logPaymentEvent = async (eventData: any) => {
  try {
    const { error } = await supabase
      .from('payment_events')
      .insert(eventData);

    if (error) throw error;
  } catch (error) {
    console.error('Error logging payment event:', error);
    throw error;
  }
};