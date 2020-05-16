#!/bin/bash

deno run \
    --allow-read \
    --allow-write \
    --allow-net \
    --allow-plugin \
    --unstable \
    --allow-env \
    denovote/main.ts
