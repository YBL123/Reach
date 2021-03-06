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

 * With the results from this request, inside "content", 
 * list every maintainer and each package name that they maintain,
 * return an array with the following shape:
[
    ...
    {
        username: "a-username",
        packageNames: ["a-package-name", "another-package"]
    }
    ...
]
 * NOTE: the parent array and each "packageNames" array should 
 * be in alphabetical order.
 */

module.exports = async function organiseMaintainers() {
  // TODO

  const axios = require('axios')

  const res = await axios.post('http://ambush-api.inyourarea.co.uk/ambush/intercept', {
      "url": "https://api.npms.io/v2/search/suggestions?q=react",
      "method": "GET",
      "return_payload": true
    })

  const data = res.data.content
  let maintainers = {}

  data.map(o => {
    let packageName = o.package.name
    o.package.maintainers.map(u => {
      if (!maintainers.hasOwnProperty(u.username)) {
        maintainers[`${u.username}`] = []
      } 
      maintainers[`${u.username}`].push(packageName)
    })
  })

  let resArr = []

  for (const key in maintainers) {
    let resObj = {
      "username": key,
      "packageNames": maintainers[key].sort()
    }
    resArr.push(resObj)
  }

  return resArr.sort((a, b) => {
    return (a.username < b.username) ? -1 : (a.username > b.username) ? 1 : 0
  })

};

