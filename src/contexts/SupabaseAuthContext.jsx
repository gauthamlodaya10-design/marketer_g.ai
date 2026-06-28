import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/hooks/use-toast';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const { toast } = useToast();

  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleSession = useCallback(async (session) => {
    console.log('🔄 Session update:', session ? 'Active' : 'None');
    setSession(session);
    setUser(session?.user ?? null);
    setLoading(false);
  }, []);

  useEffect(() => {
    console.log('🚀 AuthProvider: Initializing authentication...');
    
    const getSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('❌ Error getting session:', error);
        } else {
          console.log('✅ Session retrieved:', session ? 'Active' : 'None');
        }
        
        handleSession(session);
      } catch (err) {
        console.error('❌ Fatal error getting session:', err);
        handleSession(null);
      }
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔔 Auth state changed:', event);
        console.log('📦 New session:', session ? 'Active' : 'None');
        handleSession(session);
      }
    );

    return () => {
      console.log('🛑 AuthProvider: Cleaning up subscription');
      subscription.unsubscribe();
    };
  }, [handleSession]);

  const signUp = useCallback(async (email, password, options) => {
    console.log('═══════════════════════════════════════');
    console.log('📝 SIGN UP ATTEMPT');
    console.log('═══════════════════════════════════════');
    console.log('📧 Email:', email);
    console.log('⏰ Timestamp:', new Date().toISOString());

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options,
      });

      if (error) {
        console.error('❌ SIGN UP FAILED');
        console.error('Error message:', error.message);
        console.error('Error code:', error.code);
        console.error('Error status:', error.status);
        console.error('Full error:', JSON.stringify(error, null, 2));
        
        toast({
          variant: "destructive",
          title: "Sign up Failed",
          description: error.message || "Something went wrong",
        });
      } else {
        console.log('✅ SIGN UP SUCCESSFUL');
        console.log('User data:', data);
      }

      console.log('═══════════════════════════════════════');
      return { data, error };
    } catch (err) {
      console.error('❌ Fatal sign up error:', err);
      console.log('═══════════════════════════════════════');
      throw err;
    }
  }, [toast]);

  const signIn = useCallback(async (email, password) => {
    console.log('═══════════════════════════════════════');
    console.log('🔐 SIGN IN ATTEMPT (via signIn method)');
    console.log('═══════════════════════════════════════');
    console.log('📧 Email:', email);
    console.log('🔒 Password length:', password?.length);
    console.log('⏰ Timestamp:', new Date().toISOString());

    try {
      console.log('📡 Calling supabase.auth.signInWithPassword...');
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('❌ SIGN IN FAILED');
        console.error('Error message:', error.message);
        console.error('Error code:', error.code);
        console.error('Error status:', error.status);
        console.error('Error name:', error.name);
        console.error('Full error object:', JSON.stringify(error, null, 2));
        
        toast({
          variant: "destructive",
          title: "Sign in Failed",
          description: error.message || "Invalid credentials",
        });
      } else {
        console.log('✅ SIGN IN SUCCESSFUL');
        console.log('Session:', data.session);
        console.log('User:', data.user);
      }

      console.log('═══════════════════════════════════════');
      return { data, error };
    } catch (err) {
      console.error('❌ Fatal sign in error:', err);
      console.log('═══════════════════════════════════════');
      throw err;
    }
  }, [toast]);

  const login = useCallback(async (email, password) => {
    console.log('═══════════════════════════════════════');
    console.log('🔐 LOGIN ATTEMPT (via login method)');
    console.log('═══════════════════════════════════════');
    console.log('📧 Email:', email);
    console.log('🔒 Password length:', password?.length);
    console.log('⏰ Timestamp:', new Date().toISOString());

    try {
      console.log('📡 Calling supabase.auth.signInWithPassword...');
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('❌ LOGIN FAILED');
        console.error('Error message:', error.message);
        console.error('Error code:', error.code);
        console.error('Error status:', error.status);
        console.error('Error name:', error.name);
        console.error('Full error object:', JSON.stringify(error, null, 2));
        console.log('═══════════════════════════════════════');
        throw error;
      }

      console.log('✅ LOGIN SUCCESSFUL');
      console.log('Session:', data.session);
      console.log('User:', data.user);
      console.log('═══════════════════════════════════════');
      
      return data;
    } catch (err) {
      console.error('❌ Fatal login error:', err);
      console.log('═══════════════════════════════════════');
      throw err;
    }
  }, []);

  const signOut = useCallback(async () => {
    console.log('═══════════════════════════════════════');
    console.log('🚪 SIGN OUT ATTEMPT');
    console.log('═══════════════════════════════════════');

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('❌ SIGN OUT FAILED');
        console.error('Error:', error);
        
        toast({
          variant: "destructive",
          title: "Sign out Failed",
          description: error.message || "Something went wrong",
        });
      } else {
        console.log('✅ SIGN OUT SUCCESSFUL');
      }

      console.log('═══════════════════════════════════════');
      return { error };
    } catch (err) {
      console.error('❌ Fatal sign out error:', err);
      console.log('═══════════════════════════════════════');
      throw err;
    }
  }, [toast]);

  const value = useMemo(() => ({
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    login, // Add login alias for compatibility
    currentUser: user, // Add currentUser alias for compatibility
    isAuthenticated: !!user, // Add isAuthenticated computed property
  }), [user, session, loading, signUp, signIn, signOut, login]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};