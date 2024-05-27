import { useState } from "react"
import useStorage from "../hooks/useStorage";

export default function UploadForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const {startUpload, progress}=useStorage();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files[0]){
      setSelectedFile(e.target.files[0]);
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(selectedFile){
      startUpload(selectedFile);
    }
    setSelectedFile(null);
  }

  return <div className="text-center mt-10">
    <form onSubmit={handleSubmit} className="flex items-center flex-col gap-8" >
    <input type="file" onChange={handleFileChange} className="file-input file-input-sm  w-64  bg-blue-600 max-w-sm text-white" />
    <button type="submit" className={`px-3 py-1 rounded-lg text-[1.1rem] mt-[-13px] font-bold button text-white ${Boolean(progress) && 'loading' }`} disabled={!selectedFile}>Upload📸</button>
    </form>
  </div>
}
