FROM hayd/alpine-deno:1.0.0

EXPOSE 8080

WORKDIR /server

COPY server /server

RUN deno cache main.ts --unstable

CMD ["run", \
    "--allow-read", \
    "--allow-write", \
    "--allow-net", \
    "--allow-plugin", \
    "--unstable", \
    "--allow-env", \
    "main.ts"]
