import { Session } from "@supabase/supabase-js";
import { supabase } from "../api/UserApi";
import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useContext,
} from "react";

type AuthContextType = {
  session: Session | null;
  isGuest: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  enterAsGuest: () => void;
  signUp: (email: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isGuest, setIsGuest] = useState(false);

  // check session on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsGuest(false);
    });
  }, []);

  // login using email-password
  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  // logout
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    setIsGuest(false);
    if (error) throw error;
  };

  // public access as guest
  const enterAsGuest = () => {
    setIsGuest(true);
    setSession(null);
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  };

  return (
    <AuthContext.Provider
      value={{ session, isGuest, signIn, signOut, enterAsGuest, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// hook to use context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
