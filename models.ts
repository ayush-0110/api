import { client } from './db';
import { Collection } from 'mongodb';
import { ObjectId } from 'mongodb';

export interface User {
  _id?: ObjectId;
  email: string;
  password: string;
}

export interface Item {
  _id: string;
  title: string;
  description: string;
}


export const itemsCollection = (): Collection<Item> => client.db().collection('items');
export const usersCollection = (): Collection<User> => client.db().collection('users');