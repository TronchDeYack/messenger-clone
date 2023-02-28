import express, { Request, Response } from 'express'
import db from '@models/index'

const router = express.Router()

router.get('/users', async (req: Request, res: Response) => {
  const users = await (db as any).User.findAll()
  res.status(200).send(users)
})

router.get('/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const user = await (db as any).User.findByPk(id)

  if (user) {
		res.status(200).json(user);
	} else {
		res.status(404).send('404 - Not found');
	}
})

export default router