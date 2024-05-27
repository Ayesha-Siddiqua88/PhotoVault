import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAnalytics, logEvent } from "firebase/analytics";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase/config";

const ViewImage = () => {
  const [searchParams] = useSearchParams();
  const imageUrl = searchParams.get("image");
  const userEmail = searchParams.get("user");

  useEffect(() => {
    const trackView = async () => {
      if (imageUrl && userEmail) {
        // Track view event in Google Analytics
        const analytics = getAnalytics();
        logEvent(analytics, 'view_image', { imageUrl, userEmail });

        // Update Firestore document with view count
        const imageDoc = doc(db, "images", imageUrl);
        await updateDoc(imageDoc, {
          views: arrayUnion({
            viewedBy: userEmail,
            viewedAt: new Date(),
          }),
        });
      }
    };
        trackView();
  }, [imageUrl, userEmail]);

  return (
    <div className="text-center mt-10">
      {imageUrl ? (
        <>
          <img src={imageUrl} alt="Shared image" className="max-h-[14rem]" />
          <p>Uploaded by: {userEmail}</p>
        </>
      ) : (
        <p>Invalid image link.</p>
      )}
    </div>
  );
};

export default ViewImage;
