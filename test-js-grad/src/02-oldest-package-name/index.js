/**
 * Make the following POST request with either axios or node-fetch:

POST url: http://ambush-api.inyourarea.co.uk/ambush/intercept
BODY: {
    "url": "https://api.npms.io/v2/search/suggestions?q=react",
    "method": "GET",
    "return_payload": true
}

 *******

The results should have this structure:
{
    "status": 200.0,
    "location": [
      ...
    ],
    "from": "CACHE",
    "content": [
      ...
    ]
}

 ******

 *  With the results from this request, inside "content", return
 *  the "name" of the package that has the oldest "date" value
 */

module.exports = async function oldestPackageName() {
  // TODO

  const axios = require('axios')

  const res = await axios.post('http://ambush-api.inyourarea.co.uk/ambush/intercept', {
      "url": "https://api.npms.io/v2/search/suggestions?q=react",
      "method": "GET",
      "return_payload": true
    })

  const data = res.data.content

  let name = ''
  let dates = data.map(r => r.package.date)
  let oldestDate = dates.reduce(function (pre, curr) {
    return Date.parse(pre) > Date.parse(curr) ? curr : pre;
  });
  let resArr = data.map(r => r.package)

  resArr.forEach(r => {
    if (r.date === oldestDate) {
      name = r.name
    }
  })
  
  return name
  
};
