import {Router} from 'express'

const router = Router()

router.get('/addTransceivers', (req, res) => {
  res.send('Add')
})

export default router;