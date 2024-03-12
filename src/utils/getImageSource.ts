export function getImageSource(imageName: string) {
  return process.env.NEXT_PUBLIC_API_URL + '/images/' + imageName;
}
