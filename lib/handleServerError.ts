import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';
import type { ZodIssue } from 'zod';

interface ServerError {
  message: string;
  zodIssues?: ZodIssue[];
}

export default function handleServerError(error: unknown): ServerError {
  if (error instanceof ZodError) {
    return { message: error.message, zodIssues: error.errors };
  }
  if (
    error instanceof Prisma.PrismaClientKnownRequestError ||
    error instanceof Prisma.PrismaClientValidationError ||
    error instanceof Prisma.PrismaClientUnknownRequestError ||
    error instanceof Prisma.PrismaClientInitializationError
  ) {
    return { message: error.message };
  }
  return { message: 'Något gick snett med denna förfrågan' };
}
