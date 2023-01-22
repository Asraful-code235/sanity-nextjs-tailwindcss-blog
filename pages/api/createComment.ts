import { client } from '../../client';

export default async function createComment(req: any, res: any) {
  const { name, email, message, _id } = JSON.parse(req.body);

  await client.config({ token: process.env.REACT_APP_SANITY_TOKEN }).create({
    _type: 'comment',
    name,
    email,
    message,
    blogPost: {
      _type: 'reference',
      _ref: _id,
    },
  });

  return res.status(418);
}
