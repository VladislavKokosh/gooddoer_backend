import { type Request, type Response } from 'express';
import { type Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { type IUser } from '../models/User/user.types';
import { recoverPersonalSignature } from 'eth-sig-util';
import { createToken, getUserIdByToken } from '../passport/service';

import { User } from '../models/User/user';

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: 'Request should have id in params' });
  }

  const user = await User.findOne({ _id: id });

  if (user) {
    res.status(200).json({ user });
  } else {
    res.status(404).json({ message: 'User is not found' });
  }
};

export const getNonceByAddress = async (req: Request, res: Response): Promise<void> => {
  const { publicAddress } = req.params;

  if (!publicAddress) {
    res.status(400).json({ message: 'Request should have publicAddress in params' });
  }

  const user = await User.findOne({ publicAddress });

  if (user) {
    res.status(200).json({ nonce: user.nonce });
  } else {
    res.status(404).json({ message: 'User is not found' });
  }
};

export const newUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { publicAddress } = req.body;

    if (!publicAddress) {
      res.status(400).json({ message: 'Request should have publicAddress' });
    }

    const user = await User.findOne({ publicAddress });

    if (user) {
      res.status(500).json({ error: 'User already exists.' });
      return;
    }

    const newUser: IUser & Document = new User({
      publicAddress,
    });

    await newUser
      .save()
      .then((user) => res.status(200).json(user))
      .catch((error: any) => {
        res.status(500).send({
          message: error.message,
        });
        res.status(500).json(error);
      });
  } catch (err: any) {
    console.log(err);
    res.status(400).json({ message: `Error ${err}` });
  }
};

export const authentication = async (req: Request, res: Response): Promise<void> => {
  try {
    const { signature, publicAddress } = req.body;

    if (!signature || !publicAddress) {
      res.status(400).send({ error: 'Request should have signature and publicAddress' });
      return;
    }

    const user = await User.findOne({ publicAddress });

    if (user) {
      console.log(user.nonce);
      const message = `I am signing my one-time nonce: ${user.nonce}`;
      const messageBufferHex = `0x${Buffer.from(message, 'utf8').toString('hex')}`;
      console.log(messageBufferHex);
      const address = recoverPersonalSignature({
        data: messageBufferHex,
        sig: signature,
      });
      console.log(address, publicAddress);
      if (address.toLowerCase() === publicAddress.toLowerCase()) {
        user.nonce = uuidv4();
        await user.save();

        const token = `Bearer ${createToken(user._id, publicAddress)}`;

        res.status(200).json({ accessToken: token });
      } else {
        res.status(401).json({
          error: 'Signature verification failed',
        });
      }
    }
  } catch (err: any) {
    console.log(err);
    res.status(400).json({ message: `Error ${err}` });
  }
};

export const changeUsername = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username } = req.body;

    if (!username) {
      res.status(401).json({ message: 'Request should have username in body' });
    }

    const decodedToken = getUserIdByToken(req.headers);

    if (!decodedToken) {
      res.status(401).json({ message: 'Request should have Authorization in headers' });
      return;
    }

    const userId = decodedToken && typeof decodedToken !== 'string' && decodedToken.userId;

    const user = await User.findById(userId);

    if (!user) {
      res.status(500).json({ error: 'User is not found.' });
      return;
    }

    user.username = username;
    await user.save();
    res.status(200).json({ username });
  } catch (e) {
    console.log(e);
  }
};
