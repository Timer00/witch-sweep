<div align="center"><img src = "https://user-images.githubusercontent.com/31413093/197097625-5b3bd3cf-2bd6-4a3a-8059-a1fe9f28100b.svg" height="100px" alt="My Happy SVG"/></div>

<h2 align="center">Hocus Focus</h2>

<div align="center">
<a href="https://reactjs.org/"><image src="https://img.shields.io/static/v1?label=React&message=^18&style=for-the-badge&labelColor=FFFFFF&logo=react&color=61DAFB"/></a>
<a href="https://www.typescriptlang.org/"><image src="https://img.shields.io/static/v1?label=TypeScript&message=^5&style=for-the-badge&labelColor=FFFFFF&logo=typescript&color=3178C6"/></a>
<a href="https://www.typescriptlang.org/"><image src="https://img.shields.io/static/v1?label=Tailwind%20CSS&message=^3&style=for-the-badge&labelColor=FFFFFF&logo=tailwindcss&color=06B6D4"/></a>
<a href="https://cn.vitejs.dev/"><image src="https://img.shields.io/static/v1?label=Vite&message=^4&style=for-the-badge&labelColor=FFFFFF&logo=vite&color=646CFF"/></a>
</div>

## Introduction

A gamified ADHD motivation app built with **React** and **Capacitor**.

Help your kids focus on their homework or chores in a fun way!

## Install

> This project uses [node](http://nodejs.org) and a package
> manager ([npm](https://npmjs.com), [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/)). Go check them out if you
> don't have them locally installed.

To install the necessary packages run: 

```sh
$ yarn

# npm install
```

### Setup mobile capabilities

###### Using capacitor we initiate & prepare our project to run on mobile devices.

```sh
# Initiate capacitor

$ npx cap init
```


```sh
# Create Android & IOS projects

$ npx cap add android
$ npx cap add ios
```

```sh
# Build your project to allow
# exporting to mobile devices

$ yarn build

# npm build
```

```sh
# Sync build to native project 

$ npx cap sync
```

In addition to these steps it's necessary to setup your environment to run on Android &/or IOS. 
If you haven't got that setup yet, [follow instructions here.](https://capacitorjs.com/docs/getting-started/environment-setup)

## Usage

To host locally run: 

```sh
$ yarn dev

# npm run dev
```

### Mobile
###### To run on mobile it's neccessary to have either an emulator setup or a device connected to your computer.

Since our app follows the steps [here](https://capacitorjs.com/docs/guides/live-reload), the apps will also live reload!

**Android**
```sh
$ npx cap run android
```

**IOS**
```sh
$ npx cap run ios
```

## Related Efforts

- [Vite](https://github.com/vitejs/vite)
- [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss)
- [Capacitor](https://capacitorjs.com/)
