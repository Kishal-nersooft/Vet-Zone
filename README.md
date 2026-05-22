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

The site is available at [http://localhost:8080](http://localhost:8080).

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
docker run -p 8080:80 vetzone
```

## Docker details

- **Image**: `nginx:1.27-alpine` serves `index.html`, `style.css`, and `script.js` from `/usr/share/nginx/html/`.
- **Port**: Host `8080` maps to container port `80`.

To change the host port, edit `ports` in `docker-compose.yml` (e.g. `"3000:80"`).
