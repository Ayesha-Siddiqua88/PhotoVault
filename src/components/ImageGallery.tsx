import { getAnalytics, logEvent } from "firebase/analytics";
import useFirestore from "../hooks/useFirestore"
import { useState } from "react";

const ImageGallery=()=> {
  const { docs: images, isLoading} = useFirestore('images');
  const [showToast, setShowToast] = useState(false); // State to manage toast visibility


  const handleShare = async (imageUrl: string, userEmail: string) => {
    const shareLink = `${window.location.origin}/view?image=${encodeURIComponent(imageUrl)}&user=${encodeURIComponent(userEmail)}`;
    navigator.clipboard.writeText(shareLink).then(() => {
      setShowToast(true); 
      setTimeout(() => {
        setShowToast(false); 
      }, 2000);
    });

    const analytics = getAnalytics();
    logEvent(analytics, 'share', { imageUrl, userEmail });
  };

  if (isLoading) {
    return (
      <div className="text-center mt-10">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 justify-center gap-8 mt-10">
      {images.map((image) => (
          <div key={image.imageUrl} className="card card-compact w-full bg-base-100 shadow-xl shadow-black card-hover">
            <figure className="max-h-[14rem]">
              <img src={image.imageUrl} alt="Shoes" />
            </figure>
            <div className="card-body">
              <p>Upload by: {image.userEmail}</p>
              <span>Created: {image.createdAt.toLocaleDateString()}</span>
              <button
              className="btn btn-primary mt-4 share-button"
              onClick={() => handleShare(image.imageUrl, image.userEmail)}
            >
              Share
            </button>
            </div>
          </div>
        )
      )}
      {showToast && (
        <div className="toast">
          <div className="alert alert-info">
            <span>Link copied to clipboard.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery