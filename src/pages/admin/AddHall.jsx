import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import {
  addHall,
  getHallById,
  removeImage,
  updateHall,
  resetState,
} from "../../features/hall/hall.slice";

export default function AddHall() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hallState = useSelector((state) => state.hall);
  const [hallForm, setHallForm] = useState({
    name: "",
    capacity: "",
  });

  const handleChange = (e) => {
    setHallForm({ ...hallForm, [e.target.name]: e.target.value });
  };

  // Images
  const [existingImages, setExistingImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const onDrop = useCallback(
    (acceptedFiles) => {
      setUploadedImages(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setUploadedImages]
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleAdd = (e) => {
    e.preventDefault();

    const hall = new FormData();
    hall.append("name", e.target.name.value);
    hall.append("capacity", e.target.capacity.value);
    uploadedImages.forEach((file) => {
      hall.append("images", file);
    });

    dispatch(addHall(hall));
  };
  const handleUpdate = (e) => {
    e.preventDefault();

    const hall = new FormData();
    hall.append("name", e.target.name.value);
    hall.append("capacity", e.target.capacity.value);
    uploadedImages.forEach((file) => {
      hall.append("images", file);
    });

    dispatch(updateHall({ id, hall }));
  };
  const handleDeleteImage = (imageId) => {
    dispatch(removeImage({ id, imageId }));
  };

  useEffect(() => {
    if (id) {
      dispatch(getHallById(id));
    } else {
      setHallForm({ name: "", capacity: "" });
      setExistingImages([]);
    }
  }, [id]);

  useEffect(() => {
    if (hallState.singleHall) {
      setHallForm({
        name: hallState.singleHall?.name,
        capacity: hallState.singleHall?.capacity,
      });
      setExistingImages(hallState.singleHall?.images || []);
      dispatch(resetState());
    }
  }, [hallState.singleHall]);

  useEffect(() => {
    if (hallState.addedHall || hallState.updatedHall) {
      dispatch(resetState());
      navigate("/admin/manage-halls");
    }
  }, [hallState.addedHall, hallState.updatedHall]);

  return (
    <div className="row">
      <form
        className="col-md-6 m-auto"
        onSubmit={(e) => (id ? handleUpdate(e) : handleAdd(e))}
      >
        <h2 className="my-3 text-center">{id ? "Edit" : "Add"} Hall</h2>
        <div className="form-group">
          <label htmlFor="name">Hall name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Enter hall name"
            value={hallForm.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="capacity">Hall capacity</label>
          <input
            type="number"
            min="1"
            className="form-control"
            id="capacity"
            name="capacity"
            placeholder="Enter hall capacity"
            value={hallForm.capacity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="my-2">
          <div className="p-2 border">
            <div {...getRootProps()} role="button">
              <input {...getInputProps()} />
              <p>
                <i className="fa-solid fa-camera me-2"></i>
                Drag 'n' drop images here, or click to select images
              </p>
            </div>
            <div className="d-flex flex-wrap">
              {existingImages.map((image, idx) => (
                <div key={idx} className="me-2 mt-2 position-relative">
                  <img src={image.url} alt="product" height="100" />
                  <button
                    className="btn btn-danger btn-sm position-absolute top-0 end-0"
                    onClick={() => handleDeleteImage(image._id)}
                    disabled={hallState.isLoading}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              ))}
              {uploadedImages.map((file, idx) => (
                <div key={idx} className="me-2 mt-2 position-relative">
                  <img src={file.preview} alt="product" height="100" />
                  <button
                    className="btn btn-danger btn-sm position-absolute top-0 end-0"
                    onClick={() =>
                      setUploadedImages(
                        uploadedImages.filter((_, index) => index !== idx)
                      )
                    }
                    disabled={hallState.isLoading}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-3"
          disabled={hallState.isLoading}
        >
          {hallState.isLoading ? "Loading..." : id ? "Save" : "Add"}
        </button>
      </form>
    </div>
  );
}
