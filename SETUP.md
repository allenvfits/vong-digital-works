# Vong Digital Works — owner setup

This repository is yours to open in VS Code, publish to GitHub, host on Render, and connect to Supabase and Stripe.

## Local development

1. Install Node.js 22 and open this folder in VS Code.
2. Duplicate `.env.example` as `.env.local` and replace the placeholder values.
3. Run `npm install`, then `npm run dev`.
4. Open the local address shown in the terminal.

Never commit `.env.local` or expose the Supabase service-role key or Stripe secret key in browser code.

## Supabase

1. Create a Supabase project.
2. Open SQL Editor and run `supabase/schema.sql` once.
3. Create your admin user in Authentication.
4. Copy that user's UUID and run the final commented SQL statement in `schema.sql` to assign the `owner` role.
5. Put the project URL, anon key, and service-role key in `.env.local` and the matching Render environment settings.

The schema includes clients, projects, invoices, line items, payments, expenses, and refunds. Row-level security is enabled. The server verifies the signed-in user and their team role before returning business records.

## Stripe

1. Create or open your Stripe account and start in test mode.
2. Add your test secret and publishable keys to the environment settings.
3. Create a webhook endpoint pointing to `https://YOUR_DOMAIN/api/stripe/webhook` when the webhook route is enabled.
4. Test invoices and refunds before switching to live Stripe keys.

Refund permission is intentionally restricted to the owner role. Keep receipts and reconcile Stripe payouts against the transaction ledger. This system supports recordkeeping, but it is not a replacement for tax or accounting advice.

## GitHub and Render

1. Create an empty GitHub repository.
2. From this project folder, run `git remote add origin YOUR_GITHUB_REPOSITORY_URL`, then push the main branch.
3. In Render, choose **New → Blueprint** and select the repository. Render reads `render.yaml`.
4. Add every environment value requested by Render and deploy.

Render uses `npm run build:render` and `npm run start:render`. The existing Sites scripts can remain; they do not interfere with the Render commands.

## Adding real portfolio work

Replace the demo records in `app/showcase/DemoGallery.tsx`, or save published projects in the Supabase `projects` table. Each project supports a title, slug, summary, full description, live URL, cover image, video URL, technology list, publishing switch, and sort order.
