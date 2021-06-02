const express = require('express');

const router = express.Router();

const Posts = require('./posts-model');

router.get('/', (req, res) => {
  Posts.find(req.query)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'The posts information could not be retrieved',
      })
    })
})

router.get('/:id', async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id)
    if (!post) {
      res.status(404).json({
        message: 'The post with the specified ID does not exist'
      })
    } else {
      res.json(post)
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'The post information could not be retrieved',
    })
  }
})

router.post('/', (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents ) {
    req.status(400).json({
      message:'Please provide title and contents for the post'
    })
  } else {
    Posts.insert({ title, contents })
      .then(({id}) => {
        return Posts.findById(id)
      })
      .then(newPost => {
        res.status(201).json(newPost)
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'There was an error while saving the post to the database'
        })
      })
  }
});



module.exports = router;