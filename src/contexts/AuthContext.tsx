
import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Database } from '@/integrations/supabase/types';
import { toast } from "sonner";

type UserWithRole = User & {
  role?: Database['public']['Enums']['UserRole'];
  userMetadata?: {
    name?: string;
  };
};

interface AuthContextProps {
  session: Session | null;
  user: UserWithRole | null;
  userRole: Database['public']['Enums']['UserRole'] | null;
  isLoading: boolean;
  signIn: (credentials: { email: string; password: string }) => Promise<void>;
  signUp: (credentials: { email: string; password: string; firstName?: string; lastName?: string }) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<UserWithRole | null>(null);
  const [userRole, setUserRole] = useState<Database['public']['Enums']['UserRole'] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Setup auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        setSession(newSession);
        
        if (newSession?.user) {
          // Create a UserWithRole object with the Supabase user data
          // Use type assertion to avoid type errors
          const userWithRole = newSession.user as unknown as UserWithRole;
          setUser(userWithRole);
          
          try {
            // Fetch the user's role from the User table
            const { data, error } = await supabase
              .from('User')
              .select('role')
              .eq('id', newSession.user.id)
              .single();

            if (error) throw error;
            if (data) {
              setUserRole(data.role);
              // Update the user object with the role
              setUser(prevUser => 
                prevUser ? { 
                  ...prevUser, 
                  role: data.role as Database['public']['Enums']['UserRole'] 
                } : null
              );
            }
          } catch (error) {
            console.error('Error fetching user role:', error);
          }
        } else {
          setUser(null);
          setUserRole(null);
        }
      }
    );

    // Then check for existing session
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        
        if (currentSession) {
          setSession(currentSession);
          
          // Create a UserWithRole object with the Supabase user data
          // Use type assertion to avoid type errors
          const userWithRole = currentSession.user as unknown as UserWithRole;
          setUser(userWithRole);
          
          // Fetch the user's role from the User table
          const { data: userData, error: userError } = await supabase
            .from('User')
            .select('role')
            .eq('id', currentSession.user.id)
            .single();
          
          if (userError) throw userError;
          if (userData) {
            setUserRole(userData.role);
            // Update the user object with the role
            setUser(prevUser => 
              prevUser ? { 
                ...prevUser, 
                role: userData.role as Database['public']['Enums']['UserRole'] 
              } : null
            );
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (credentials: { email: string; password: string }) => {
    try {
      const { error } = await supabase.auth.signInWithPassword(credentials);
      if (error) throw error;
      navigate('/dashboard');
      toast.success("Successfully signed in!");
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in");
      throw error;
    }
  };

  const signUp = async (credentials: { 
    email: string; 
    password: string; 
    firstName?: string; 
    lastName?: string 
  }) => {
    try {
      const { email, password, firstName, lastName } = credentials;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName
          }
        }
      });
      
      if (error) throw error;
      
      toast.success("Account created! Check your email for confirmation.");
    } catch (error: any) {
      toast.error(error.message || "Failed to create account");
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/login');
      toast.success("Successfully signed out!");
    } catch (error: any) {
      toast.error(error.message || "Failed to sign out");
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        userRole,
        isLoading,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
