export const replaceDirtyImgUrls = (imgs: Array<string>) => {
  return imgs.map((url) => {
    return url.replaceAll(`\"]`, '').replaceAll(`[\"`, '');
  });
};
