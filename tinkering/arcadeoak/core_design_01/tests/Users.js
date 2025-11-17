export const Users = {

  green_bob: {
    displayName: "green_bob",
    photoURL: "./tests/userImages/greenbob.png",
    theme: 'dark', 
    button: {
      borderColor: "blue2", 
      nubColor: "blue2",
      holeOption: "Circle3" // * Default
    },
    location: {
      country: "USA",
      state: "CA",
      city: "Oakland"
    }
  }, 

  default: {
    displayName: "default"
  },

  custom_image: {
    displayName: "custom_image",
    photoURL: "./tests/userImages/p4.png",
  },

  custom_image_colors: {
    displayName: "custom_image_colors",
    photoURL: "./tests/userImages/p10.png",
    button: {
      borderColor: "red3", 
      nubColor: "blue4",
    },
  },

  custom_image_colors_user_light_theme: {
    displayName: "custom_image_colors_user_light_theme",
    photoURL: "./tests/userImages/p10.png",
    theme: "light",
    button: {
      borderColor: "red3", 
      nubColor: "blue4",
    },
  },

  button_holes: {
    displayName: "button_holes",
    photoURL: "./tests/userImages/p2.png",
    button: {
      holeType: "hole", 
      borderColor: "red3"
    },
  },

  no_holes: {
    displayName: "no_holes",
    photoURL: "./tests/userImages/p2.png",
    button: {
      holeType: "none", 
    },
  },

  two_nub: {
    displayName: "two_nub",
    photoURL: "./tests/userImages/p5.png",
    button: {
      holeOption: "Circle2",
      borderColor: "blue3", 
      nubColor: "red3",
    },
  },

  two_hole: {
    displayName: "two_hole",
    photoURL: "./tests/userImages/p5.png",
    button: {
      holeOption: "Circle2",
      holeType: "hole",
      borderColor: "blue3", 
      nubColor: "red3",
    },
  },

  bad_theme_fallback: {
    displayName: "bad_theme_fallback",
    photoURL: "./tests/userImages/p2.png",
    theme: 'adsf', 
    button: {
      borderColor: "red", 
      nubColor: "yellow",
    },
  },

}