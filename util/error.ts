import { GraphQLError } from "graphql";

const notFoundError = (text: string, errorCode: string) => {
  return new GraphQLError(text, null, null, null, null, null, {
    extensions: {
      code: errorCode,
    },
  });
};

export { notFoundError };
