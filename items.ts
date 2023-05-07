import { Router } from 'express';
import { itemsCollection, Item } from './models';
import { authenticateJWT } from './middleware';
import { ObjectId } from 'mongodb';

const router = Router();

// Create an item
router.post('/', authenticateJWT, async (req, res) => {
  const item: Item = req.body;
  const result = await itemsCollection().insertOne(item);
  const createdItem = (result as any).ops[0] as Item;
  res.status(201).json(createdItem);
});

// Get all items
router.get('/', authenticateJWT, async (req, res) => {
  const items = await itemsCollection().find().toArray();
  res.status(200).json(items);
});

// Get an item by ID
router.get('/:id', authenticateJWT, async (req, res) => {
  const { id } = req.params;
  // const item = await itemsCollection().findOne({ _id: new ObjectId(id) });
  // const item = await itemsCollection().findOne({ _id: new ObjectId(id) } as Filter<Item>);
  const item = await itemsCollection().findOne({ _id: new ObjectId(id) } as unknown as Partial<Item>);
  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }
  res.status(200).json(item);
});

// Update an item by ID
router.put('/:id', authenticateJWT, async (req, res) => {
  const { id } = req.params;
  const update = req.body;
  // const result = await itemsCollection().updateOne({ _id: new ObjectId(id) }, { $set: update });
  // const result = await itemsCollection().updateOne({ _id: new ObjectId(id) } as Filter<Item>, { $set: update });
  const result = await itemsCollection().updateOne({ _id: new ObjectId(id) } as unknown as Partial<Item>, { $set: update });
  if (result.matchedCount === 0) {
    return res.status(404).json({ message: 'Item not found' });
  }
  res.status(200).json({ message: 'Item updated' });
});

// Delete an item by ID
router.delete('/:id', authenticateJWT, async (req, res) => {
  const { id } = req.params;
  // const result = await itemsCollection().deleteOne({ _id: new ObjectId(id) });
  // const result = await itemsCollection().deleteOne({ _id: new ObjectId(id) } as Filter<Item>);
  const result = await itemsCollection().deleteOne({ _id: new ObjectId(id) } as unknown as Partial<Item>);
  if (result.deletedCount === 0) {
    return res.status(404).json({ message: 'Item not found' });
  }
  res.status(200).json({ message: 'Item deleted' });
});

export default router;
