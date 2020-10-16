import { v4 as uuidv4 } from 'uuid';
const defaultOptions = {};

export const uuidGen = (opt?: object) => uuidv4({ ...defaultOptions, ...opt });
