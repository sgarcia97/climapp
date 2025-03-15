import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cbaudssxvxyfqmfxdcds.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNiYXVkc3N4dnh5ZnFtZnhkY2RzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyODM1NjcsImV4cCI6MjA1Njg1OTU2N30.uBS5eqlTcO4HcAzX1txqd5FoqPn58UQejAelOmmI6-o";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage, // local storage
    autoRefreshToken: true, // auto-refresh tokens
    persistSession: true, // keep session across app restarts
    detectSessionInUrl: false, // not needed
  },
});
