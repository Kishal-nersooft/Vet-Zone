# Best Care VetZone

Static website for Best Care VetZone Animal Hospital in Kandy — wellness exams, surgery, laboratory, mobile vet, pet taxi, and emergency care.

## Project structure

| File | Description |
|------|-------------|
| `index.html` | Main page |
| `style.css` | Styles |
| `script.js` | Client-side behavior |

## Run locally (no Docker)

Open `index.html` in a browser, or serve the folder with any static file server:

```bash
python3 -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000).

## Run with Docker

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/) (included with Docker Desktop)

### Build and start

```bash
docker compose up --build
```

The app listens on port **5010** inside the container. Nothing is published to the host by default.

To open it in a browser, publish 5010 for that run:

```bash
docker compose run --publish 5010:5010 --build --rm web
```

Then visit [http://localhost:5010](http://localhost:5010).

### Run in the background

```bash
docker compose up -d --build
```

### Stop

```bash
docker compose down
```

### Build image only (without Compose)

```bash
docker build -t vetzone .
docker run -p 5010:5010 vetzone
```

## Docker details

- **Image**: `python:3.12-alpine` serves static files with Python’s built-in HTTP server.
- **Port**: The app listens on **5010** inside the container. No `ports` in `docker-compose.yml` and no `EXPOSE` in the Dockerfile.
