# Partiguiden Admin Panel

__THIS PROJECT IS DEPRECATED, ITS FUNCTIONALITY HAS MOVED TO [partiguiden](https://github.com/Ackuq/partiguiden)__

## Getting Started

Prerequisites:

- Node version >= 18
- Docker

### Configure package manager and install dependencies

```bash
corepack prepare
pnpm i
```

### SSL Proxy

Generate self-signed certificate for using the https proxy when running on localhost:

```bash
mkdir .cert
openssl req -x509 -out .cert/localhost.crt -keyout .cert/localhost.key \
  -days 365 \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
```

### Commands

#### Pull .env file from Vercel

```bash
vercel env pull
```

#### Run development server and set up development database

```bash
pnpm dev
```

#### Applying and creating migrations (dev)

```bash
pnpm prisma:migrate
```

#### Populating data with initial data

```bash
pnpm dev:seed
```
