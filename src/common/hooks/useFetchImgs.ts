import { useState, useCallback } from 'react';
import 'firebase/compat/storage';
import { ref, getDownloadURL } from 'firebase/storage';

import { storage } from '../../common/config/firebase/config';

type UndefinedUrlObject = {
  [key: string]: Array<string>;
};

type CarDetailImgs = {
  imgs: Array<string>;
  introImgs: Array<string>;
  exteriorReviewImgs: Array<string>;
  interiorReviewImgs: Array<string>;
};

export function useFetchImgs() {
  const [imgObj, setImgObj] = useState<CarDetailImgs | UndefinedUrlObject>({});

  const listItem = (starsRef: any) => {
    return getDownloadURL(starsRef);
  };

  const downloadImgsFromFirebase = useCallback<any>(async (urlObject: CarDetailImgs | UndefinedUrlObject) => {
    Object.entries(urlObject).map(async ([key, imgUrls]) => {
      imgUrls = imgUrls.map((url: string) => {
        return url.replaceAll(`\"]`, '').replaceAll(`[\"`, '');
      });
      const firebaseUrls = await Promise.all(
        imgUrls.map((url) => {
          const starsRef = ref(storage, url);
          return listItem(starsRef);
        }),
      );
      setImgObj((img: any) => {
        return { ...img, [key]: firebaseUrls };
      });
    });
  }, []);

  return { imgObj, downloadImgsFromFirebase };
}
