import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

interface View {
  viewedBy: string;
  viewedAt: Date;
}

interface Image {
  id: string;
  userEmail: string;
  imageUrl: string;
  createdAt: Date;
  views: View[];
}

const Analytics = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const auth = getAuth();

  useEffect(() => {
    const fetchImages = async () => {
      const user = auth.currentUser;
      if (user) {
        const q = query(collection(db, "images"), where("userEmail", "==", user.email));
        const querySnapshot = await getDocs(q);
        const imageList: Image[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          imageList.push({
            id: doc.id,
            userEmail: data.userEmail,
            imageUrl: data.imageUrl,
            createdAt: data.createdAt.toDate(),
            views: data.views || []
          });
        });
        setImages(imageList);
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [auth]);

  if (isLoading) {
    return (
      <div className="text-center mt-10">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  return (
    <div className="mt-10 ml-10 mb-[3rem]">
      <h2 className="text-2xl font-bold mb-6 text-blue-500 text-center">Analytics</h2>
      {images.length > 0 ? (
        <div className="grid md:grid-cols-5 justify-center gap-8 mt-6">
          {images.map((image) => (
            <div key={image.id} className="card card-compact w-64 bg-base-100 shadow-xl shadow-black">
              <figure className="max-h-[16rem]">
                <img src={image.imageUrl} alt="Uploaded image" />
              </figure>
              <div className="card-body">
                <p>Upload by: {image.userEmail}</p>
                <span>Created: {image.createdAt.toLocaleDateString()}</span>
                <span>Views: {image.views.length}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No images uploaded.</p>
      )}
    </div>
  );
};

export default Analytics;
