# Script Assist- React Developer Technical Exercise

This project demonstrates the use of React along with modern state management, authentication, routing, and API integration. The goal of this exercise is to create a functional and interactive app that pulls data from the SpaceX API and allows authenticated users to interact with various SpaceX resources.

## Sapce X

SpaceX provides a wealth of information about rockets, launches, payloads.

## Features

### Authentication

- **Login System**: Implemented a secure login system that authenticates users and switches between public and private pages based on the authentication state.

- **Persistence**: The authentication state is persisted across sessions on the client-side for a smooth user experience.

### Resource List Page

- **Tabular Display**: View a list of SpaceX resources (like launches) in a table format.

- **Search & Filter**: Filter and search through the resources to find specific data points.

### Resource Detail Page (enrich)

- **Launch Detail**: View detailed information about a specific launch.

- **Enriched Data**: The page includes advanced details about the resources, such as rocket and launchpad information.

### Data Enrichment

- The Data Enrichment Page displays detailed information about a specific rocket, including key specifications, and related images. It offers users in-depth insights into attributes like size, engines, stages, and payloads.

### Deep Linking

- Deep linking is implemented to navigate directly to a launchpad's detailed information page about a specific launchpad including key specifications, launch statistics, and related images.

## Tech Stack

This project is built with the following technologies:

- **React / React DOM**: For building and rendering the user interface.

- **React Router**: For routing and navigation within the application.

- **Mantine UI**: For modern and customizable UI components.

- **React Query**: For data fetching, caching, and state management of server-side data.

- **Zustand**: For simplified state management.

- **Axios**: For making HTTP requests to fetch and send data.

- **Sass**: For styling and managing CSS with a more powerful syntax.

- **React Tooltip**: For adding interactive tooltips to elements.

- **React Icons**: For incorporating a wide variety of customizable icons.

- **React Hot Toast**: For showing customizable toast notifications to users.

## Getting Started

### Prerequisites

- Ensure that the provided codebase is running successfully.

- Verify all dependencies (React, React Router, Mantine UI, React Query, Zustand) are correctly installed.

### Installation

1. Clone the repository and navigate to the project folder:

```bash
git clone <repository-url>
cd interview
```

2. Install the necessary dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

The application will be available at http://localhost:5175 by default.

## API Integration

This project integrates with both a custom backend API for user authentication and an open-source REST API for accessing SpaceX-related data.

### Authentication API

- **Base URL**: [https://spacex-backend-1rhs.onrender.com](https://spacex-backend-1rhs.onrender.com)

- **Endpoint**: `/api/auth/login`

- **Purpose**: Authenticates a user and provides an access token for private routes.

### SpaceX Data API

The application fetches SpaceX data from the SpaceX REST API.

- **Base URL**: [https://api.spacexdata.com](https://api.spacexdata.com)

- **Purpose**: Fetches SpaceX-related data, including information about launches, rockets, and launchpads.

### Endpoints

1. **Get All Launches**

   - **URL**: `/v4/launches`

   - **Method**: `GET`

   - **Description**: Fetches a list of all SpaceX launches.

2. **Get Launch by ID**

   - **URL**: `/v4/launches/:id`

   - **Method**: `GET`

   - **Description**: Fetches detailed information about a specific launch by its ID.

   - **Example**: `/v4/launches/5eb87d4cffd86e000604b38a`

3. **Enrich Launch Data**

   - **URL**: `/v4/rockets/:id`

   - **Method**: `GET`

   - **Description**: Retrieves detailed data about the rocket used in a particular launch.

   - **Example**: `/v4/rockets/5e9d0d95eda69955f709d1eb`

4. **Query Launchpad Details**

   - **URL**: `/v4/launchpads/query`

   - **Method**: `POST`

   - **Description**: Performs a query to fetch details about specific launchpads.

### API Integration Highlights

- Authentication is secured through the custom backend API to ensure only authorized users can access certain features of the application.

- Data about SpaceX launches, rockets, and launchpads is fetched from a robust, open-source REST API, enabling real-time and detailed data insights.

#### Test Credentials

You can use the following credentials to log in:

1. **Email**: `johndoe@yopmail.com`

   **Password**: `john123`

2. **Email**: `hitesh@yopmail.com`

   **Password**: `hitesh1234`

### Note on Initial Launch

During the initial launch, there might be a brief delay as the server initializes and caches configurations. Subsequent logins will be faster.

## Core Features

**1. Landing Page**

- The Landing Page introduces users to the SpaceX app, inviting them to begin their space exploration journey.

- It features a visually appealing design with a prominent logo, captivating text, and a call-to-action button.

- When users click the "Get Started" button, they are redirected to the Login Page to authenticate and access the app's features.

**2. Login Page**

- The Login Page allows users to authenticate by entering their email and password.

- It validates the email format and checks if both fields are filled before submission.

- Upon successful login, the user is redirected to the Resource List Page, while errors are displayed for invalid inputs.

- The page also provides a loading state during authentication, with a disabled login button showing "Logging in...".

- Users can navigate back to the Landing Page by clicking on the SpaceX logo.

**3. Resource List Page**

- The Resource List Page displays a paginated, searchable, and sortable list of SpaceX launch resources.

- Users can search for resources by name, sort them by various criteria (such as name, date, or status), and view detailed information for each launch.

- The page features a table with resource names, dates, and statuses, with a "Success" or "Failure" badge indicating the launch outcome.

- Users can click the "Enrich" button to view more details about each resource.

- Filters can be reset to clear any search or sort settings.
- The page handles loading and error states gracefully while providing a smooth navigation experience.

**4. Resource Details Page**

- The Resource Detail Page displays detailed information about a specific SpaceX launch, including the launch name, flight number, launch date, mission patch, rocket ID, and launchpad ID.

- Users can view core details such as reuse status and landing attempts, and access additional information through links to articles, Wikipedia, and YouTube webcasts.

- The page also allows users to navigate to the associated launchpad details and enrich rocket data for further exploration.

- It provides a smooth experience for users to explore detailed launch data with easy navigation between related resources.

**5. Enrich Details Page**

- The Enrich Details Page provides an in-depth view of a rocket's specifications and features, including its name, type, country, status, and key metrics like diameter, height, and mass.

- The page highlights detailed stage information for both the first and second stages of the rocket, as well as engine specifications, including thrust, propellants, and ISP at different altitudes.

- Users can also explore payload weights and landing leg details.

- The page includes a carousel for viewing the rocket’s images from Flickr and provides links to its Wikipedia page for further information.

- Interactive tooltips enhance the user experience by providing additional context on certain metrics.

**6. Launchpad Details Page**

- The Launchpad Details Page provides comprehensive information about a specific launchpad, including its name, full name, location, and current status.

- It also displays additional details such as the launchpad’s coordinates (latitude, longitude, and timezone) and launch statistics (attempts and successes).

- Users can explore a list of related launches associated with the launchpad, with each launch’s name and date formatted clearly.

- The page includes a section for viewing images of the launchpad, offering a visual representation of its facilities.

- If no images or related launches are available, appropriate messages are shown to keep the user informed.

**7. Logout**

- The Logout functionality in the application allows users to securely log out of their session.

- When a user is logged in, the header displays a Logout button.

- Clicking this button clears the user’s authentication token, and resets any stored data related to launch and rocket details.

- The user is logged out of the session.

### Folder Structure

```bash
interview/
├── .env
├── .gitignore
├── build/
│   ├── assets/
│   │   ├── background-af389c45.jpg
│   │   ├── favicon-a8bf953a.ico
│   │   ├── homeImage-b85fdfdf.png
│   │   ├── index-942b7d13.js
│   │   ├── index-edb38a00.css
│   ├── favicon.ico
│   ├── index.html
├── index.html
├── package-lock.json
├── package.json
├── public/
│   ├── favicon.ico
├── README.md
├── src/
│   ├── api/
│   │   ├── apiPaths.ts
│   │   ├── authApi.ts
│   │   ├── resourceApi.ts
│   ├── App.scss
│   ├── App.tsx
│   ├── assets/
│   │   ├── images/
│   │   │   ├── background.jpg
│   │   │   ├── homeImage.png
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── PrivateRoute.tsx
│   ├── main.tsx
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login.tsx
│   │   ├── landing/
│   │   │   ├── Landing.tsx
│   │   ├── resources/
│   │   │   ├── EnrichDetails.tsx
│   │   │   ├── LaunchpadDetails.tsx
│   │   │   ├── ResourceDetail.tsx
│   │   │   ├── ResourceList.tsx
│   ├── store/
│   │   ├── app.store.ts
│   ├── style.scss
│   ├── styles/
│   │   ├── abstracts/
│   │   │   ├── index.scss
│   │   │   ├── _colours.scss
│   │   │   ├── _fonts.scss
│   │   ├── enrichDetails.scss
│   │   ├── header.scss
│   │   ├── landing.scss
│   │   ├── launchpadDetails.scss
│   │   ├── login.scss
│   │   ├── resourceDetail.scss
│   │   ├── resourceList.scss
│   ├── theme/
│   │   ├── index.ts
│   ├── utils/
│   │   ├── interface.ts
│   ├── vite-env.d.ts
├── tsconfig.json
├── vite.config.ts

```

## Deployed Application

Check out the live version of the app here: [Space X](http://localhost:5175/)

## Conclusion

In conclusion, this project demonstrates a robust and interactive SpaceX application built using modern React technologies like React Router, React Query, Zustand, and Axios. It enables users to authenticate, explore SpaceX resources such as launches, rockets, and launchpads, and interact with enriched data through detailed pages. With features like seamless authentication, data enrichment, deep linking, and a smooth user experience, the app showcases effective state management and real-time API integration, providing an engaging platform for space enthusiasts while ensuring maintainability and scalability for future improvements.
