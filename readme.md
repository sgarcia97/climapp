# Climapp

## React-Native / Expo Documentation

### dependencies (package.json)
```javascript
{
  "name": "climapp",
  "version": "1.0.0",
  "main": "expo-router/entry",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "test": "jest"
  },
  "dependencies": {
    "@react-native-async-storage/async-storage": "1.23.1",
    "@supabase/supabase-js": "^2.49.1",
    "expo": "~52.0.42",
    "expo-location": "~18.0.10",
    "expo-router": "~4.0.20",
    "expo-status-bar": "~2.0.1",
    "fast-xml-parser": "^5.2.0",
    "moment": "^2.30.1",
    "react": "18.3.1",
    "react-native": "0.76.9",
    "react-native-maps": "1.18.0",
    "react-native-url-polyfill": "^2.0.0",
    "react-native-uuid": "^2.0.3"
  },
  "devDependencies": {
    "@babel/core": "^7.25.2",
    "@types/react": "~18.3.12",
    "expo-module-scripts": "^4.0.4",
    "jest-expo": "~52.0.6",
    "react-test-renderer": "18.3.1",
    "typescript": "^5.3.3"
  },
  "resolutions": {
    "react": "18.3.1",
    "react-test-renderer": "18.3.1"
  },
  "private": true
}
```

## Supabase Database Setup Documentation
### Step 1: Creating the profiles Table
The following SQL statement was used to create the profiles table in the Supabase database:

##### Prerequisites: Supabase Database, auth.users table  
```sql
CREATE TABLE public.profiles (
  id uuid NOT NULL,
  email text NOT NULL,
  preferred_name text NULL,
  preferences jsonb NULL DEFAULT '{}'::jsonb,
  saved_locations jsonb NULL DEFAULT '[]'::jsonb,
  created_at timestamp with time zone NULL DEFAULT now(),
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users (id) ON DELETE CASCADE
) TABLESPACE pg_default;

```

Note:  earlier versions used preferences for saved locations. Now, a new column is used specifically to handle that data

```sql
ALTER TABLE profiles ADD COLUMN saved_locations jsonb DEFAULT '[]'::jsonb;
```

### Step 2: Creating the Profile Auto-Insert Function
The following function automatically inserts a new profile when a new user is added:
```sql
CREATE OR REPLACE FUNCTION public.create_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, preferred_name, preferences, created_at)
  VALUES (
    NEW.id,
    NEW.email,
    NULL, 
    '{}', 
    NOW() 
  );
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Error creating profile: %', SQLERRM; 
    RETURN NEW; 
END;
$$ LANGUAGE plpgsql;
```

## Step 3: Creating the user_signup_trigger Trigger
To automatically execute create_profile() after a new user is inserted, the following trigger was created:

```sql
CREATE TRIGGER user_signup_trigger
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.create_profile();
```

## Step 4: Enabling Row-Level Security (RLS) on profiles
To ensure users can only access or modify their own profile, Row-Level Security (RLS) was enabled with the following policies:

### 1. Enabling RLS on the profiles Table
```sql
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
This restricts access to the table unless explicit policies are defined.
```

### 2. Policy: Users Can Read Their Own Profile
```sql
CREATE POLICY "Users can read their own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);
```
### Effect:

- Allows authenticated users to read (SELECT) their own profile.
- Users cannot view other users' profiles.

### 3. Policy: Users Can Update Their Own Profile
```sql
CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id);
``` 
### Effect:
- Allows authenticated users to update (UPDATE) their own profile.
- Users cannot modify other users' profiles.