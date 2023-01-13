export function SuccessReturn(data?: any) {
  return {
    data: data,
  };
}

export function ErrorReturn(errorMessage: string) {
  return {
    errorMessage: errorMessage,
  };
}
