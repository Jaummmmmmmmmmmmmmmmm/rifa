import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bkxcbmajgwoqcljhsuvw.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_H-2gRM7jQXazUKo66FOO-Q_oOUoyxcH';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

const HILUX_SYNC_ID = '00000000-0000-0000-0000-000000007777';

/**
 * Busca todas as rifas sincronizadas no Supabase
 */
export async function getSupabaseRaffles() {
  if (!supabase) return null;
  try {
    // 1. Busca da tabela padrão caso exista
    const { data, error } = await supabase
      .from('raffles')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) return data;

    // 2. Busca estado da Hilux persistido
    const { data: hiluxRecord } = await supabase
      .from('professores')
      .select('observacoes')
      .eq('id', HILUX_SYNC_ID)
      .single();

    if (hiluxRecord && hiluxRecord.observacoes) {
      try {
        const parsed = JSON.parse(hiluxRecord.observacoes);
        return [{
          id: 7777,
          name: "Toyota Hilux 2.8 Turbo 4x4 Diesel Automática",
          description: "Toyota Hilux 2.8 4x4 Diesel Automática, cabine dupla, cor branca, interior em couro impecável, tração 4x4 com reduzida, central multimídia, pneus novos, manual e chave reserva. Sorteio pela Loteria Federal!",
          pricePerNumber: parsed.pricePerNumber || 10,
          totalNumbers: 10000,
          soldCount: parsed.soldCount !== undefined ? parsed.soldCount : 3,
          imageUrl: "/hilux-rifa.jpg",
          organizerName: parsed.organizerName || "Jonathan",
          drawDate: "2026-10-31",
          status: "active",
          category: "today"
        }];
      } catch (err) {}
    }

    return null;
  } catch (err) {
    console.warn('Erro ao conectar com Supabase:', err);
    return null;
  }
}

/**
 * Salva ou atualiza uma rifa no Supabase (com fallback persistente em nuvem)
 */
export async function syncRaffleToSupabase(raffle) {
  if (!supabase) return null;
  try {
    // Tenta upsert na tabela principal raffles
    supabase.from('raffles').upsert({
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
    }).then(() => {}).catch(() => {});

    // Se for a Hilux, salva na nuvem garantida para vinculação entre dispositivos
    if (raffle.id === 7777) {
      const hiluxData = JSON.stringify({
        soldCount: raffle.soldCount,
        organizerName: raffle.organizerName,
        pricePerNumber: raffle.pricePerNumber,
        status: raffle.status
      });

      await supabase.from('professores').upsert({
        id: HILUX_SYNC_ID,
        nome_completo: 'Hilux Admin Sync',
        cargo: 'Admin',
        turma_nome: 'Sync',
        salario_base: 0,
        observacoes: hiluxData
      });

      // Broadcast por WebSocket em tempo real para qualquer outro aparelho conectado
      broadcastHiluxChange({
        raffleId: 7777,
        updates: {
          soldCount: raffle.soldCount,
          organizerName: raffle.organizerName,
          pricePerNumber: raffle.pricePerNumber
        }
      });
    }
  } catch (e) {
    console.warn('Falha ao sincronizar com Supabase:', e);
  }
}

/**
 * Inscreve-se para atualizações em tempo real pela internet (WebSockets Supabase)
 */
export function subscribeToHiluxRealtime(callback) {
  if (!supabase) return () => {};
  const channel = supabase.channel('hilux_cloud_channel');
  channel
    .on('broadcast', { event: 'hilux_change' }, (event) => {
      if (event && event.payload) {
        callback(event.payload);
      }
    })
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

/**
 * Envia mensagem em tempo real para todos os clientes conectados no mundo
 */
export function broadcastHiluxChange(payload) {
  if (!supabase) return;
  const channel = supabase.channel('hilux_cloud_channel');
  channel.subscribe((status) => {
    if (status === 'SUBSCRIBED') {
      channel.send({
        type: 'broadcast',
        event: 'hilux_change',
        payload
      });
    }
  });
}
