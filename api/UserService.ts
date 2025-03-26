import { supabase } from "./UserApi";

const updateAuthUser = async (displayName: string) => {
  const { data, error } = await supabase.auth.updateUser({
    data: { display_name: displayName },
  });

  if (error) {
    console.error("Error updating user:", error.message);
  } else {
    console.log("User updated:", data);
  }
};

export { updateAuthUser };
