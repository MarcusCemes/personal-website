FROM node:24-alpine AS base

WORKDIR /app


FROM base AS pnpm

RUN corepack enable
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

COPY package.json /app/package.json
COPY pnpm-lock.yaml /app/pnpm-lock.yaml


FROM pnpm AS build

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY static /app/static
COPY package.json /app/package.json
COPY pnpm-lock.yaml /app/pnpm-lock.yaml
COPY svelte.config.js /app/svelte.config.js
COPY tsconfig.json /app/tsconfig.json
COPY vite.config.ts /app/vite.config.ts
COPY src /app/src

RUN pnpm run build


FROM pnpm AS prod-deps

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile


FROM base AS prod
ENV NODE_ENV=production

COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app

ENV ORIGIN=https://mkus.dev
ENV HOST=0.0.0.0
ENV PORT=3000

EXPOSE 3000
CMD ["node", "index.js"]
