#!/bin/sh
# Docker overwrites HOSTNAME with the container id. Next's standalone
# server binds to that name, so Dokploy's proxy gets a 502.
export HOSTNAME=0.0.0.0
export PORT="${PORT:-3000}"
echo "Symart listening on 0.0.0.0:${PORT}"

if [ -f server.js ]; then
  exec node server.js
fi

if [ -f .next/standalone/server.js ]; then
  exec node .next/standalone/server.js
fi

exec npx next start -H 0.0.0.0 -p "$PORT"
