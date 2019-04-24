var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/webhook', function (req, res) {
  if (req.body.event_name === 'user_create') {
    setTimeout(() => {
      gitlabLdapGroupSync.sync();
    }, 5000);
    res.status(200).send('OK');
  } else {
    res.status(422).send('This is not a valid gitlab system hook');
  }
});

module.exports = router;

var gitlabLdapGroupSync = undefined;
module.exports.init = function (glgs) {
  gitlabLdapGroupSync = glgs;
}
