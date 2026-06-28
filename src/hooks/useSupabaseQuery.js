import { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';

export function useSupabaseQuery(table, filters = {}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        let query = supabase.from(table).select('*');
        
        if (filters.status) {
          query = query.eq('status', filters.status);
        }
        
        if (filters.orderBy) {
          query = query.order(filters.orderBy, { ascending: filters.ascending ?? false });
        }
        
        if (filters.limit) {
          query = query.limit(filters.limit);
        }

        const { data: result, error: err } = await query;
        
        if (err) throw err;
        setData(result || []);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [table, JSON.stringify(filters)]);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      let query = supabase.from(table).select('*');
      
      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      
      if (filters.orderBy) {
        query = query.order(filters.orderBy, { ascending: filters.ascending ?? false });
      }
      
      if (filters.limit) {
        query = query.limit(filters.limit);
      }

      const { data: result, error: err } = await query;
      
      if (err) throw err;
      setData(result || []);
    } catch (err) {
      setError(err.message);
      console.error('Error refetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
}