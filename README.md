# React + TypeScript + Vite

Use the command `npm start`, within the client-app directory to run the frontend

# .NET API

Use thee command `dotnet watch --no-hot-reload`, within the API firectory to ron the backend

Use `dotnet restore` to update dotnet projects when imports are not working

# Database migrations

in root run
`dotnet ef migrations add PostgresInitial -p Persistence -s API`

# Creating a new production build & pushing to prod

In client app:
`npm run build`

in root:
`docker build -t ccbury/quotebible:latest .`
`docker push ccbury/quotebible:latest`
`flyctl deploy`
