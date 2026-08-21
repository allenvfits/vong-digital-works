-- Development-only contract for testing the private customer portal.
-- Review the production agreement with an Arizona attorney before real use.
with contract_content as (
  select $contract$
VONG DIGITAL WORKS — TEST WEBSITE DEVELOPMENT AGREEMENT

This test agreement is provided only to verify the customer portal and electronic-signature workflow. It is not a production contract and no payment is due.

1. TEST SCOPE
Developer will demonstrate a private customer portal, invoice display, contract display, and electronic signature recording.

2. TEST DATA
All names, prices, deadlines, and deliverables in this test agreement are examples only.

3. ELECTRONIC SIGNATURE
By typing a name, checking acceptance, and selecting Sign Agreement, the test signer confirms an intent to electronically sign this exact contract version. The system records the signer, timestamp, contract hash, IP address, and browser information.

4. NO COMMERCIAL EFFECT
This test agreement creates no obligation to perform services or make payment. A separately reviewed and signed production agreement is required for real client work.
$contract$::text as body
), target as (
  select c.id as client_id, p.id as owner_id,
    (select i.id from public.invoices i where i.client_id=c.id order by i.created_at desc limit 1) as invoice_id
  from public.clients c
  cross join lateral (select id from public.profiles where role='owner' limit 1) p
  where lower(c.email)=lower('hagotchaaa@gmail.com')
  limit 1
)
insert into public.contracts (client_id,invoice_id,title,version,body,body_sha256,status,sent_at,created_by)
select target.client_id,target.invoice_id,'Test Website Development Agreement',1,contract_content.body,
  encode(digest(contract_content.body,'sha256'),'hex'),'sent',now(),target.owner_id
from target cross join contract_content
where not exists (
  select 1 from public.contracts c
  where c.client_id=target.client_id and c.title='Test Website Development Agreement'
)
returning id,title,status,sent_at;
