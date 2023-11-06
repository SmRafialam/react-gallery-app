import './App.css';
import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

function App() {
  const [selectedImages, setSelectedImages] = useState([]);
  // const [featuredImage, setFeaturedImage] = useState(null);
  const [selectedImagesCount, setSelectedImagesCount] = useState(0);
  // const [updatedSelectedImages, setUpdatedSelectedImages] = useState(Array(selectedImages.length).fill(false));


  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    console.log(selectedFiles);
    const selectedFilesArray = Array.from(selectedFiles);
    console.log(selectedFilesArray);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    console.log(imagesArray);

    // Convert the array of image URLs to a single string with URLs separated by a comma
    const imagesString = imagesArray.join(',');

    // Now, imagesString contains the image URLs separated by a comma
    console.log(imagesString);

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));

    // FOR BUG IN CHROME
    event.target.value = "";
  };

  const handleImageSelection = (index) => {
    // const updatedSelectedImages = [...selectedImages];
    // updatedSelectedImages[index] = !selectedImages[index];
    // setSelectedImages(updatedSelectedImages);
    //console.log(index);
    const updatedSelectedImages = [...selectedImages];
    console.log(updatedSelectedImages[index]);

    updatedSelectedImages[index] = !selectedImages[index];
    // Convert the array to a string, removing 'false' values
    const selectedImagesString = updatedSelectedImages.filter(Boolean).join(', ');

    console.log(selectedImagesString[index]);
    // setSelectedImages(updatedSelectedImages);
    const selectedCount = updatedSelectedImages.filter((image) => image).length;
    setSelectedImagesCount(selectedCount);
  };

  // const updateSelectedImagesCount = (images) => {
  //   const count = images.filter((image) => image).length;
  //   setSelectedImagesCount(count);
  // };
  
  // function deleteHandler(image) {
  //   setSelectedImages(selectedImages.filter((e) => e !== image));
  //   URL.revokeObjectURL(image);
  // }

  const onDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
  };
  
  const onDragOver = (e) => {
    e.preventDefault();
  };
  
  const onDrop = (e, targetIndex) => {
    e.preventDefault();
    const sourceIndex = e.dataTransfer.getData("text/plain");
    const updatedImages = [...selectedImages];
  
    // Swap the images based on the drag-and-drop
    const sourceImage = updatedImages[sourceIndex];
    updatedImages[sourceIndex] = updatedImages[targetIndex];
    updatedImages[targetIndex] = sourceImage;
  
    setSelectedImages(updatedImages);
  };

  const deleteSelectedImages = () => {
    // Filter out selected images
    const updatedImages = selectedImages.filter((selected, index) => !selected);
    console.log(updatedImages)
    // Revoke the URLs of the deleted images (be careful with this, as it can't be undone)
    selectedImages.forEach((selected, index) => {
        if (selected) {
            URL.revokeObjectURL(selected);
        }
    });
    // Set the updatedImages as the new selectedImages
    setSelectedImages(updatedImages);

    // Update the selected images count
    const selectedCount = updatedImages.filter((image) => image).length;
    setSelectedImagesCount(selectedCount);

    console.log('Selected Images:', updatedImages);
  };
  
  // const deleteSelectedImages = () => {
  //   // Filter out the selected images
  //   const updatedImages = selectedImages.filter((_, index) => !updatedSelectedImages[index]);
  
  //   // Revoke the URLs of the deleted images (be careful with this, as it can't be undone)
  //   updatedSelectedImages.forEach((selected, index) => {
  //     if (selected) {
  //       URL.revokeObjectURL(selected);
  //     }
  //   });
  
  //   // Update the selectedImages state
  //   setSelectedImages(updatedImages);
  
  //   // Update the selected images count
  //   const selectedCount = updatedImages.filter((image) => image).length;
  //   setSelectedImagesCount(selectedCount);
  
  //   // Clear the selected images array
  //   setUpdatedSelectedImages(Array(selectedImages.length).fill(false));
  
  //   // Log the results to the console
  //   console.log('Selected Images:', updatedImages);
  // };
  

  return (
   <section>
    <div className="grid-container">

      <div className="card">
      <div className="header">
        <h4 align="left">Gallery</h4>
        <p>Selected Images:{selectedImagesCount} {selectedImages.filter((image) => image).length}</p> {/* Display the selected images count */}
        <button className='dltBtn' onClick={deleteSelectedImages}>Delete</button>
      </div>
      <div className="images">
          {selectedImages.map((image, index) => (
            <div key={index} className={"image"} >
              {/* <div
              className={`selection-checkbox ${
                image.selected ? "selected" : ""
              }`}
              onClick={() => toggleImageSelection(index)}
            >
              {image.selected && <span>&#10003;</span>}
            </div> */}
            {/* <label>
              <input
                type="checkbox"
                
              />
            </label> */}
            {/* <FormControlLabel control = {<Checkbox />} label = "Checkbox" /> */}
            <div className="image-wrapper"  onDragStart={(e) => onDragStart(e, index)}>
              <FormControlLabel 
                control={<Checkbox checked={image.selected} 
                  onClick={(data) => {      
                    console.log(data.target.checked); 
                    handleImageSelection(index);
                    // return data.target.checked ? data.target.value : "";  
                }}/>}
                label=""
                className={`selection-checkbox ${
                  image.selected ? "selected" : ""
                }`}
              />

                <img src={image} 
                    height="200" 
                    alt="upload" 
                    draggable
                    // onDragStart={(e) => onDragStart(e, index)}
                    onDragOver={(e) => onDragOver(e)}
                    onDrop={(e) => onDrop(e, index)}
                />
              </div>
              {/* <button onClick={() => deleteHandler(image)}>
                Delete Image
              </button>
              <p>{index + 1}</p> */}
                {/* <p>Selected Images: {selectedImagesCount}</p> 
                <br></br>
                <button className='dltBtn' onClick={deleteSelectedImages}>Delete</button> */}
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
  );
}

export default App;