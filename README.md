<a id="readme-top"></a>

<br />
<div align="center">
  <a href="https://github.com/slimanimeddine/arthive-admin">
    <img src="public/arthive-logo.svg" alt="Logo" width="260" height="120">
  </a>

  <h3 align="center">Arthive Admin Panel</h3>

  <p align="center">
    The Admin Panel for Arthive, an artworks showcase platform.
    <br />
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#other-parts">Other Parts</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

## About The Project

This project is an Admin panel made for an artworks showcase platform named ArtHive, the purpose of this admin panel is to give admin an overview of the resources of the platform for example: users, artworks and to also give the ability to the admin to accept or reject artist verification requests submitted by artists.

### Other Parts

- [Backend](https://github.com/slimanimeddine/arthive-backend)
- [Frontend](https://github.com/slimanimeddine/arthive)

### Features

Visit The REST API [Features Section](https://github.com/slimanimeddine/arthive-backend?tab=readme-ov-file#features)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

These are the main technologies I have used to build this app, for a complete list visit the package.json file:

- [Next.js](https://nextjs.org/)
- [React.js](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [HeadlessUI](https://headlessui.com/)
- [React Hook Form](https://react-hook-form.com/)
- [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Axios](https://axios-http.com/docs/intro)
- [nuqs](https://nuqs.47ng.com/)
- [Orval](https://orval.dev/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

### Prerequisites

Before you begin, make sure your system meets the following requirements:

- [Node.js 18.18](https://nodejs.org/en) or later.
- [pNPm](https://pnpm.io/)
- macOS, Windows (including WSL), or Linux.

### Installation

Follow these instructions to run this project locally on your machine

1. Install the Backend by following these [instructions](https://github.com/slimanimeddine/arthive-backend?tab=readme-ov-file#installation)

2. Install the Frontend by following these [instructions](https://github.com/slimanimeddine/arthive?tab=readme-ov-file#installation)

3. Clone the repo:

   ```sh
   git clone https://github.com/slimanimeddine/arthive-admin
   ```

4. Copy the content of `.env.example` to `.env`:

   ```sh
   cp .env.example .env
   ```

5. Install the project's dependencies:

   ```sh
   pnpm install
   ```

6. Start the Next.js development server:

   ```sh
   pnpm dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

The application will be available at `http://localhost:3000`.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## License

Distributed under the [MIT License](LICENSE.md).

<p align="right">(<a href="#readme-top">back to top</a>)</p>
