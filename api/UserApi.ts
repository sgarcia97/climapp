import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = "https://cbaudssxvxyfqmfxdcds.supabase.co";
// const supabaseAnonKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNiYXVkc3N4dnh5ZnFtZnhkY2RzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyODM1NjcsImV4cCI6MjA1Njg1OTU2N30.uBS5eqlTcO4HcAzX1txqd5FoqPn58UQejAelOmmI6-o";
const supabaseUrl = "https://acnyzwotmzzurjtmbazp.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjbnl6d290bXp6dXJqdG1iYXpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0ODI2NDIsImV4cCI6MjA1ODA1ODY0Mn0.Sd67Bd9s6ugUqFZGeOzEY_NKVos7nPn3MW5bdq4r7E4";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage, // local storage
    autoRefreshToken: true, // auto-refresh tokens
    persistSession: false, // set this true after login tests are done. true = session persists and skips login
    detectSessionInUrl: false, // not needed
  },
});
