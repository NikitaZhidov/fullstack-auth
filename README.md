# Full-stack authentication with NestJS & Next.js (Email + Google OAuth)
<p align="center">
<img width="400" height="400" alt="fullstack-auth-1" src="https://github.com/user-attachments/assets/c729abb4-9fbd-42ba-a4a2-c8fb4cfc378b" />
<img width="400" height="400" alt="fullstack-auth-2" src="https://github.com/user-attachments/assets/4fae08e0-5e92-483c-a18b-8911344f9975" />
</p>


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
