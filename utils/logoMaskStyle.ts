export function logoMaskStyle(logo: string) {
  return {
    maskImage: `url(${logo})`,
    maskSize: 'contain',
    maskRepeat: 'no-repeat',
    maskPosition: 'left center',
    WebkitMaskImage: `url(${logo})`,
    WebkitMaskSize: 'contain',
    WebkitMaskRepeat: 'no-repeat',
    WebkitMaskPosition: 'left center',
  }
}
