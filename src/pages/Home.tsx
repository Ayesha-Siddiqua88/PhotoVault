import ImageGallery from "../components/ImageGallery";
import UploadForm from "../components/UploadForm";
import Navbar from "../components/Navbar";

export default function Home() {

    return (
        
        <div className="max-w-4xl mx-auto py-2 px-8">
            <Navbar/>
            <UploadForm/>
            <ImageGallery/>
        </div>
        
        
        
    )
}
