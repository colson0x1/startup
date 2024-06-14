# Startup: Microfrontend Application with Webpack Module Federation

## Overview

Sup! Welcome to the microfrontend application repository utilizing Webpack Module Federation to seamlessly integrate React and Vue.js sub-applications. This advanced architecture promotes independent development, scalability, and modularization of frontend components. The application leverages CI/CD pipelines with GitHub Actions for automated build, test, and deployment on AWS S3, served via CloudFront.

![startup microfrontend](https://i.imgur.com/K91evK4.png)

![startup microfrontend](https://i.imgur.com/eET3Q2W.png)

![startup microfrontend](https://i.imgur.com/id9QmEa.png)

![startup microfrontend](https://i.imgur.com/E7Z6zx0.png)

![startup microfrontend](https://i.imgur.com/Pv6eMQ2.png)

![startup microfrontend](https://i.imgur.com/4iMpvJE.png)

![startup microfrontend](https://i.imgur.com/TtWRYHO.png)

![startup microfrontend](https://i.imgur.com/uxh5BOx.png)

![startup microfrontend](https://i.imgur.com/CdfOmaL.png)

![startup microfrontend](https://i.imgur.com/pJ1sls8.png)

![startup microfrontend](https://i.imgur.com/Lgy9Uge.png)

![startup microfrontend](https://i.imgur.com/nNjQojd.png)

![startup microfrontend](https://i.imgur.com/wHRRYC1.png)

![startup microfrontend](https://i.imgur.com/VjdnkIv.png)

![statrup microfrontend](https://i.imgur.com/zApELUe.png)

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Technologies Used](#technologies-used)
3. [Folder Structure](#folder-structure)
4. [Installation](#installation)
5. [Development](#development)
6. [CI/CD Pipeline](#ci-cd-pipeline)
7. [Deployment](#deployment)
8. [Advanced Topics](#advanced-topics)
9. [License](#license)
10. [Screenshots](#screenshots)

## Architecture Overview

The microfrontend architecture is designed to facilitate independent development and deployment of multiple frontend applications while ensuring seamless integration and shared state management. Key components include:

### Components and Responsibilities

- **Host Application (React)**

  - Acts as the main container application responsible for loading remote sub-applications dynamically.
  - Manages global state using React Context API or Redux.
  - Implements routing using React Router to navigate between sub-applications.

- **Remote Applications**

  - **Vue Sub-Application**

    - Developed using Vue Router for client-side routing.
    - Uses Vuex for state management and sharing data across components.
    - Communicates with the host application via Webpack Module Federation, enabling seamless integration.

  - **React Sub-Application**
    - Utilizes React Router for client-side navigation.
    - Optionally uses Redux for managing global state.
    - Communicates with the host application through shared modules and federated APIs.

### Communication and Data Flow

- **Event Bus and Shared Modules**
  - Uses Webpack Module Federation to share code, assets, and APIs across microfrontends.
  - Implements an event bus pattern or global store for inter-application communication and state synchronization.

### Scalability and Extensibility

- **Modular Development**
  - Each sub-application operates independently, allowing for scalable development and deployment.
  - Enables teams to work on different parts of the application simultaneously with minimal dependency on other teams.

## Technologies Used

- **Frontend Frameworks**: 3 Apps React, 1 App Vue.js
- **Module Federation**: Webpack 5
- **Styling**: MUI
- **State Management**: React Hook `useState()`
- **Routing**: React Router (Browser History and Memory History)
- **CI/CD**: GitHub Actions
- **Cloud Services**: AWS S3, CloudFront

## Folder Structure

```
.
├── host-app/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── modules/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── index.jsx
│   ├── webpack.config.js
│   ├── package.json
│   └── README.md
├── vue-sub-app/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.vue
│   │   ├── main.js
│   ├── webpack.config.js
│   ├── package.json
│   └── README.md
├── react-sub-app/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── index.jsx
│   ├── webpack.config.js
│   ├── package.json
│   └── README.md
├── .github/
│   └── workflows/
│       └── main.yml
└── README.md
```

## Installation

Follow these steps to set up and run the microfrontend application locally:

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher) or yarn (v1 or higher)

### Clone Repository

```bash
git clone https://github.com/colson0x1/startup.git
cd startup
```

### Install Dependencies

Install dependencies for each application (host-app, vue-sub-app, react-sub-app):

```bash
cd packages/container
npm install

cd ../auth
npm install

cd ../dashboard
npm install

cd ../marketing
npm install
```

## Development

### Running Locally: Execute Webpack processes in isolation

Start each application in separate terminal windows:

```bash
# In container-host-app directory
npm start

# In auth-sub-app directory
npm start

# In marketing-sub-app directory
npm start

# In dashboard-sub-app directory
npm start
```

### Building Applications

To build applications for production:

```bash
# In host-app directory
npm run build

# In vue-sub-app directory
npm run build

# In react-sub-app directory
npm run build
```

## CI/CD Pipeline

### GitHub Actions Configuration

The CI/CD pipeline automates build, test, and deployment processes using GitHub Actions. Below is the deployment YAML template (`main.yml`) located in `.github/workflows/`:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14'

      - name: Install Dependencies
        run: npm install

      - name: Build and Deploy Host Application
        run: |
          npm run build
          aws s3 sync ./dist s3://your-bucket-name
          aws cloudfront create-invalidation --distribution-id your-distribution-id --paths "/*"
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_REGION: ${{ secrets.AWS_REGION }}

      # Repeat similar steps for vue-sub-app and react-sub-app
```

### Deployment

The application is deployed on AWS S3 with CloudFront for content delivery. GitHub Actions syncs build artifacts to S3 and invalidates CloudFront cache for updates.

## Advanced Topics

### Security Considerations

- **Access Control**: Implement AWS IAM roles and policies for secure access to S3 and CloudFront.
- **HTTPS**: Ensure all communication is secured using HTTPS for data integrity and confidentiality.

### Performance Optimization

- **CDN Integration**: Leverage CloudFront for global content delivery and caching to enhance application performance.
- **Code Splitting**: Utilize Webpack's code splitting features to optimize bundle size and loading times.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

---

## Screenshots

![startup microfrontend](https://i.imgur.com/MOfMvEL.png)

![startup microfrontend](https://i.imgur.com/RuNcxiR.png)

![startup microfrontend](https://i.imgur.com/1ecK1js.png)

![startup microfrontend](https://i.imgur.com/y15kXwR.png)

![startup microfrontend](https://i.imgur.com/gGGWjE3.png)

![startup microfrontend](https://i.imgur.com/7ZUPFWd.png)

![startup microfrontend](https://i.imgur.com/YGRfdlY.png)

![startup microfrontend](https://i.imgur.com/Q8tJuIP.png)

![startup microfrontend](https://i.imgur.com/vmRofxl.png)

![startup microfrontend](https://i.imgur.com/gjn91OY.png)

![startup microfrontend](https://i.imgur.com/Kr6sYbN.png)

![startup microfrontend](https://i.imgur.com/7zCa5zX.png)

![startup microfrontend](https://i.imgur.com/ZlgwbhL.png)

![startup microfrontend](https://i.imgur.com/xyHUo9v.png)

![startup microfrontend](https://i.imgur.com/JWrmRzg.png)

![startup microfrontend](https://i.imgur.com/bNH6alM.png)

![startup microfrontend](https://i.imgur.com/ifKVDJJ.png)

![startup microfrontend](https://i.imgur.com/ilZnrWs.png)

![startup microfrontend](https://i.imgur.com/ojY4WUh.png)

![startup microfrontend](https://i.imgur.com/pKBob3H.png)

![startup microfrontend](https://i.imgur.com/6RenoZz.png)

![startup microfrontend](https://i.imgur.com/wkWD4rQ.png)

![startup microfrontend](https://i.imgur.com/C8IlM8I.png)

![startup microfrontend](https://i.imgur.com/Ru4C1n5.png)

![startup microfrontend](https://i.imgur.com/EMwlYvg.png)

![startup microfrontend](https://i.imgur.com/k2VcXyp.png)

![startup microfrontend](https://i.imgur.com/SLLyHC7.png)

![startup microfrontend](https://i.imgur.com/6jzLaJC.png)

![startup microfrontend](https://i.imgur.com/THJ94kC.png)

![startup microfrontend](https://i.imgur.com/wmBZV7z.png)

![startup microfrontend](https://i.imgur.com/pDkU2tl.png)

![startup microfrontend](https://i.imgur.com/oQZ0nOc.png)

![startup microfrontend](https://i.imgur.com/GpfCU5c.png)

![startup microfrontend](https://i.imgur.com/ewYRDXA.png)

![startup microfrontend](https://i.imgur.com/UflFXyI.png)

![startup microfrontend](https://i.imgur.com/PVUI50K.png)

![startup microfrontend](https://i.imgur.com/xHHRKSi.png)

![startup microfrontend](https://i.imgur.com/L0VQdte.png)

![startup microfrontend](https://i.imgur.com/qpnFq7y.png)

![startup microfrontend](https://i.imgur.com/wnsAasx.png)

![startup microfrontend](https://i.imgur.com/24cOFCW.png)

![startup microfrontend](https://i.imgur.com/Y85pnhq.png)

![startup microfrontend](https://i.imgur.com/q6Kc7CM.png)

![startup microfrontend](https://i.imgur.com/tXhWZsR.png)

![startup microfrontend](https://i.imgur.com/FyzMxLi.png)

![startup microfrontend](https://i.imgur.com/D1wVtHg.png)

![startup microfrontend](https://i.imgur.com/VWFj0Ew.png)

![startup microfrontend](https://i.imgur.com/H7DI1uU.png)

![startup microfrontend](https://i.imgur.com/s4eJHRP.png)

![startup microfrontend](https://i.imgur.com/w4BPMjO.png)

![startup microfrontend](https://i.imgur.com/YhTo2mA.png)

![startup microfrontend](https://i.imgur.com/RDPTGvx.png)

![startup microfrontend](https://i.imgur.com/gh1dRRf.png)

![startup microfrontend](https://i.imgur.com/VjdnkIv.png)

![startup microfrontend](https://i.imgur.com/cBgZ1NX.png)

![startup microfrontend](https://i.imgur.com/Es7viJT.png)

![startup microfrontend](https://i.imgur.com/B0zJ9A3.png)

![startup microfrontend](https://i.imgur.com/nXpemgf.png)

![startup microfrontend](https://i.imgur.com/USACg6Q.png)

![startup microfrontend](https://i.imgur.com/mbq9hb6.png)

![startup microfrontend](https://i.imgur.com/4z2E8Pp.png)

![startup microfrontend](https://i.imgur.com/CeKMftl.png)

![startup microfrontend](https://i.imgur.com/6W5hSjj.png)

![startup microfrontend](https://i.imgur.com/5Tom3hU.png)

![startup microfrontend](https://i.imgur.com/9tzZiS8.png)

![startup microfrontend](https://i.imgur.com/WLNGt7O.png)

![startup microfrontend](https://i.imgur.com/svtmdr3.png)

![startup microfrontend](https://i.imgur.com/QFFp3qu.png)

![startup microfrontend](https://i.imgur.com/Lp5kO6k.png)

![startup microfrontend](https://i.imgur.com/ESWNluu.png)

![startup microfrontend](https://i.imgur.com/PuXTih4.png)

![startup microfrontend](https://i.imgur.com/aiGuKvJ.png)

![startup microfrontend](https://i.imgur.com/IEcQbQl.png)

![startup microfrontend](https://i.imgur.com/5IaYkk0.png)

![startup microfrontend](https://i.imgur.com/stqxxVB.png)

![startup microfrontend](https://i.imgur.com/sdvFsa0.png)

![startup microfrontend](https://i.imgur.com/oFSgrU0.png)

![startup microfrontend](https://i.imgur.com/YGmHwGQ.png)

![startup microfrontend](https://i.imgur.com/g3UK2lE.png)

![startup microfrontend](https://i.imgur.com/rYAwtx2.png)

![startup microfrontend](https://i.imgur.com/FGZfHrq.png)

![startup microfrontend](https://i.imgur.com/PvPWyR0.png)

![startup microfrontend](https://i.imgur.com/HJvkyxI.png)

![startup microfrontend](https://i.imgur.com/gVSsSuv.png)

![startup microfrontend](https://i.imgur.com/4yZhAPJ.png)

![startup microfrontend](https://i.imgur.com/qcmtMkP.png)

![startup microfrontend](https://i.imgur.com/iPbWOOv.png)

![startup microfrontend](https://i.imgur.com/R8ewpJd.png)

![startup microfrontend](https://i.imgur.com/jA0eggH.png)

![startup microfrontend](https://i.imgur.com/YyMNFkl.png)

![startup microfrontend](https://i.imgur.com/vSTERlM.png)

![startup microfrontend](https://i.imgur.com/VsLgweR.png)

![startup microfrontend](https://i.imgur.com/bGczRZK.png)

![startup microfrontend](https://i.imgur.com/I0extNd.png)

![startup microfrontend](https://i.imgur.com/3xXN0bD.png)

![startup microfrontend](https://i.imgur.com/pPqWazZ.png)

![startup microfrontend](https://i.imgur.com/clnSZ2Q.png)

![startup microfrontend](https://i.imgur.com/ityiXOm.png)

![startup microfrontend](https://i.imgur.com/MRseS2z.png)

![startup microfrontend](https://i.imgur.com/LEp10ix.png)

![startup microfrontend](https://i.imgur.com/QaUHqxa.png)

![startup microfrontend](https://i.imgur.com/IGWi05K.png)

![startup microfrontend](https://i.imgur.com/85RGXh3.png)

![startup microfrontend](https://i.imgur.com/iLqA8mM.png)

![startup microfrontend](https://i.imgur.com/eT8aJi8.png)

![startup microfrontend](https://i.imgur.com/3f4nYr3.png)

![startup microfrontend](https://i.imgur.com/rJjHjXS.png)

![startup microfrontend](https://i.imgur.com/rRxyayD.png)

![startup microfrontend](https://i.imgur.com/QUjhx1j.png)

![startup microfrontend](https://i.imgur.com/y9T34QF.png)

![startup microfrontend](https://i.imgur.com/4kZZvaK.png)

![startup microfrontend](https://i.imgur.com/PfCRaiW.png)

![startup microfrontend](https://i.imgur.com/vd9RnOK.png)

![startup microfrontend](https://i.imgur.com/b5zY2cG.png)

![startup microfrontend](https://i.imgur.com/DbWT0Dx.png)

![startup microfrontend](https://i.imgur.com/JWJlhQM.png)

![startup microfrontend](https://i.imgur.com/qvWHo8s.png)

![startup microfrontend](https://i.imgur.com/hrvkyYY.png)

![startup microfrontend](https://i.imgur.com/dhgOyfz.png)

![startup microfrontend](https://i.imgur.com/oZ9N7fC.png)

![startup microfrontend](https://i.imgur.com/K91evK4.png)

![startup microfrontend](https://i.imgur.com/eET3Q2W.png)

![startup microfrontend](https://i.imgur.com/5Dafqbh.png)

![startup microfrontend](https://i.imgur.com/RSKjrL7.png)

![startup microfrontend](https://i.imgur.com/id9QmEa.png)

![startup microfrontend](https://i.imgur.com/E7Z6zx0.png)

![startup microfrontend](https://i.imgur.com/Pv6eMQ2.png)

![startup microfrontend](https://i.imgur.com/G7r5yR3.png)

![startup microfrontend](https://i.imgur.com/GYEPoP8.png)

![startup microfrontend](https://i.imgur.com/khiMqHB.png)

![startup microfrontend](https://i.imgur.com/Lgy9Uge.png)

![startup microfrontend](https://i.imgur.com/nNjQojd.png)

![startup microfrontend](https://i.imgur.com/wHRRYC1.png)

![startup microfrontend](https://i.imgur.com/PG6qZBA.png)

![startup microfrontend](https://i.imgur.com/CqJK2iI.png)

![startup microfrontend](https://i.imgur.com/ssIbXG1.png)

![startup microfrontend](https://i.imgur.com/TtWRYHO.png)

![startup microfrontend](https://i.imgur.com/uxh5BOx.png)

![startup microfrontend](https://i.imgur.com/sG1IHlb.png)

![startup microfrontend](https://i.imgur.com/4iMpvJE.png)
