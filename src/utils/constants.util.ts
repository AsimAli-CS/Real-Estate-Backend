export default {
  CODE: {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NON_AUTHORITIVE_INFORMATION: 203,
    PARTIAL_CONTENT: 206,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NO_CONTENT: 204,
    FORBIDDEN: 403,
    RECORD_NOT_FOUND: 404,
    NOT_ACCEPTED: 406,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
    EXCESSIVE_REQUEST: 429,
  },
  Messages: {
    INVALID_PLATFORM: 'Invalid Platform',
    INVALID: 'Invalid Email or Password',
    SIGNIN_SUCCESSFULL: 'Signed in successfully',
    PASSWORD_FORMAT:
      'Password must have UpperCase, LowerCase, Number/SpecialChar and min 8 Chars',
    AUTHENTICATION_REQUIRED: 'Authentication Required',
    AUTHENTICATION_ERROR: 'Authentication Failed',
    EXCEPTION: 'We ran into an error. Please try again later',
    UPLOAD_FILES_FAILURE: 'Unable to upload files',
    UPLOAD_FILES_SUCCESS: 'Files uploaded successfully',
    DELETE_FILES_FAILURE: 'Unable to delete files',
    DELETE_FILES_SUCCESS: 'Files Delete successfully',
    ATTATCH_FILE_ERROR: 'Please attatch atleast one MCA file to upload',
    ROLE_ACCESS: 'You are not authorized to perform this action!',
    INVALID_FIELD: ' is invalid',
  },
  passwordRegex:
    /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
  failureRegisterMessage: (name: string): string => `${name} not registered!`,
  successRegisterMessage: (name: string): string =>
    `${name} registered successfully!`,
  successAddMessage: (name: string): string => `${name} added successfully!`,
  successCreatedMessage: (name: string): string =>
    `${name} created successfully!`,
  failureAddMessage: (name: string): string => `Unable to add ${name}`,
  failureUpdateMessage: (name: string): string => `Unable to update ${name}`,
  failureDeleteMessage: (name: string): string => `Unable to delete ${name}`,
  successDeleteMessage: (name: string): string =>
    `${name} deleted successfully!`,
  successUpdateMessage: (name: string): string =>
    `${name} updated successfully!`,
  notFoundMessage: (name: string): string => `Unable to find ${name}!`,
  alreadyExistsMessage: (name: string): string => `${name} already exists!`,
  successFoundMessage: (name: string): string =>
    `${name} returned successfully!`,
  failureFetchMessage: (entity: string) => `Failed to fetch ${entity}.`,
  unexpectedErrorMessage: (action: string) =>
    `An unexpected error occurred while ${action}.`,
  successfullyMessage: (name: string): string => `${name} successfully`,
};
