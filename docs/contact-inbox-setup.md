# Private contact inbox setup

The Contact page and private inbox UI are implemented in the portfolio. The site is deployed as a static GitHub Pages export, so message storage and password authentication run through Supabase rather than a frontend-only password check.

## 1. Create the Supabase project

1. Create a project at [supabase.com](https://supabase.com/).
2. In **Authentication → Users**, add an owner user with the email **jain.aman3789@gmail.com**.
3. Set a strong, unique password for that user. This is the password entered at `/inbox/`.
4. Turn off public user sign-ups in the Supabase Auth settings. Do not create any other users for this inbox.

The password is stored by Supabase Auth. It is not stored in this repository or in the website's JavaScript.

## 2. Create the private message table

Open **SQL Editor → New query**, paste the contents of [`supabase/contact-inbox.sql`](../supabase/contact-inbox.sql), and run it.

The SQL enables row-level security. Anonymous visitors may only insert validated contact messages. Only the authenticated account whose email is `jain.aman3789@gmail.com` can read, mark as read, or delete messages. There is deliberately no public read policy.

## 3. Add the public Supabase project settings to GitHub Actions

In Supabase, open **Project Settings → API** and copy:

- Project URL
- The public `anon` / publishable API key (not the `service_role` key)

In GitHub, open **MY-WEBSITE → Settings → Secrets and variables → Actions → New repository secret** and add:

| Secret name | Value |
| --- | --- |
| `SUPABASE_URL` | Your Supabase Project URL |
| `SUPABASE_ANON_KEY` | Your public anon / publishable key |

The anon key is designed to be used by public websites. Row-level security is what prevents visitors from reading the inbox. **Never put a Supabase service-role key in GitHub Pages, a `NEXT_PUBLIC_*` variable, or frontend code.**

## 4. Deploy

Open **Actions → Build and deploy portfolio to GitHub Pages** and select **Run workflow** on `main` (or push a commit to `main`). The trusted deployment job passes the two secrets into the static build.

The form will remain disabled until those settings are added and a new deployment completes. The existing **Open email draft** action remains available in the meantime.

## 5. Use the inbox

Visit `https://amanmalu.me/inbox/` (or the GitHub Pages project URL if using that address), enter the password you created for the Supabase owner user, and manage the latest 100 messages. You can search, reply by email, mark messages read/unread, refresh, and delete them.

The inbox route is marked `noindex`. That is not the security boundary: Supabase Auth and database row-level security enforce access. Keep public sign-ups disabled and protect your Supabase account with a strong password and multi-factor authentication if available.

## Notes

- Phone number is optional. Name, email and message are required; category is carried over from the selected Contact page category.
- The message form includes basic field validation and a honeypot, but this is not a full rate-limiting or CAPTCHA system. Watch for spam and add a server-side anti-abuse layer if the form starts receiving automated submissions.
- The public email draft and copy-email actions are unchanged.
