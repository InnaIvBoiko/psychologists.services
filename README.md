# Psychologists Services

## Project Overview

The **Psychologists Services** project is a web application designed for a
company that offers psychological services to clients. The application allows
users to browse a list of psychologists, view detailed information about each
psychologist, sort and filter them based on various criteria, and book an
appointment. Authorized users can also add psychologists to their favorites list
for quick access.

## Features

- **Home Page**: Displays the website's title, company slogan, and a
  call-to-action button that navigates users to the Psychologists page.
- **Psychologists Page**: Allows users to:
  - Browse psychologists’ profiles (name, experience, rating, specialization,
    etc.)
  - Sort psychologists by name (A-Z, Z-A), price (ascending, descending), or
    popularity (rating).
  - Load more psychologists by clicking a "Load more" button that fetches
    additional data from the database.
  - Expand profiles for more detailed information and client reviews by clicking
    "Read more".
  - Book an appointment with a psychologist by filling out a modal form.
  - Add psychologists to the favorites list.
- **Favorites Page**: A private page where logged-in users can view all the
  psychologists they have added to their favorites list.
- **Authentication**: Users can register, log in, and log out using Firebase
  Authentication. Only logged-in users can add psychologists to favorites.
- **Favorites Persistence**: Favorites are saved to localStorage or Firebase,
  and remain after a page refresh.

## Tech Stack

- **Frontend**: React.js (functional components, hooks), React Router for
  routing
- **Styling**: CSS modules for modular and scoped styles
- **State Management**: React useState, useEffect, and Context API
- **Forms**: `react-hook-form` for form handling, `yup` for validation
- **Notifications**: `react-toastify` for toast notifications (success/failure
  messages)
- **Firebase**:
  - **Firebase Authentication**: For user authentication (register, login,
    logout)
  - **Firebase Realtime Database**: For storing psychologists’ information and
    user actions (favorites, appointments)
- **Icons**: `react-icons` for displaying icons
- **Deployment**: Vercel

## Technical Requirements (in English)

### General Requirements

1. **Home Page**: A simple homepage with the company’s name, slogan, and a
   call-to-action button leading to the psychologists listing.
2. **Psychologists Page**: The page lists psychologists from the Firebase
   Realtime Database. Users can:
   - Sort the list alphabetically (A-Z, Z-A), by price (low to high, high to
     low), or by popularity (rating).
   - Only 3 psychologist cards are initially visible, with more being loaded on
     clicking the "Load more" button.
3. **Favorites Page**: A private page where logged-in users can see their
   favorite psychologists.
4. **Authorization**: Users can register and log in to access certain features
   (favorites).
5. **Persistent Favorites**: Logged-in users’ favorites are saved even after
   refreshing the page.
6. **Appointment Form**: Clicking the “Make an appointment” button opens a modal
   form to schedule an appointment with the selected psychologist.
7. **Responsive Design**: The app should be fully responsive, functioning well
   on devices from 320px to 1440px.

### Detailed Technical Tasks

1. **Authentication with Firebase**: Implement user authentication
   (registration, login, logout) using Firebase Authentication.
2. **Forms with Validation**: Registration, login, and appointment forms must
   have validation using `react-hook-form` and `yup`. All form fields are
   required.
3. **Realtime Database**: Psychologists’ data is fetched from Firebase Realtime
   Database. Each psychologist has the following fields:
   - `name`: Name of the psychologist
   - `avatar_url`: URL of the psychologist’s avatar
   - `experience`: Number of years in practice
   - `reviews`: An array of reviews with `reviewer`, `rating`, and `comment`
   - `price_per_hour`: Hourly consultation fee
   - `rating`: Overall rating based on reviews
   - `license`: License details
   - `specialization`: Areas of specialization (e.g., trauma, relationships)
   - `initial_consultation`: Availability of free initial consultation
   - `about`: Description of the psychologist
4. **Card Components**: Psychologist information is displayed in individual
   cards with "Read more" and "Make an appointment" buttons.
5. **Sorting & Filtering**: Psychologists can be sorted alphabetically, by
   price, and by rating.
6. **Load More Button**: Initially, only 3 psychologists are displayed. Clicking
   "Load more" fetches more data from Firebase.
7. **Favorites**:
   - **Non-authorized users**: When non-authorized users click the heart
     (favorites) button, they should be shown a modal or toast notification
     asking them to log in.
   - **Authorized users**: Clicking the heart button adds the psychologist to
     the favorites list and changes the button color. Data can be saved in
     Firebase or localStorage.
   - **State Persistence**: On page refresh, the state of the favorites button
     should persist (i.e., if the psychologist is a favorite, the heart remains
     highlighted).
   - Clicking the heart button again removes the psychologist from the favorites
     list.
8. **Appointment Modal**: Clicking the “Make an appointment” button opens a
   modal with a form. The form is validated using `react-hook-form` and `yup`.
9. **Modal Window Functionality**: Modals can be closed by clicking the close
   button, clicking the backdrop, or pressing the Escape key.
10. **Favorites Page**: A private page that displays all the psychologists a
    user has added to their favorites.
11. **Responsive Design**: The website should work well on various screen sizes
    (mobile, tablet, and desktop).
12. **Routing**: Implement routing using React Router for navigating between
    different pages (`Home`, `Psychologists`, and `Favorites`).

## Deployment

The project is deployed on Vercel and accessible at:  
[https://psychologists-services-seven.vercel.app/](https://psychologists-services-seven.vercel.app/)

## Design

The design mockup for this project can be found on Figma:  
[https://www.figma.com/design/Jhykxl95ykgeJDaetKX4fr/Psychologists.Services-(Copy)?node-id=28-146&t=AJnwTZUP3S1NypRe-1](<https://www.figma.com/design/Jhykxl95ykgeJDaetKX4fr/Psychologists.Services-(Copy)?node-id=28-146&t=AJnwTZUP3S1NypRe-1>)
