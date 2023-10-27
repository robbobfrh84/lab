var pages = [ // * MUST be var, need to access it via window[...]
  { folder: 'i_cant_find_my_wallet', route: 'website/pages/', mobile: true, tweet: 'https://twitter.com/BobMain49/status/1153319949101928449', threads: "https://www.threads.net/@earth_to_bob_/post/Cy4YCxyOPHz" },
  { folder: '52_card_pickup', route: 'website/pages/', tweet: "https://twitter.com/BobMain49/status/1136708246427885570", threads: "https://www.threads.net/@earth_to_bob_/post/Cy6c2abu5L4" },
  { folder: 'captain_dashboard', route: 'website/pages/', mobile: true, tweet: 'https://twitter.com/BobMain49/status/1141725648471375874'},
  { folder: 'habitable_planet_generator', route: 'website/pages/', tweet: "https://twitter.com/BobMain49/status/1136990919557861382" },
  { folder: 'animated_layer_themes', route: 'website/pages/', tweet: 'https://twitter.com/BobMain49/status/1433213560079925251' },
  { folder: 'eclipse_toggle_emoji', route: 'website/pages/', mobile: true, tweet: "https://twitter.com/BobMain49/status/1140794971445964800", threads: "https://www.threads.net/@earth_to_bob_/post/Cy4U4_oO3yu"},
  { folder: 'petri_dish', route: 'website/pages/', mobile: true, },
  { folder: 'honeycomb_color_picker', route: 'website/pages/', mobile: true, tweet: "https://twitter.com/BobMain49/status/1155541132702552065"},
  { folder: 'party_text', route: 'website/pages/', mobile: true, tweet: "https://twitter.com/BobMain49/status/775727232035663872", threads: "https://www.threads.net/@earth_to_bob_/post/CyojtOFuamt"},
  // { folder: '', route: 'website/pages/' },
]

var other = [ // * MUST be var, need to access it via window[...]
  { name: "tobob.earth: Bob's Portfolio Website", route: "https://tobob.earth", mobile: true, 
    sheet: "https://docs.google.com/spreadsheets/d/1h7AQcnPrSPL9kwPwcBwkRRHB_VIdJ-NszRY1eYJHf24/edit#gid=1906007068",
    github: "https://github.com/robbobfrh84/portfolio"},
  { name: "colorai.farm: Color A.I Generator", route: "https://colorai.farm", mobile: true, 
    github: "https://github.com/robbobfrh84/palm-ai-app/tree/gh-pages" },
  { name: "Kiss the Sky: Evolution Game", route: "https://matthewmain.github.io/kiss_the_sky/", mobile: true, 
    github: "https://github.com/matthewmain/kiss_the_sky",
    tweet: "https://twitter.com/BobMain49/status/1238888084747497472"},
  { name: "All Colors: Color Picker / editor", route: "https://robbobfrh84.github.io/allcolors", mobile: true,
    github: "https://github.com/robbobfrh84/allcolors"},
  { name: "Top 5: Gas Up Example App", route: " https://robbobfrh84.github.io/gas-up/examples/top5/#movies", mobile: true, 
    sheet: "https://docs.google.com/spreadsheets/d/1KrabEzohbEZwELTIqE7cRjLIQaGJFS95I2qR5mw4FpU/edit#gid=685369503",
    github: "https://github.com/robbobfrh84/gas-up/tree/master/examples/top5",
    tweet: "https://twitter.com/BobMain49/status/1464329706807824387"},
  { name: "bob.farm: Repository (lab)", route: "https://github.com/robbobfrh84/lab", mobile: true, }

]

var local = [ // * MUST be var, need to access it via window[...]
  { name: "Jar Lights", route: 'http://10.0.0.161/', mobile: true, },
  { name: "tinkering", route: '/tinkering', mobile: true, },

]

var more = [ // * MUST be var, need to access it via window[...]
  { folder: 'tour_de_france', route: 'website/pages/', mobile: true, tweet: 'https://twitter.com/BobMain49/status/1428839915484221442',},
  { folder: 'mouse_line_warp', route: 'website/pages/', tweet: "https://twitter.com/BobMain49/status/773317445322874880" },
  { folder: 'darwins_divs', route: 'website/pages/', mobile: true, },
  { folder: 'greg', route: 'website/pages/', mobile: true, },
  { folder: 'erosion', route: 'website/pages/', mobile: true, },
  { folder: 'rand', route: 'website/pages/', mobile: true, tweet: "https://twitter.com/BobMain49/status/1175037616544260096"},
  { folder: 'black_dot', route: 'website/pages/', mobile: true, },
  { folder: 'moon_phase', route: 'website/pages/', mobile: true, tweet: "https://twitter.com/BobMain49/status/1131158383778762753"},
  { folder: 'emoji_earth_sun_moon', route: 'website/pages/', tweet: "https://twitter.com/BobMain49/status/1512505894910709769"},
  { folder: 'hanna', route: 'website/pages/' },
  { folder: 'the_thing_that_fell', route: 'website/pages/', mobile: true, },
  { folder: 'poopinski_triangle', route: 'website/pages/', tweet: "https://twitter.com/BobMain49/status/1138456968656510978" },
  { folder: 'disco_onion', route: 'website/pages/', mobile: true,tweet: 'https://twitter.com/BobMain49/status/1458980412244381696'},
  { folder: 'buy_me_a_coffee', route: 'website/pages/', mobile: true, },
  { folder: 'polygon_with_shadow', route: 'website/pages/', mobile: true, tweet: 'https://twitter.com/BobMain49/status/1138926040074588160'},
  { folder: 'socks', route: 'website/pages/', mobile: true, medium: 'https://medium.com/me/stats/post/215beaf83c6b'},
  { folder: 'purple_rain', route: 'website/pages/', mobile: true, tweet: 'https://twitter.com/BobMain49/status/723672564816445441' },
  { folder: 'eclipse_toggle', route: 'website/pages/', mobile: true, tweet: 'https://twitter.com/BobMain49/status/1432748775207063554' },
  { folder: 'greg', route: 'website/pages/', mobile: true, },
  { folder: 'border_radius', route: 'website/pages/', mobile: true, tweet: "https://twitter.com/BobMain49/status/1148982419988631552"},
  { folder: 'pop', route: 'website/pages/', mobile: true, tweet: "https://twitter.com/BobMain49/status/1145755195449589760"},
  { folder: 'zDog_topo', route: 'website/pages/', },
  { folder: 'sierpinski_triangle', route: 'website/pages/', mobile: true, },
  { folder: 'sudoku', route: 'website/pages/', mobile: true, },
  { folder: 'floorboards', route: 'website/pages/', tweet: 'https://twitter.com/BobMain49/status/1146893975829340166'},
  { folder: 'original_portfolio', route: 'website/pages/' },
  { folder: 'sphere_cutout', route: 'website/pages/' },
  { folder: 'trappist1_solar_system', route: 'website/pages/' }
]

/* ....Example with ALL Links so far.... */
// { 
//   folder: 'test_for_a_longer_link', 
//   route: 'website/pages/', 
//   mobile: true,
//   tweet: 'https://twitter.com',
//   youtube: 'https://youtube.com',
//   threads: 'https://www.threads.net/',
//   sheet: 'https://sheets.google.com'
//   github: "https://github.com,
//   medium: 'https://medium.com',
// },

