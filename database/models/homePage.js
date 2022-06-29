const client = require('../index');

const homePage = {
  getHomePageInfo: (req, res) => {
    const { longitude, latitude } = req.query;
    const range = 0.1;
    client.query(` 
      SELECT * FROM public.event
      WHERE date::date >= CURRENT_DATE
      AND longitude <= ${} + ${range} AND longitude >= ${} - ${range}
      AND latitude <= ${} + ${range} AND latitude >= ${} - ${range}
      ORDER BY date, start_time DESC
      LIMIT 5; 
    `)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  },
  getHomePageGenre: (req, res) => {},
};

module.exports = homePage;

// result = {
//   // get 5 upcoming events
//   events: [
//     {},
//   ],
//   // get 5 most popular artists
//   artists: [
//     {},
//   ],
//   // get 1 newest artist as fresh talent
//   talent: {} // artist id 20

// }
