FROM deno:latest
WORKDIR /app
COPY . /app

EXPOSE 8000

CMD ["deno", "run", "start"]
