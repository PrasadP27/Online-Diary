# Online Diary

Inkwell is an online diary that allows users to capture their thoughts anytime, anywhere. This full-stack application offers secure login and registration features, enabling users to document their experiences and reflections in a safe and private space.

This is a full-stack online diary application that allows users to write and manage their personal diary entries. It features a rich text editor for diary writing, dark and light mode support with saved preferences, user tracking, and secure password management. It is designed with a fully responsive and mobile-friendly user interface, ensuring a great experience across all devices.

## Features

- **Full-Stack Application:** Built with HTML, CSS, JavaScript (Frontend), Node.js, Express, MongoDB (Backend).
- **Responsive UI:** Optimized for both desktop and mobile devices.
- **Dark/Light Mode:** Toggle themes with saved preferences.
- **User Authentication:** Secure login with session management.
- **Diary Features:**
  - Pin entries to the top.
  - Export entries as PDFs.
  - Rich text editor with formatting.
  - CRUD operations for managing entries.
- **Password Security:** Passwords are hashed and stored securely.
- **Search:** Find entries by keyword or date.
- **Error Handling:** Ensures a smooth user experience.

## Technologies Used

### Frontend

- `HTML5`, `CSS3`, `JavaScript`
- `React.js` (for dynamic and responsive UI)
- `Tailwind CSS` (for styling and responsiveness)

### Backend

- `Node.js` (for server-side logic)
- `Express.js` (for API routes)
- `MySQL` (for data storage)
- `bcryptjs` (for password hashing)

### Other

- `Express Sessions` for user authentication
- `LocalStorage` for saving user preferences (e.g., dark/light mode)

## Security Considerations

- **Password Hashing:**
  Ensure that passwords are stored securely in the database using hashing algorithms like bcrypt.
- **Session Management:**
  Secure the session cookies using HTTPS, and consider setting a session expiration time to minimize security risks.
- **Input Validation:**
  Sanitize inputs to prevent attacks and unauthorized entries.

## Local setup / Installation

visit my website [CoderDev](https://pp-coderdev.netlify.app/online-diary) to get the detail instruction how to setup and run the project locally

## Usage Guide

**Sign Up / Login**

- Create an account or log in to access your personal diary entries.

**Diary Entries**

- Use the **rich text editor** to create and manage your entries.
- You can **pin** important entries and **export** them as PDFs.

**Search**

- Use the **search bar** to find specific entries by keyword or date.

**Dark/Light Mode**

- Toggle between **dark** and **light modes**. Your theme preference will be saved for future visits.

## Contribution

Feel free to fork the repository and submit pull requests for improvements or bug fixes. Contributions are always welcome!

<br >

LocalSetup visit [CoderDev](https://pp-coderdev.netlify.app/)

To reach me visit [Prasad Panchal](https://prasadp.netlify.app/)
