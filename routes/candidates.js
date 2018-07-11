import createValidationMiddleware from '../middleware/validation';
import express from 'express';
import jwtMiddleware from '../middleware/jwt';
import uploadMiddleware from '../middleware/upload';
import {Candidate, Position, Message} from '../models';
import {candidate as candidateSchema} from '../schemas';
import {checkSchema} from 'express-validator/check';
import {matchedData} from 'express-validator/filter';
import {candidateOptions} from '../util';

const validationMiddleware = createValidationMiddleware(
  checkSchema(candidateSchema)
);

const router = express.Router();
router.use(jwtMiddleware);

router.post('/', uploadMiddleware, validationMiddleware, async (req, res) => {
  const data = matchedData(req);
  if (!req.user.getDataValue('election_ids').includes(data.election_id)) {
    res.sendStatus(403);
    return;
  }

  if (req.file) {
    data.avatar = req.file.data.link;
  }

  const candidate = await Candidate.create(data, {include: Position});
  res.send(candidate);
});

router
  .route('/:id')
  .all(async (req, res, next) => {
    res.locals.candidate = await Candidate.findById(
      req.params.id,
      candidateOptions
    );

    if (!res.locals.candidate) {
      res.sendStatus(404);
      return;
    }

    if (
      !req.user
        .getDataValue('election_ids')
        .includes(res.locals.candidate.election_id)
    ) {
      res.sendStatus(403);
      return;
    }

    next();
  })
  .put(uploadMiddleware, validationMiddleware, async (req, res, next) => {
    const {bios, ...data} = matchedData(req);
    if (req.file) {
      data.avatar = req.file.data.link;
    }

    const messages = await Message.bulkCreate(bios, {returning: true});
    await res.locals.candidate.setBios(messages);
    res.locals.candidate.setDataValue('bios', messages);

    await res.locals.candidate.update(data);
    next();
  })
  .delete(async (req, res, next) => {
    await res.locals.candidate.destroy();
    next();
  })
  .all((req, res) => res.send(res.locals.candidate));

export default router;
