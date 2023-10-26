## Introduction

If you haven't installed pnpm, please use the following command to install the pnpm package manager:
```sh
npm install -g pnpm
```
Ideally, by executing the following commands, the project should function properly in development mode, be bundled, and work in production mode. Its performance should be excellent. On my laptop, the bundling process only took 717ms, and the resulting "dist" folder was only 11.1 MB in size.

![image](https://github.com/s3xysteak/simply-cesium-vite-vue/assets/86149525/b89f114c-5bcf-4e72-85f2-864e2aec6073)

## Details

I will introduce to you how it works.Actually, all the magic happens in the vite.config.js file, where you can find more detailed code. As you may know, Cesium relies on four files: ['Assets', 'ThirdParty', 'Widgets', 'Workers']. Regardless, we need to copy them to specific locations first, so that the project continues to work correctly after being packaged. To achieve this, we use the [vite-plugin-static-copy](https://github.com/sapphi-red/vite-plugin-static-copy) plugin, which not only automatically copies them to the specified locations during packaging but also doesn't affect development. 
Cesium is a heavyweight package, and to avoid Vite packaging it again during the build process, we need to externalize it as a dependency to speed up the packaging process and reduce the size of the output. For this purpose, we use two plugins: [vite-plugin-html](https://github.com/vbenjs/vite-plugin-html) and [vite-plugin-externals](https://github.com/crcong/vite-plugin-externals). vite-plugin-externals specifies the externalization of the Cesium dependency and avoids manipulating the rollup options. vite-plugin-html is used to import the externalized Cesium into the index.html, which prevents warnings that would occur from directly modifying the index.html file. 
It's important to note that you still need to make a few modifications to the index.html file to specify where the code should be inserted, as detailed in line 8 of the index.html file in this repository. 
Lastly, remember to configure CESIUM_BASE_URL, which is done in /src/main.js of this repository. Specify the location after being packaged. Since we specified in vite.config.js that the dependencies should be copied to libs/cesium after packaging, CESIUM_BASE_URL can be set as libs/cesium. Once you've completed these steps, you can start developing normally!

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
