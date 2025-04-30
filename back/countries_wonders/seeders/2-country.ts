module.exports = {
  up: async (queryInterface) => {
    const countries = [
      { name: 'Afghanistan', code: 'AF', latitude: 33.93911, longitude: 67.709953 },
      { name: 'Albania', code: 'AL', latitude: 41.153332, longitude: 20.168331 },
      { name: 'Algeria', code: 'DZ', latitude: 28.033886, longitude: 1.659626 },
      { name: 'Andorra', code: 'AD', latitude: 42.546245, longitude: 1.601554 },
      { name: 'Angola', code: 'AO', latitude: -11.202692, longitude: 17.873887 },
      { name: 'Antigua and Barbuda', code: 'AG', latitude: 17.060816, longitude: -61.796428 },
      { name: 'Argentina', code: 'AR', latitude: -38.416097, longitude: -63.616672 },
      { name: 'Armenia', code: 'AM', latitude: 40.069099, longitude: 45.038189 },
      { name: 'Australia', code: 'AU', latitude: -25.274398, longitude: 133.775136 },
      { name: 'Austria', code: 'AT', latitude: 47.516231, longitude: 14.550072 },
      { name: 'Azerbaijan', code: 'AZ', latitude: 40.143105, longitude: 47.576927 },
      { name: 'Bahamas', code: 'BS', latitude: 25.03428, longitude: -77.39628 },
      { name: 'Bahrain', code: 'BH', latitude: 25.930414, longitude: 50.637772 },
      { name: 'Bangladesh', code: 'BD', latitude: 23.684994, longitude: 90.356331 },
      { name: 'Barbados', code: 'BB', latitude: 13.193887, longitude: -59.543198 },
      { name: 'Belarus', code: 'BY', latitude: 53.709807, longitude: 27.953389 },
      { name: 'Belgium', code: 'BE', latitude: 50.503887, longitude: 4.469936 },
      { name: 'Belize', code: 'BZ', latitude: 17.189877, longitude: -88.49765 },
      { name: 'Benin', code: 'BJ', latitude: 9.30769, longitude: 2.315834 },
      { name: 'Bhutan', code: 'BT', latitude: 27.514162, longitude: 90.433601 },
      { name: 'Bolivia', code: 'BO', latitude: -16.290154, longitude: -63.588653 },
      { name: 'Bosnia and Herzegovina', code: 'BA', latitude: 43.915886, longitude: 17.679076 },
      { name: 'Botswana', code: 'BW', latitude: -22.328474, longitude: 24.684866 },
      { name: 'Brazil', code: 'BR', latitude: -14.235004, longitude: -51.92528 },
      { name: 'Brunei', code: 'BN', latitude: 4.535277, longitude: 114.727669 },
      { name: 'Bulgaria', code: 'BG', latitude: 42.733883, longitude: 25.48583 },
      { name: 'Burkina Faso', code: 'BF', latitude: 12.238333, longitude: -1.561593 },
      { name: 'Burundi', code: 'BI', latitude: -3.373056, longitude: 29.918886 },
      { name: 'Cabo Verde', code: 'CV', latitude: 16.5388, longitude: -23.0418 },
      { name: 'Cambodia', code: 'KH', latitude: 12.565679, longitude: 104.990963 },
      { name: 'Cameroon', code: 'CM', latitude: 7.369722, longitude: 12.354722 },
      { name: 'Canada', code: 'CA', latitude: 56.130366, longitude: -106.346771 },
      { name: 'Central African Republic', code: 'CF', latitude: 6.611111, longitude: 20.939444 },
      { name: 'Chad', code: 'TD', latitude: 15.454166, longitude: 18.732207 },
      { name: 'Chile', code: 'CL', latitude: -35.675147, longitude: -71.542969 },
      { name: 'China', code: 'CN', latitude: 35.86166, longitude: 104.195397 },
      { name: 'Colombia', code: 'CO', latitude: 4.570868, longitude: -74.297333 },
      { name: 'Comoros', code: 'KM', latitude: -11.6455, longitude: 43.3333 },
      { name: 'Congo (Congo-Brazzaville)', code: 'CG', latitude: -0.228021, longitude: 15.827659 },
      { name: 'Congo (Democratic Republic)', code: 'CD', latitude: -4.038333, longitude: 21.758664 },
      { name: 'Costa Rica', code: 'CR', latitude: 9.748917, longitude: -83.753428 },
      { name: 'Croatia', code: 'HR', latitude: 45.1, longitude: 15.2 },
      { name: 'Cuba', code: 'CU', latitude: 21.521757, longitude: -77.781167 },
      { name: 'Cyprus', code: 'CY', latitude: 35.126413, longitude: 33.429859 },
      { name: 'Czechia', code: 'CZ', latitude: 49.817492, longitude: 15.472962 },
      { name: 'Denmark', code: 'DK', latitude: 56.26392, longitude: 9.501785 },
      { name: 'Djibouti', code: 'DJ', latitude: 11.825138, longitude: 42.590275 },
      { name: 'Dominica', code: 'DM', latitude: 15.414999, longitude: -61.370976 },
      { name: 'Dominican Republic', code: 'DO', latitude: 18.735693, longitude: -70.162651 },
      { name: 'Ecuador', code: 'EC', latitude: -1.831239, longitude: -78.183406 },
      { name: 'Egypt', code: 'EG', latitude: 26.820553, longitude: 30.802498 },
      { name: 'El Salvador', code: 'SV', latitude: 13.794185, longitude: -88.89653 },
      {
        name: 'Equatorial Guinea',
        code: 'GQ',
        latitude: 1.6508,
        longitude: 10.2679
      },
      {
        name: 'Eritrea',
        code: 'ER',
        latitude: 15.1794,
        longitude: 39.7823
      },
      {
        name: 'Estonia',
        code: 'EE',
        latitude: 58.5953,
        longitude: 25.0136
      },
      {
        name: 'Ethiopia',
        code: 'ET',
        latitude: 9.145,
        longitude: 40.4897
      },
      {
        name: 'Falkland Islands (Malvinas)',
        code: 'FK',
        latitude: -51.7963,
        longitude: -59.5236
      },
      {
        name: 'Faroe Islands',
        code: 'FO',
        latitude: 61.8926,
        longitude: -6.9118
      },
      {
        name: 'Fiji',
        code: 'FJ',
        latitude: -17.7134,
        longitude: 178.065
      },
      {
        name: 'Finland',
        code: 'FI',
        latitude: 61.9241,
        longitude: 25.7482
      },
      {
        name: 'France',
        code: 'FR',
        latitude: 46.6034,
        longitude: 1.8883
      },
      {
        name: 'French Guiana',
        code: 'GF',
        latitude: 3.9339,
        longitude: -53.1258
      },
      {
        name: 'French Polynesia',
        code: 'PF',
        latitude: -17.6797,
        longitude: -149.4068
      },
      {
        name: 'French Southern Territories',
        code: 'TF',
        latitude: -49.2804,
        longitude: 69.3486
      },
      {
        name: 'Gabon',
        code: 'GA',
        latitude: -0.8037,
        longitude: 11.6094
      },
      {
        name: 'Gambia',
        code: 'GM',
        latitude: 13.4432,
        longitude: -15.3101
      },
      {
        name: 'Georgia',
        code: 'GE',
        latitude: 42.3154,
        longitude: 43.3569
      },
      {
        name: 'Germany',
        code: 'DE',
        latitude: 51.1657,
        longitude: 10.4515
      },
      {
        name: 'Ghana',
        code: 'GH',
        latitude: 7.9465,
        longitude: -1.0232
      },
      {
        name: 'Gibraltar',
        code: 'GI',
        latitude: 36.1408,
        longitude: -5.3536
      },
      {
        name: 'Greece',
        code: 'GR',
        latitude: 39.0742,
        longitude: 21.8243
      },
      {
        name: 'Greenland',
        code: 'GL',
        latitude: 71.7069,
        longitude: -42.6043
      },
      {
        name: 'Grenada',
        code: 'GD',
        latitude: 12.1165,
        longitude: -61.6789
      },
      {
        name: 'Guadeloupe',
        code: 'GP',
        latitude: 16.265,
        longitude: -61.551
      },
      {
        name: 'Guam',
        code: 'GU',
        latitude: 13.4443,
        longitude: 144.7937
      },
      {
        name: 'Guatemala',
        code: 'GT',
        latitude: 15.7835,
        longitude: -90.2308
      },
      {
        name: 'Guernsey',
        code: 'GG',
        latitude: 49.4657,
        longitude: -2.5853
      },
      {
        name: 'Guinea',
        code: 'GN',
        latitude: 9.9456,
        longitude: -9.6966
      },
      {
        name: 'Guinea-Bissau',
        code: 'GW',
        latitude: 11.8037,
        longitude: -15.1804
      },
      {
        name: 'Guyana',
        code: 'GY',
        latitude: 4.8604,
        longitude: -58.9302
      },
      {
        name: 'Haiti',
        code: 'HT',
        latitude: 18.9712,
        longitude: -72.2852
      },
      {
        name: 'Heard Island and Mcdonald Islands',
        code: 'HM',
        latitude: -53.08181,
        longitude: 73.504158
      },
      {
        name: 'Holy See (Vatican City State)',
        code: 'VA',
        latitude: 41.902916,
        longitude: 12.453389
      },
      {
        name: 'Honduras',
        code: 'HN',
        latitude: 13.909444,
        longitude: -83.111328
      },
      {
        name: 'Hong Kong',
        code: 'HK',
        latitude: 22.319303,
        longitude: 114.169361
      },
      {
        name: 'Hungary',
        code: 'HU',
        latitude: 47.162494,
        longitude: 19.503304
      },
      {
        name: 'Iceland',
        code: 'IS',
        latitude: 64.963051,
        longitude: -19.020835
      },
      {
        name: 'India',
        code: 'IN',
        latitude: 20.593684,
        longitude: 78.96288
      },
      {
        name: 'Indonesia',
        code: 'ID',
        latitude: -0.789275,
        longitude: 113.921327
      },
      {
        name: 'Iran, Islamic Republic Of',
        code: 'IR',
        latitude: 32.427908,
        longitude: 53.688044
      },
      {
        name: 'Iraq',
        code: 'IQ',
        latitude: 33.223191,
        longitude: 43.679291
      },
      {
        name: 'Ireland',
        code: 'IE',
        latitude: 53.41291,
        longitude: -8.24389
      },
      {
        name: 'Isle of Man',
        code: 'IM',
        latitude: 54.2361,
        longitude: -4.5481
      },
      {
        name: 'Israel',
        code: 'IL',
        latitude: 31.046051,
        longitude: 34.851612
      },
      {
        name: 'Italy',
        code: 'IT',
        latitude: 41.87194,
        longitude: 12.56738
      },
      {
        name: 'Jamaica',
        code: 'JM',
        latitude: 18.109581,
        longitude: -77.297508
      },
      {
        name: 'Japan',
        code: 'JP',
        latitude: 36.204824,
        longitude: 138.252924
      },
      {
        name: 'Jersey',
        code: 'JE',
        latitude: 49.214439,
        longitude: -2.13125
      },
      {
        name: 'Jordan',
        code: 'JO',
        latitude: 30.585164,
        longitude: 36.238414
      },
      {
        name: 'Kazakhstan',
        code: 'KZ',
        latitude: 48.019573,
        longitude: 66.923684
      },
      {
        name: 'Kenya',
        code: 'KE',
        latitude: -0.023559,
        longitude: 37.906193
      },
      {
        name: 'Kiribati',
        code: 'KI',
        latitude: -3.370417,
        longitude: -168.734039
      },
      {
        name: "Korea, Democratic People's Republic of",
        code: 'KP',
        latitude: 40.3399,
        longitude: 127.5101
      },
      {
        name: 'Korea, Republic of',
        code: 'KR',
        latitude: 35.907757,
        longitude: 127.766922
      },
      {
        name: 'Kuwait',
        code: 'KW',
        latitude: 29.3759,
        longitude: 47.9774
      },
      {
        name: 'Kyrgyzstan',
        code: 'KG',
        latitude: 41.20438,
        longitude: 74.766098
      },
      {
        name: "Lao People's Democratic Republic",
        code: 'LA',
        latitude: 19.85627,
        longitude: 102.495496
      },
      {
        name: 'Latvia',
        code: 'LV',
        latitude: 56.879635,
        longitude: 24.603189
      },
      {
        name: 'Lebanon',
        code: 'LB',
        latitude: 33.854721,
        longitude: 35.862285
      },
      {
        name: 'Lesotho',
        code: 'LS',
        latitude: -29.609988,
        longitude: 28.233608
      },
      {
        name: 'Liberia',
        code: 'LR',
        latitude: 6.428055,
        longitude: -9.429499
      },
      {
        name: 'Libyan Arab Jamahiriya',
        code: 'LY',
        latitude: 26.3351,
        longitude: 17.228331
      },
      {
        name: 'Liechtenstein',
        code: 'LI',
        latitude: 47.1415,
        longitude: 9.5215
      },
      {
        name: 'Lithuania',
        code: 'LT',
        latitude: 55.169438,
        longitude: 23.881275
      },
      {
        name: 'Luxembourg',
        code: 'LU',
        latitude: 49.61166,
        longitude: 6.13
      },
      {
        name: 'Macao',
        code: 'MO',
        latitude: 22.198745,
        longitude: 113.543873
      },
      {
        name: 'Macedonia, The Former Yugoslav Republic of',
        code: 'MK',
        latitude: 41.608635,
        longitude: 21.745275
      },
      {
        name: 'Madagascar',
        code: 'MG',
        latitude: -18.766947,
        longitude: 46.869107
      },
      {
        name: 'Malawi',
        code: 'MW',
        latitude: -13.254308,
        longitude: 34.301525
      },
      {
        name: 'Malaysia',
        code: 'MY',
        latitude: 4.210484,
        longitude: 101.975766
      },
      {
        name: 'Maldives',
        code: 'MV',
        latitude: 3.2028,
        longitude: 73.2207
      },
      {
        name: 'Mali',
        code: 'ML',
        latitude: 17.570692,
        longitude: -3.996166
      },
      {
        name: 'Malta',
        code: 'MT',
        latitude: 35.9375,
        longitude: 14.3754
      },
      {
        name: 'Marshall Islands',
        code: 'MH',
        latitude: 7.1315,
        longitude: 171.1845
      },
      {
        name: 'Martinique',
        code: 'MQ',
        latitude: 14.6415,
        longitude: -61.0242
      },
      {
        name: 'Mauritania',
        code: 'MR',
        latitude: 21.00789,
        longitude: -10.940278
      },
      {
        name: 'Mauritius',
        code: 'MU',
        latitude: -20.348404,
        longitude: 57.552152
      },
      {
        name: 'Mayotte',
        code: 'YT',
        latitude: -12.8275,
        longitude: 45.166244
      },
      {
        name: 'Mexico',
        code: 'MX',
        latitude: 23.634501,
        longitude: -102.552784
      },
      {
        name: 'Micronesia, Federated States of',
        code: 'FM',
        latitude: 6.9117,
        longitude: 158.2471
      },
      {
        name: 'Moldova, Republic of',
        code: 'MD',
        latitude: 47.411631,
        longitude: 28.369885
      },
      {
        name: 'Monaco',
        code: 'MC',
        latitude: 43.7333,
        longitude: 7.4167
      },
      {
        name: 'Mongolia',
        code: 'MN',
        latitude: 46.8625,
        longitude: 103.8467
      },
      {
        name: 'Montserrat',
        code: 'MS',
        latitude: 16.742498,
        longitude: -62.187366
      },
      {
        name: 'Morocco',
        code: 'MA',
        latitude: 31.7917,
        longitude: -7.0926
      },
      {
        name: 'Mozambique',
        code: 'MZ',
        latitude: -18.665695,
        longitude: 35.529562
      },
      {
        name: 'Myanmar',
        code: 'MM',
        latitude: 21.913965,
        longitude: 95.956223
      },
      {
        name: 'Namibia',
        code: 'NA',
        latitude: -22.95764,
        longitude: 18.49041
      },
      {
        name: 'Nauru',
        code: 'NR',
        latitude: -0.522778,
        longitude: 166.931503
      },
      { name: 'Nepal', code: 'NP', latitude: 28.3949, longitude: 84.124 },
      { name: 'Netherlands', code: 'NL', latitude: 52.379189, longitude: 4.90093 },
      { name: 'Netherlands Antilles', code: 'AN', latitude: 12.2268, longitude: -69.0601 },
      { name: 'New Caledonia', code: 'NC', latitude: -20.904305, longitude: 165.618042 },
      { name: 'New Zealand', code: 'NZ', latitude: -40.900557, longitude: 174.885971 },
      { name: 'Nicaragua', code: 'NI', latitude: 12.865416, longitude: -85.207229 },
      { name: 'Niger', code: 'NE', latitude: 17.607789, longitude: 8.081666 },
      { name: 'Nigeria', code: 'NG', latitude: 9.082, longitude: 8.6753 },
      { name: 'Niue', code: 'NU', latitude: -19.054445, longitude: -169.867233 },
      { name: 'Norfolk Island', code: 'NF', latitude: -29.040835, longitude: 167.954712 },
      { name: 'Northern Mariana Islands', code: 'MP', latitude: 17.33083, longitude: 145.38469 },
      { name: 'Norway', code: 'NO', latitude: 60.472, longitude: 8.4689 },
      { name: 'Oman', code: 'OM', latitude: 21.512, longitude: 55.923255 },
      { name: 'Pakistan', code: 'PK', latitude: 30.3753, longitude: 69.3451 },
      { name: 'Palau', code: 'PW', latitude: 7.51498, longitude: 134.58252 },
      { name: 'Palestinian Territory, Occupied', code: 'PS', latitude: 31.9522, longitude: 35.2332 },
      { name: 'Panama', code: 'PA', latitude: 8.5375, longitude: -80.7821 },
      { name: 'Papua New Guinea', code: 'PG', latitude: -6.314993, longitude: 143.95555 },
      { name: 'Paraguay', code: 'PY', latitude: -23.442503, longitude: -58.443832 },
      { name: 'Peru', code: 'PE', latitude: -9.19, longitude: -75.0152 },
      {
        name: 'Philippines',
        code: 'PH',
        latitude: 12.8797,
        longitude: 121.774
      },
      { name: 'Pitcairn', code: 'PN', latitude: -24.7036, longitude: -127.4395 },
      { name: 'Poland', code: 'PL', latitude: 51.9194, longitude: 19.1451 },
      { name: 'Portugal', code: 'PT', latitude: 39.3999, longitude: -8.2245 },
      { name: 'Puerto Rico', code: 'PR', latitude: 18.2208, longitude: -66.5902 },
      { name: 'Qatar', code: 'QA', latitude: 25.3548, longitude: 51.1839 },
      { name: 'Reunion', code: 'RE', latitude: -21.1151, longitude: 55.5364 },
      { name: 'Romania', code: 'RO', latitude: 45.9432, longitude: 24.9668 },
      { name: 'Russian Federation', code: 'RU', latitude: 55.7558, longitude: 37.6176 },
      { name: 'RWANDA', code: 'RW', latitude: -1.9403, longitude: 29.8739 },
      { name: 'Saint Helena', code: 'SH', latitude: -15.965, longitude: -5.708 },
      { name: 'Saint Kitts and Nevis', code: 'KN', latitude: 17.357822, longitude: -62.782998 },
      { name: 'Saint Lucia', code: 'LC', latitude: 13.9094, longitude: -60.9789 },
      { name: 'Saint Pierre and Miquelon', code: 'PM', latitude: 46.8852, longitude: -56.3159 },
      { name: 'Saint Vincent and the Grenadines', code: 'VC', latitude: 12.9843, longitude: -61.2875 },
      { name: 'Samoa', code: 'WS', latitude: -13.759, longitude: -172.1046 },
      { name: 'San Marino', code: 'SM', latitude: 43.9333, longitude: 12.45 },
      { name: 'Sao Tome and Principe', code: 'ST', latitude: 0.1864, longitude: 6.6131 },
      { name: 'Saudi Arabia', code: 'SA', latitude: 23.8859, longitude: 45.0792 },
      { name: 'Senegal', code: 'SN', latitude: 14.4974, longitude: -14.4524 },
      { name: 'Serbia and Montenegro', code: 'CS', latitude: 44.0165, longitude: 21.0059 },
      { name: 'Seychelles', code: 'SC', latitude: -4.679574, longitude: 55.492042 },
      { name: 'Sierra Leone', code: 'SL', latitude: 8.460555, longitude: -11.779889 },
      { name: 'Singapore', code: 'SG', latitude: 1.352083, longitude: 103.819836 },
      { name: 'Slovakia', code: 'SK', latitude: 48.669026, longitude: 19.699024 },
      { name: 'Slovenia', code: 'SI', latitude: 46.151241, longitude: 14.995463 },
      { name: 'Solomon Islands', code: 'SB', latitude: -29.103251, longitude: 152.433342 },
      { name: 'Somalia', code: 'SO', latitude: 5.152149, longitude: 46.199616 },
      { name: 'South Africa', code: 'ZA', latitude: -30.559482, longitude: 22.937506 },
      { name: 'South Georgia and the South Sandwich Islands', code: 'GS', latitude: -54.429579, longitude: -36.587909 },
      { name: 'Spain', code: 'ES', latitude: 40.463667, longitude: -3.74922 },
      { name: 'Sri Lanka', code: 'LK', latitude: 7.873054, longitude: 80.771797 },
      { name: 'Sudan', code: 'SD', latitude: 12.862807, longitude: 30.217636 },
      { name: 'Suriname', code: 'SR', latitude: 3.919305, longitude: -56.027783 },
      { name: 'Svalbard and Jan Mayen', code: 'SJ', latitude: 77.553604, longitude: 23.670272 },
      { name: 'Swaziland', code: 'SZ', latitude: -26.522503, longitude: 31.465866 },
      { name: 'Sweden', code: 'SE', latitude: 60.128161, longitude: 18.643501 },
      { name: 'Switzerland', code: 'CH', latitude: 46.8182, longitude: 8.2275 },
      { name: 'Syrian Arab Republic', code: 'SY', latitude: 34.802075, longitude: 38.996815 },
      { name: 'Taiwan, Province of China', code: 'TW', latitude: 23.69781, longitude: 120.960515 },
      { name: 'Tajikistan', code: 'TJ', latitude: 38.861034, longitude: 71.276093 },
      { name: 'Tanzania, United Republic of', code: 'TZ', latitude: -6.369028, longitude: 34.888822 },
      { name: 'Thailand', code: 'TH', latitude: 15.870032, longitude: 100.992541 },
      { name: 'Timor-Leste', code: 'TL', latitude: -8.874217, longitude: 125.727539 },
      { name: 'Togo', code: 'TG', latitude: 8.619543, longitude: 0.824782 },
      { name: 'Tokelau', code: 'TK', latitude: -9.2005, longitude: -171.8574 },
      { name: 'Tonga', code: 'TO', latitude: -21.178986, longitude: -175.198242 },
      { name: 'Trinidad and Tobago', code: 'TT', latitude: 10.691803, longitude: -61.222503 },
      { name: 'Tunisia', code: 'TN', latitude: 33.886917, longitude: 9.537499 },
      { name: 'Turkey', code: 'TR', latitude: 38.963745, longitude: 35.243322 },
      { name: 'Turkmenistan', code: 'TM', latitude: 38.969719, longitude: 59.556278 },
      { name: 'Turks and Caicos Islands', code: 'TC', latitude: 21.694025, longitude: -71.797928 },
      { name: 'Tuvalu', code: 'TV', latitude: -7.109535, longitude: 177.64933 },
      { name: 'Uganda', code: 'UG', latitude: 1.373333, longitude: 32.290275 },
      { name: 'Ukraine', code: 'UA', latitude: 48.379433, longitude: 31.16558 },
      { name: 'United Arab Emirates', code: 'AE', latitude: 23.424076, longitude: 53.847818 },
      { name: 'United Kingdom', code: 'GB', latitude: 55.378051, longitude: -3.435973 },
      { name: 'United States', code: 'US', latitude: 37.09024, longitude: -95.712891 },
      { name: 'United States Minor Outlying Islands', code: 'UM', latitude: 19.2824, longitude: -166.64752 },
      { name: 'Uruguay', code: 'UY', latitude: -32.522779, longitude: -55.765835 },
      { name: 'Uzbekistan', code: 'UZ', latitude: 41.377491, longitude: 64.585262 },
      { name: 'Vanuatu', code: 'VU', latitude: -15.376706, longitude: 166.959158 },
      { name: 'Venezuela', code: 'VE', latitude: 6.42375, longitude: -66.58973 },
      { name: 'Viet Nam', code: 'VN', latitude: 14.058324, longitude: 108.277199 },
      {
        name: 'Virgin Islands, British',
        code: 'VG',
        latitude: 18.420695,
        longitude: -64.639968
      },
      {
        name: 'Virgin Islands, U.S.',
        code: 'VI',
        latitude: 18.33576,
        longitude: -64.896335
      },
      {
        name: 'Wallis and Futuna',
        code: 'WF',
        latitude: -13.768752,
        longitude: -176.200122
      },
      {
        name: 'Western Sahara',
        code: 'EH',
        latitude: 24.2155,
        longitude: -12.8856
      },
      {
        name: 'Yemen',
        code: 'YE',
        latitude: 15.552218,
        longitude: 48.516388
      },
      {
        name: 'Zambia',
        code: 'ZM',
        latitude: -13.133897,
        longitude: 27.849332
      },
      {
        name: 'Zimbabwe',
        code: 'ZW',
        latitude: -19.015438,
        longitude: 29.154857
      }
    ];
    await queryInterface.bulkInsert(
      'countries',
      countries.map((country) => ({
        name: country.name,
        code: country.code,
        language: 10,
        image:
          'https://www.google.com/url?sa=i&url=https%3A%2F%2Fdecouvrirlemonde.fr%2Ftop-10-des-meilleurs-pays-peu-touristiques%2F&psig=AOvVaw0oz8M9IcyP3YGWoYMdF0vz&ust=1726581353119000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIiXyPbOx4gDFQAAAAAdAAAAABAJ',
        description:
          "Visiter la France : Guide Essentiel. La France attire des millions de touristes pour son riche patrimoine, sa culture, sa gastronomie et sa diversité géographique. Voici ce qu’il faut savoir pour une visite réussie. Monuments et Sites Touristiques : Tour Eiffel (Paris) : Symbole de la France, offrant une vue panoramique. Notre-Dame (Paris) : Monument gothique en restauration, mais toujours un site incontournable. Château de Versailles : Résidence royale avec ses jardins et la galerie des Glaces. Mont-Saint-Michel (Normandie) : Île fortifiée célèbre pour ses marées spectaculaires. Palais des Papes (Avignon) : Imposant palais gothique. Côte d’Azur (Nice, Cannes) : Connue pour ses plages, ses festivals et son glamour méditerranéen. Culture Locale : Langue : Le français est la langue principale, mais l’anglais est largement compris dans les zones touristiques. Art et littérature : Figures comme Monet, Renoir, Hugo, Balzac, Proust ont marqué le monde. Mode et cinéma : Paris est la capitale de la mode, et Cannes accueille le célèbre festival du film. Gastronomie : Fromages : Plus de 1000 variétés (brie, roquefort, camembert). Vins : Régions célèbres comme Bordeaux, Bourgogne, Champagne. Plats typiques : Bœuf bourguignon, ratatouille, cassoulet, bouillabaisse. Pâtisseries : Croissants, éclairs, macarons, tartes aux fruits, baguette. Activités Incontournables : Musées : Louvre, Musée d’Orsay, Centre Pompidou. Nature : Randonnées dans les Alpes, plages sur la Côte d'Azur, Parc des Calanques pour le kayak. Festivals : Festival de Cannes, Avignon, Fête de la Musique en juin. Marchés et villages : Marchés provençaux, villages pittoresques comme Saint-Paul-de-Vence. Ce qui Rend la France Unique : Révolution française : Événement clé de l’histoire mondiale. Vin et gastronomie : Patrimoine mondial reconnu par l'UNESCO. Art et mode : Paris est un centre mondial pour la haute couture. Paris romantique : Ses ponts, rues pavées et cafés font de Paris la 'Ville Lumière'. Conseils de Sécurité : Vigilance dans les grandes villes : Soyez prudent face aux pickpockets dans les zones touristiques. Manifestations : Souvent pacifiques, mais à éviter en raison des débordements potentiels. Attaques terroristes : Surveillance renforcée dans les lieux publics. Zones sensibles : Certaines banlieues peuvent être plus risquées la nuit. Santé et COVID-19 : Suivez les recommandations sanitaires avant votre voyage. En résumé, la France offre une diversité culturelle et historique inégalée, ainsi qu'une cuisine reconnue mondialement. Avec quelques précautions de sécurité, votre séjour sera mémorable.",
        longitude: country.longitude,
        latitude: country.latitude,
        updated_at_description: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      })),
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('countries', {}, {});
  }
};
