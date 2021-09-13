const express = require('express');
const GetAllFollowerCommand = require('../../application/get_all_followers/get-all-followers-command');
const StreamAllFollowerCommand = require('../../application/stream_all_followers/stream-all-followers-command');
const container = require('../../container');
/* const cache = require('express-expeditious')({
  namespace: 'expresscache',
  defaultTtl: 604800000,
  engine: require('expeditious-engine-redis')({
    host: 'localhost',
    port: 6379,
  }),
});
*/

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/stream/:id', async (req, res) => {
  const {id} = req.params;
  res.setHeader('Content-Type', 'text/event-stream');

  try {
    let currentCursor = '';
    const command = new StreamAllFollowerCommand({id});
    const streamAllFollowers = container.resolve('streamAllFollowers');

    const getOneFollowerPage = await streamAllFollowers.get(command);
    const firstPageFollowers = getOneFollowerPage.followers.map((follower) => follower);
    res.write(`data: ${JSON.stringify(firstPageFollowers)} \n\n`);
    currentCursor = getOneFollowerPage.nextPage;

    // The other pages
    for (let i = 0; i <= Math.floor((getOneFollowerPage.totalFollowers / 100) - 1); i++) {
      const currentPage = await streamAllFollowers.get({id, currentNextPage: currentCursor});
      const batchFollowers = [];

      for (const followers of currentPage.followers) {
        batchFollowers.push(followers);
      }

      res.write(`data: ${JSON.stringify(batchFollowers)} \n\n`);
      currentCursor = currentPage.nextPage;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({error: err.toString()});
  }
});

router.get('/:id', /* cache.withSessionAwareness(false),*/ async (req, res) => {
  req.setTimeout(250 * 1000 * 60);
  const {id} = req.params;
  try {
    const command = new GetAllFollowerCommand({id});
    const getAllFollowers = container.resolve('getAllFollowers');
    const response = await getAllFollowers.get(command);

    res.status(200).json({...response});
  } catch (err) {
    console.log(err);
    res.status(500).json({error: err.toString()});
  }
});

module.exports = router;

