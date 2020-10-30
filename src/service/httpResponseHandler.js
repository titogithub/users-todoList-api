const UNAUTHORIZED = 'Unauthorized';
const FORBIDDEN = 'Forbidden';
const BAD_REQUEST = 'Bad Request';
const NOT_FOUND = 'Not Found';
const INTERNAL_SERVER_ERROR = 'Internal Server Error';

const OK_STATUS_CODE = 200;
const CREATED_STATUS_CODE = 201;
const NO_CONTENT_STATUS_CODE = 204;
const BAD_REQUEST_STATUS_CODE = 400;
const UNAUTHORIZED_STATUS_CODE = 401;
const FORBIDDEN_STATUS_CODE = 403;
const NOT_FOUND_STATUS_CODE = 404;
const INTERNAL_SERVER_ERROR_STATUS_CODE = 500;

const buildResponse = (code, message) => {
  return {
    code,
    message
  };
};

const sendSuccess = (res, data) => {
  res.status(OK_STATUS_CODE).send(data);
};

const sendCreate = (res, data) => {
  res.status(CREATED_STATUS_CODE);
  data ? res.send(data) : res.send();
};

const sendEmpty = (res) => {
  res.status(NO_CONTENT_STATUS_CODE).send();
};

const sendNotFoundReq = (res, message=NOT_FOUND, code=NOT_FOUND_STATUS_CODE) => {
  res.status(NOT_FOUND_STATUS_CODE).send(buildResponse(code, message));
};

const sendInvalidToken = (res, message=UNAUTHORIZED, code=UNAUTHORIZED_STATUS_CODE) => {
  res.status(UNAUTHORIZED_STATUS_CODE).send(buildResponse(code, message));
};

const sendForbidden = (res, message=FORBIDDEN, code=FORBIDDEN_STATUS_CODE) => {
  res.status(FORBIDDEN_STATUS_CODE).send(buildResponse(code, message));
};

const sendInvalidReq = (res, message=BAD_REQUEST, code=BAD_REQUEST_STATUS_CODE) => {
  res.status(BAD_REQUEST_STATUS_CODE).send(buildResponse(code, message));
};

const sendInternalError = (res, message=INTERNAL_SERVER_ERROR, code=INTERNAL_SERVER_ERROR_STATUS_CODE) => {
  res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).send(buildResponse(code, message));
};

module.exports = {
  sendSuccess,
  sendCreate,
  sendEmpty,
  sendNotFoundReq,
  sendInvalidToken,
  sendForbidden,
  sendInvalidReq,
  sendInternalError
};
