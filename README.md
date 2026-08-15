# Skills Camp

Skills training platform serving skills.tangison.com.

**Live:** [skills.tangison.com](https://skills.tangison.com)  
**Status:** Production site  
**Visibility:** Public

## What this is

Platform site for Skills Camp, the training arm of the Tangison estate.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Radix UI primitives
- Framer Motion
- lucide-react icons
- Prisma ORM
- sharp image pipeline

## Getting started

```bash
git clone https://github.com/tangison/skills.git
cd skills
npm install
npm run dev
```

The dev server runs on http://localhost:3000.

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Start the development server. |
| `npm run build` | Production build. |
| `npm run start` | Serve the production build. |
| `npm run lint` | Run ESLint. |
| `npm run db:push` | Push the Prisma schema to the database. |
| `npm run db:generate` | Generate the Prisma client. |
| `npm run db:migrate` | Run Prisma migrations. |
| `npm run db:reset` | Drop and recreate the database. |

## Routes

1 page routes.

```
/
```

## Environment

Create `.env.local` for local secrets. Never commit it.

## Deployment

Deployed on Vercel. Production domains:

- `skills.tangison.com`

## Maintainer

Built and maintained by **Tangison Technologies**, Windhoek, Namibia.

| | |
|---|---|
| Main line | [+264 83 411 522](tel:+264813411522) (`083411522`) |
| Email | contact@tangison.com |
| Web | https://tangison.com |

## Licence

Proprietary. Copyright Tangison Technologies. All rights reserved.
