import { createEvent } from '@cobuildlab/react-simple-state';

export const LoginEvent = createEvent<boolean>({ initialValue: false });

export const TokensEvent = createEvent<{
  idToken: unknown;
  accessToken: string;
}>();
