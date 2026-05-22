FROM python:3.12-alpine

WORKDIR /app

COPY index.html style.css script.js /app/

EXPOSE 5010

CMD ["python", "-m", "http.server", "5010", "--bind", "0.0.0.0"]