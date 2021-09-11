const express = require('express');
const GetAllFollowerCommand = require('../../application/get_all_followers/get-all-followers-command');
const container = require('../../container');
// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const command = new GetAllFollowerCommand({id});
    const saveTest = container.resolve('getAllFollowers');
    const response = await saveTest.save(command);

    res.status(200).json({...response});
  } catch (error) {
    console.log(error);
    res.status(500).json({error: error.toString()});
  }
});

module.exports = router;
