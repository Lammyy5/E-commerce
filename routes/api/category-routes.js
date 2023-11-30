const router = require('express').Router()
const { Category, Product } = require('../../models')

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const categories = await Category.findAll({
    include: [{ model: Product }],
  }).catch((err) => {
    res.json(err)
  })
  res.json(categories)
})

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categories = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    })
    if (!categories) {
      res.status(404).json({ message: 'No category found with this id!' })
      return
    }

    res.status(200).json(categories)
  } catch (err) {
    res.status(500).json(err)
  }

  // be sure to include its associated Products
})

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body)
    res.status(200).json(newCategory)
  } catch (err) {
    res.status(400).json(err)
  }
})

router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedCategory) => {
      res.json(updatedCategory)
    })
    .catch((err) => res.json(err))
  // update a category by its `id` value
})

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedCategory) => {
      res.json(deletedCategory)
    })
    .catch((err) => res.json(err))
})

  // delete a category by its `id` value


module.exports = router
