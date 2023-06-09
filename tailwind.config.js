/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    // './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Typography
      fontFamily: {
        poppins: 'Poppins',
        roboto: 'Roboto',
      },

      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
      },
      // Define custom fonts
      // fontSize: {}, // Define custom font sizes
      // fontWeight: {}, // Define custom font weights
      // letterSpacing: {}, // Define custom letter spacing
      // lineHeight: {}, // Define custom line heights

      // Colors
      colors: {
        primary: 'var(--color-red-800)', // Use the same color as sky-800
      },
      textColor: {
        primary: '#0EA5E9', // Can always use CSS variables too e.g. "var(--color-primary)",
        secondary: '#B91C1C',
        brand: '#FFB717',
      }, // Define custom text colors
      backgroundColor: {
        primary: '#0EA5E9',
        secondary: '#B91C1C', // Custom secondary color
        warning: '#FFB717', // Custom brand color
      },
      // Define custom background colors
      borderColor: {}, // Define custom border colors

      gradientColorStops: {
        primary: '#FF69b4', // Solid color fallback
        'primary-start': '#B91C1C', // Gradient start color
        'primary-end': '#B91C1C', // Gradient end color
      },

      // Spacing
      spacing: {}, // Define custom spacing values
      margin: {}, // Define custom margin values
      padding: {}, // Define custom padding values

      // Border
      borderWidth: {}, // Define custom border widths
      borderRadius: {}, // Define custom border radii

      // Shadows
      boxShadow: {}, // Define custom box shadows

      // Z-index
      zIndex: {}, // Define custom z-index values

      // Opacity
      opacity: {}, // Define custom opacity values

      // Screens and Breakpoints
      // screens: {}, // Define custom screens and breakpoints

      // Transitions
      // transitionProperty: {}, // Define custom transition properties
      // transitionDuration: {}, // Define custom transition durations
      // transitionTimingFunction: {}, // Define custom transition timing functions
      // transitionDelay: {}, // Define custom transition delays

      // darkMode: false, // Set default mode to light

      backgroundImage: {
        class:
          "url('https://img.freepik.com/free-psd/education-concept-with-school-supplies_23-2149935206.jpg?w=1380&t=st=1686931155~exp=1686931755~hmac=291e456d50ed30fb533d20e6735983664486e76c82c91fc16235034a9e4607e1')",
        subject:
          "url('https://img.freepik.com/free-psd/education-concept-with-supplies_23-2149935204.jpg?w=1380&t=st=1686931243~exp=1686931843~hmac=dd4ab65c22ba938e8b28c1624265fbb1bcc30148e0aea71e44ecaef38c400592')",
        semester:
          "url('https://img.freepik.com/free-photo/purple-calendar-clock-icon-3d-reminder-notification-concept-website-ui-purple-background-3d-rendering-illustration_56104-1317.jpg?w=996&t=st=1686931396~exp=1686931996~hmac=42f103de9d8e04652beabe3888f7b95fc52f1ab9953223abba92dbac5ad8d8b5')",
        adminTeacher:
          "url('https://img.freepik.com/free-vector/young-businesswoman-showing-presenter-white-board-cartoon-illustration_56104-519.jpg?w=996&t=st=1687882354~exp=1687882954~hmac=29bf0723d20130fbdd7ec6611301cd1d94495fd5d0b78bb47876e8927ca3929c')",
        adminClasses:
          "url('https://img.freepik.com/free-vector/isometric-class-interior-composition-with-inside-view-classroom-school-with-maps-pupils-teacher-vector-illustration_1284-77546.jpg?w=900&t=st=1687882099~exp=1687882699~hmac=1acdc7366b6a94f0df728d0c58e698acaa12e6b16eee96f71bd10df2cd331945')",
        adminStudent:
          "url('https://img.freepik.com/free-vector/young-people-read-books-library-students-study-school-college-university-vector-flat-illustration-men-women-sitting-stack-big-books-reading_107791-9763.jpg?w=1380&t=st=1687882266~exp=1687882866~hmac=4f75c9b56e81bca0f8bb586b92bd33cd69390e758010406784d3e63cb68ad589')",
      },
    },
  },

  plugins: [],
};
