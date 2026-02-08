## Set up environment variables and install dependencies

```bash
cd nestjs-server
cp .env.template .env
npm install
```

```bash
cd nextjs-client
cp .env.template .env
npm install
```

## Run db

```bash
cd nestjs-server
docker-compose up -d
npx prisma generate
npx prisma db push
```

## Run the applications

```bash
cd nestjs-server
npm run start:dev
```

```bash
cd nextjs-client
npm run dev
```
