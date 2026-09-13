import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bkxcbmajgwoqcljhsuvw.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_H-2gRM7jQXazUKo66FOO-Q_oOUoyxcH';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

/**
 * Busca todas as rifas sincronizadas no Supabase
 */
export async function getSupabaseRaffles() {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('raffles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Tabela raffles ainda não criada no Supabase:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('Erro ao conectar com Supabase:', err);
    return null;
  }
}

/**
 * Salva ou atualiza uma rifa no Supabase
 */
export async function syncRaffleToSupabase(raffle) {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('raffles')
      .upsert({
        id: raffle.id,
        name: raffle.name,
        description: raffle.description,
        price_per_number: raffle.pricePerNumber,
        total_numbers: raffle.totalNumbers,
        sold_count: raffle.soldCount || 0,
        image_url: raffle.imageUrl,
        organizer_name: raffle.organizerName,
        draw_date: raffle.drawDate,
        status: raffle.status || 'active',
        winning_number: raffle.winningNumber,
        category: raffle.category || 'today'
      });
    return { data, error };
  } catch (e) {
    console.warn('Falha ao sincronizar com Supabase:', e);
    return null;
  }
}
