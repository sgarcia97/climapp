import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { supabase } from "../api/UserApi";
import { Session, AuthError } from "@supabase/supabase-js";
import { useRouter } from "expo-router";

interface AuthContextType {
  session: Session | null;
  isGuest: boolean;
  justSignedUp: boolean;
  isLoading: boolean;
  signUp: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  enterAsGuest: () => void;
  clearJustSignedUp: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isGuest, setIsGuest] = useState<boolean>(false);
  const [justSignedUp, setJustSignedUp] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    // session fetch
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    // redirects
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed - Event:", event, "Session:", !!session);
      setSession(session);
      setIsLoading(false);

      if (event === "SIGNED_IN" && !isGuest) {
        router.replace("/(tabs)/home");
      } else if (event === "SIGNED_OUT" || isGuest) {
        router.replace("/(auth)/login");
      } else if (event === "INITIAL_SESSION" && !session && !isGuest) {
        router.replace("/(auth)/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [isGuest]);

  const signUp = async (
    email: string,
    password: string,
    displayName: string
  ): Promise<void> => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: displayName } },
    });
    if (error) throw error;
    setJustSignedUp(true);
  };

  const signIn = async (email: string, password: string): Promise<void> => {
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    setSession(data.session);
  };

  const signOut = async (): Promise<void> => {
    if (isGuest) {
      setIsGuest(false); // no longer Guest
    } else {
      await supabase.auth.signOut(); // not guest
    }
    setSession(null); // clear session
    router.replace("/(auth)/login"); // redirect
  };

  const enterAsGuest = (): void => {
    setIsGuest(true);
  };

  const clearJustSignedUp = (): void => {
    setJustSignedUp(false);
  };

  const value: AuthContextType = {
    session,
    isGuest,
    justSignedUp,
    isLoading,
    signUp,
    signIn,
    signOut,
    enterAsGuest,
    clearJustSignedUp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
