## Introduction

If you haven't installed pnpm, please use the following command to install the pnpm package manager:
```sh
npm install -g pnpm
```
Ideally, by executing the following commands, the project should function properly in development mode, be bundled, and work in production mode. Its performance should be excellent. On my laptop, the bundling process only took 717ms, and the resulting "dist" folder was only 11.1 MB in size.

![image](https://github.com/s3xysteak/simply-cesium-vite-vue/assets/86149525/b89f114c-5bcf-4e72-85f2-864e2aec6073)

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Compile and Minify for Production

```sh
pnpm build
```

### Preview the Production after building

```sh
pnpm preview
```
