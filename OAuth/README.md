# Laravel OAuth Authentication (Socialite + Blade)

This project implements OAuth authentication using [Laravel Socialite](https://laravel.com/docs/socialite), allowing users to log in via third-party providers like **Google**, **GitHub**, etc., with a simple Blade frontend.

---

## 🧭 OAuth Flow Overview

1. **User clicks "Login with Google/GitHub"**
   - Initiates redirect via route: `/auth/redirect/{provider}`.
   - Handled by `AuthController@redirect`.

2. **User is redirected to the provider's login page**
   - Authenticates and authorizes your app.

3. **Provider redirects back to your app**
   - Callback handled via `/auth/callback/{provider}`.
   - Controller fetches user data and either:
     - Creates a new user
     - Or updates an existing one based on `provider_id`.

4. **User is logged in**
   - Session is started and redirected to `/`.

---

## 🧪 Environment Variables

Add the following to your `.env` file based on the provider you're using.

### ✅ Google Example

```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:8000/auth/callback/google
