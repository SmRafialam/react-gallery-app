import './App.css';
import React, { useState } from "react";

function App() {
  const [selectedImages, setSelectedImages] = useState([]);
  // const [featuredImage, setFeaturedImage] = useState(null);

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    console.log(selectedFiles);
    const selectedFilesArray = Array.from(selectedFiles);
    console.log(selectedFilesArray);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    console.log(imagesArray);

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));

    // FOR BUG IN CHROME
    event.target.value = "";
  };
  
  function deleteHandler(image) {
    setSelectedImages(selectedImages.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  }

  return (
   <section>
    <div className="grid-container">
      <div className="card">

      <div className="images">
          {selectedImages.map((image, index) => (
            <div key={image} className={"image"}>
              <img src={image} height="200" alt="upload" />
              <button onClick={() => deleteHandler(image)}>
                Delete Image
              </button>
              <p>{index + 1}</p>
            </div>

          ))}
      <div className="upload-container">
        <label>
          <p>
            + Add Images
          </p>
          <br />
          <input
            type="file"
            name="images"
            onChange={onSelectFile}
            multiple
            accept="image/png , image/jpeg, image/webp"
          />
        </label>
      </div>
     </div>
    </div>
   </div>
  </section>
    // <div className="grid-container">
    //   <div className="grid-row">
    //     <div className="grid-item">
    //       <div className="card">Card 1</div>
    //     </div>
    //     <div className="grid-item">
    //       <div className="card">Card 2</div>
    //     </div>
    //     <div className="grid-item">
    //       <div className="card">Card 3</div>
    //     </div>
    //     <div className="grid-item">
    //       <div className="card">Card 4</div>
    //     </div>
    //     <div className="grid-item">
    //       <div className="card">Card 5</div>
    //     </div>
    //   </div>

    //   <div className="grid-row">
    //     <div className="grid-item">
    //       <div className="card">Card 6</div>
    //     </div>
    //     <div className="grid-item">
    //       <div className="card">Card 7</div>
    //     </div>
    //     <div className="grid-item">
    //       <div className="card">Card 8</div>
    //     </div>
    //     <div className="grid-item">
    //       <div className="card">Card 9</div>
    //     </div>
    //     <div className="grid-item">
    //       <div className="card">Card 10</div>
    //     </div>
    //   </div>

    //   {/* Row 3: 5 Grid Items */}
    //   <div className="grid-row">
    //     <div className="grid-item">
    //       <div className="card">Card 11</div>
    //     </div>
    //     <div className="grid-item">
    //       <div className="card">Card 12</div>
    //     </div>
    //     <div className="grid-item">
    //       <div className="card">Card 13</div>
    //     </div>
    //     <div className="grid-item">
    //       <div className="card">Card 14</div>
    //     </div>
    //     <div className="grid-item">
    //       <div className="card">Card 15</div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default App;
