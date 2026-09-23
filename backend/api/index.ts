import 'pg';
import handler from '../dist/main';

export default handler;

export const config = {
  maxDuration: 30,
};