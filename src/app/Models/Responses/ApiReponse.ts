export class ApiResponse<T> {
    constructor(data?: any) {
      this.errors = [];
      this.data = data;
    }
    data: T;
    errors: ApiError[];
    getErrorsText(): string {
      return this.errors.map(e => e.text).join(' ');
    }
    hasErrors(): boolean {
      return this.errors.length > 0;
    }
    text: string;
  }
  
  export class ApiError { code: ErrorCode; text: string; }
  
  export enum ErrorCode {
    UnknownError = 1,
    OrderIsOutdated = 2
  }