import { format, parseISO } from 'date-fns';

export const formateMDYTime = (mongooseDate) => format(parseISO(mongooseDate),  "MMM d, yyyy • hh:mm a");
export const formateTime = (mongooseDate) => format(parseISO(mongooseDate),  "hh:mm a");