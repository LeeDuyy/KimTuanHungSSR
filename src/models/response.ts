class Response {
    data: object | Array<any> | null = null;
    message: string = 'Bad request';
    statusCode: number = 400;
    totalPage: number = 0;
}

export default Response;
