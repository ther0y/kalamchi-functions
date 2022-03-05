type AuthPayload = {
  username?: string;
  sub?: string;
  iat: number;
  'https://hasura.io/jwt/claims': {
    'x-hasura-allowed-roles': string[];
    'x-hasura-default-role': string;
    'x-hasura-user-id'?: string;
  };
};

export class AuthPayloadFactory {
  static create(role, userId = null, username = null): AuthPayload {
    const now = Math.ceil(new Date().getTime() / 1000);

    if (userId) {
      return {
        username,
        sub: userId,
        iat: now,
        'https://hasura.io/jwt/claims': {
          'x-hasura-allowed-roles': [role],
          'x-hasura-default-role': role,
          'x-hasura-user-id': userId,
        },
      };
    }

    return {
      username: 'guest',
      iat: now,
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': [role],
        'x-hasura-default-role': role,
      },
    };
  }
}
