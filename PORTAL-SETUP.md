# Customer portal handoff

The website now routes approved team profiles to `/dashboard` and linked customer accounts to `/portal` after sign-in.

## Included

- Private customer profile view
- Customer-only invoices and line items
- Customer-only contracts
- Typed-name electronic signatures
- Immutable signature records
- Role-aware login and protected server routes
- Responsive portal design

## Deploy

1. Keep the existing Supabase environment variables in Render.
2. Replace the project files with this package.
3. Commit and push to GitHub; Render will redeploy automatically.
4. Run `supabase/create-test-contract.sql` once in Supabase SQL Editor.
5. Sign in at `/login` with the test customer account and verify `/portal`.

## Production contract

The test contract is intentionally nonbinding. Replace it with the attorney-reviewed production agreement before sending anything to a real customer. Freeze the exact agreement text and SHA-256 hash in `contracts`; do not edit a signed record.

## Secret handling

Keep `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`, and `STRIPE_WEBHOOK_SECRET` only in Render. Never place them in client components, commit them to GitHub, or send them through chat.
