// PROMPT TEMPLATE
/* 

Given the following json object array of United States states, 
add the key '<NEW KEY>:' and give the value of <Describe value>
to the corrisponding state's object.

"

"

*/



const statesData = [
  {
      "id": "AL",
      "name": "Alabama",
      "pop": 5024279,
      "cap": "Montgomery",
      "au": 1819,
      "sqm": 52420,
      "gdp": "2.47e+02",
      "groups": []
  },
  {
      "id": "AK",
      "name": "Alaska",
      "pop": 733583,
      "cap": "Juneau",
      "au": 1959,
      "sqm": 665384,
      "gdp": "6.30e+01",
      "groups": []
  },
  {
      "id": "AZ",
      "name": "Arizona",
      "pop": 7421401,
      "cap": "Phoenix",
      "au": 1912,
      "sqm": 113998,
      "gdp": "4.44e+02",
      "groups": []
  },
  {
      "id": "AR",
      "name": "Arkansas",
      "pop": 3040217,
      "cap": "Little Rock",
      "au": 1836,
      "sqm": 53179,
      "gdp": "1.54e+02",
      "groups": []
  },
  {
      "id": "CA",
      "name": "California",
      "pop": 39613493,
      "cap": "Sacramento",
      "au": 1850,
      "sqm": 163695,
      "gdp": "3.57e+03",
      "groups": []
  },
  {
      "id": "CO",
      "name": "Colorado",
      "pop": 5913097,
      "cap": "Denver",
      "au": 1876,
      "sqm": 104094,
      "gdp": "4.40e+02",
      "groups": []
  },
  {
      "id": "CT",
      "name": "Connecticut",
      "pop": 3605944,
      "cap": "Hartford",
      "au": 1788,
      "sqm": 5543,
      "gdp": "3.42e+02",
      "groups": []
  },
  {
      "id": "DE",
      "name": "Delaware",
      "pop": 1003384,
      "cap": "Dover",
      "au": 1787,
      "sqm": 2489,
      "gdp": "9.43e+01",
      "groups": []
  },
  {
      "id": "FL",
      "name": "Florida",
      "pop": 21992985,
      "cap": "Tallahassee",
      "au": 1845,
      "sqm": 65758,
      "gdp": "1.19e+03",
      "groups": []
  },
  {
      "id": "GA",
      "name": "Georgia",
      "pop": 10710017,
      "cap": "Atlanta",
      "au": 1788,
      "sqm": 59425,
      "gdp": "7.63e+02",
      "groups": []
  },
  {
      "id": "HI",
      "name": "Hawaii",
      "pop": 1460137,
      "cap": "Honolulu",
      "au": 1959,
      "sqm": 10931,
      "gdp": "9.73e+01",
      "groups": []
  },
  {
      "id": "ID",
      "name": "Idaho",
      "pop": 1967997,
      "cap": "Boise",
      "au": 1890,
      "sqm": 83569,
      "gdp": "1.12e+02",
      "groups": []
  },
  {
      "id": "IL",
      "name": "Illinois",
      "pop": 12569321,
      "cap": "Springfield",
      "au": 1818,
      "sqm": 57914,
      "gdp": "1.01e+03",
      "groups": []
  },
  {
      "id": "IN",
      "name": "Indiana",
      "pop": 6805985,
      "cap": "Indianapolis",
      "au": 1816,
      "sqm": 36418,
      "gdp": "4.32e+02",
      "groups": []
  },
  {
      "id": "IA",
      "name": "Iowa",
      "pop": 3190729,
      "cap": "Des Moines",
      "au": 1846,
      "sqm": 56272,
      "gdp": "2.33e+02",
      "groups": []
  },
  {
      "id": "KS",
      "name": "Kansas",
      "pop": 2950246,
      "cap": "Topeka",
      "au": 1861,
      "sqm": 82278,
      "gdp": "1.99e+02",
      "groups": []
  },
  {
      "id": "KY",
      "name": "Kentucky",
      "pop": 4509394,
      "cap": "Frankfort",
      "au": 1792,
      "sqm": 40408,
      "gdp": "2.68e+02",
      "groups": []
  },
  {
      "id": "LA",
      "name": "Louisiana",
      "pop": 4624047,
      "cap": "Baton Rouge",
      "au": 1812,
      "sqm": 52378,
      "gdp": "2.94e+02",
      "groups": []
  },
  {
      "id": "ME",
      "name": "Maine",
      "pop": 1362359,
      "cap": "Augusta",
      "au": 1820,
      "sqm": 35380,
      "gdp": "7.92e+01",
      "groups": []
  },
  {
      "id": "MD",
      "name": "Maryland",
      "pop": 6177224,
      "cap": "Annapolis",
      "au": 1788,
      "sqm": 12407,
      "gdp": "4.28e+02",
      "groups": []
  },
  {
      "id": "MA",
      "name": "Massachusetts",
      "pop": 7033469,
      "cap": "Boston",
      "au": 1788,
      "sqm": 10554,
      "gdp": "7.14e+02",
      "groups": []
  },
  {
      "id": "MI",
      "name": "Michigan",
      "pop": 10050811,
      "cap": "Lansing",
      "au": 1837,
      "sqm": 96714,
      "gdp": "6.27e+02",
      "groups": []
  },
  {
      "id": "MN",
      "name": "Minnesota",
      "pop": 5772053,
      "cap": "Saint Paul",
      "au": 1858,
      "sqm": 86936,
      "gdp": "4.64e+02",
      "groups": []
  },
  {
      "id": "MS",
      "name": "Mississippi",
      "pop": 2930450,
      "cap": "Jackson",
      "au": 1817,
      "sqm": 48432,
      "gdp": "1.29e+02",
      "groups": []
  },
  {
      "id": "MO",
      "name": "Missouri",
      "pop": 6169038,
      "cap": "Jefferson City",
      "au": 1821,
      "sqm": 69707,
      "gdp": "4.11e+02",
      "groups": []
  },
  {
      "id": "MT",
      "name": "Montana",
      "pop": 1127002,
      "cap": "Helena",
      "au": 1889,
      "sqm": 147040,
      "gdp": "6.47e+01",
      "groups": []
  },
  {
      "id": "NE",
      "name": "Nebraska",
      "pop": 1961151,
      "cap": "Lincoln",
      "au": 1867,
      "sqm": 77358,
      "gdp": "1.57e+02",
      "groups": []
  },
  {
      "id": "NV",
      "name": "Nevada",
      "pop": 3228399,
      "cap": "Carson City",
      "au": 1864,
      "sqm": 110577,
      "gdp": "2.32e+02",
      "groups": []
  },
  {
      "id": "NH",
      "name": "NewHampshire",
      "pop": 1371246,
      "cap": "Concord",
      "au": 1788,
      "sqm": 9349,
      "gdp": "1.02e+02",
      "groups": []
  },
  {
      "id": "NJ",
      "name": "NewJersey",
      "pop": 8882190,
      "cap": "Trenton",
      "au": 1787,
      "sqm": 8723,
      "gdp": "7.36e+02",
      "groups": []
  },
  {
      "id": "NM",
      "name": "NewMexico",
      "pop": 2120220,
      "cap": "Santa Fe",
      "au": 1912,
      "sqm": 121590,
      "gdp": "1.17e+02",
      "groups": []
  },
  {
      "id": "NY",
      "name": "NewYork",
      "pop": 19223191,
      "cap": "Albany",
      "au": 1788,
      "sqm": 54556,
      "gdp": "2.13e+03",
      "groups": []
  },
  {
      "id": "NC",
      "name": "NorthCarolina",
      "pop": 10600823,
      "cap": "Raleigh",
      "au": 1789,
      "sqm": 53819,
      "gdp": "7.30e+02",
      "groups": []
  },
  {
      "id": "ND",
      "name": "NorthDakota",
      "pop": 779094,
      "cap": "Bismarck",
      "au": 1889,
      "sqm": 70698,
      "gdp": "6.60e+01",
      "groups": []
  },
  {
      "id": "OH",
      "name": "Ohio",
      "pop": 11714618,
      "cap": "Columbus",
      "au": 1803,
      "sqm": 44826,
      "gdp": "8.24e+02",
      "groups": []
  },
  {
      "id": "OK",
      "name": "Oklahoma",
      "pop": 4041365,
      "cap": "Oklahoma City",
      "au": 1907,
      "sqm": 69899,
      "gdp": "2.27e+02",
      "groups": []
  },
  {
      "id": "OR",
      "name": "Oregon",
      "pop": 4241507,
      "cap": "Salem",
      "au": 1859,
      "sqm": 98379,
      "gdp": "3.29e+02",
      "groups": []
  },
  {
      "id": "PA",
      "name": "Pennsylvania",
      "pop": 12780542,
      "cap": "Harrisburg",
      "au": 1787,
      "sqm": 46054,
      "gdp": "8.98e+02",
      "groups": []
  },
  {
      "id": "RI",
      "name": "RhodeIsland",
      "pop": 1097379,
      "cap": "Providence",
      "au": 1790,
      "sqm": 1545,
      "gdp": "6.98e+01",
      "groups": []
  },
  {
      "id": "SC",
      "name": "SouthCarolina",
      "pop": 5373306,
      "cap": "Columbia",
      "au": 1788,
      "sqm": 32020,
      "gdp": "2.97e+02",
      "groups": []
  },
  {
      "id": "SD",
      "name": "SouthDakota",
      "pop": 909824,
      "cap": "Pierre",
      "au": 1889,
      "sqm": 77116,
      "gdp": "6.31e+01",
      "groups": []
  },
  {
      "id": "TN",
      "name": "Tennessee",
      "pop": 7080262,
      "cap": "Nashville",
      "au": 1796,
      "sqm": 42143,
      "gdp": "4.63e+02",
      "groups": []
  },
  {
      "id": "TX",
      "name": "Texas",
      "pop": 30448518,
      "cap": "Austin",
      "au": 1845,
      "sqm": 268596,
      "gdp": "2.09e+03",
      "groups": []
  },
  {
      "id": "UT",
      "name": "Utah",
      "pop": 3367004,
      "cap": "Salt Lake City",
      "au": 1896,
      "sqm": 84897,
      "gdp": "2.60e+02",
      "groups": []
  },
  {
      "id": "VT",
      "name": "Vermont",
      "pop": 647156,
      "cap": "Montpelier",
      "au": 1791,
      "sqm": 9616,
      "gdp": "4.04e+01",
      "groups": []
  },
  {
      "id": "VA",
      "name": "Virginia",
      "pop": 8654542,
      "cap": "Richmond",
      "au": 1788,
      "sqm": 42775,
      "gdp": "6.57e+02",
      "groups": []
  },
  {
      "id": "WA",
      "name": "Washington",
      "pop": 7693612,
      "cap": "Olympia",
      "au": 1889,
      "sqm": 71303,
      "gdp": "8.30e+02",
      "groups": []
  },
  {
      "id": "WV",
      "name": "WestVirginia",
      "pop": 1767850,
      "cap": "Charleston",
      "au": 1863,
      "sqm": 24230,
      "gdp": "8.65e+01",
      "groups": []
  },
  {
      "id": "WI",
      "name": "Wisconsin",
      "pop": 5893718,
      "cap": "Madison",
      "au": 1848,
      "sqm": 65496,
      "gdp": "4.21e+02",
      "groups": []
  },
  {
      "id": "WY",
      "name": "Wyoming",
      "pop": 576851,
      "cap": "Cheyenne",
      "au": 1890,
      "sqm": 97813,
      "gdp": "4.36e+01",
      "groups": []
  }
]
