function getBase64(text: string): string {
  return btoa(text).replaceAll("=", "");
}

export { getBase64 };
