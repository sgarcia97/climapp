import { supabase } from "./UserApi";

// const updateAuthUser = async (displayName: string) => {
//   const { data, error } = await supabase.auth.updateUser({
//     data: { display_name: displayName },
//   });

//   if (error) {
//     console.error("Error updating user:", error.message);
//   } else {
//     console.log("User updated:", data);
//   }
// };

const updateAuthUser = async (
  email: string,
  currentPassword: string,
  display_name: string,
  newPassword?: string
) => {
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password: currentPassword,
  });

  if (signInError) throw signInError;

  const updatePayload: {
    password?: string;
    data?: { display_name: string };
  } = {};

  if (newPassword) {
    updatePayload.password = newPassword;
  }

  if (display_name) {
    updatePayload.data = { display_name };
  }

  const { error: updateError } = await supabase.auth.updateUser(updatePayload);

  if (updateError) throw updateError;

  return true;
};

export { updateAuthUser };
