FROM python:3.12-alpine

WORKDIR /app
COPY index.html style.css script.js .

CMD ["python", "-m", "http.server", "5010", "--bind", "0.0.0.0"]
