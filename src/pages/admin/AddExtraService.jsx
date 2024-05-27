import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addExtraService,
  getExtraService,
  resetState,
  updateExtraService,
} from "../../features/extraService/extraService.slice";

export default function AddExtraService() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const extraServiceState = useSelector((state) => state.extraService);
  const [extraServiceForm, setExtraServiceForm] = useState({
    name: "",
    price: "",
  });

  const handleChange = (e) => {
    setExtraServiceForm({
      ...extraServiceForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(
      addExtraService({
        name: e.target.name.value,
        price: e.target.price.value,
      })
    );
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(
      updateExtraService({
        id,
        extraService: {
          name: e.target.name.value,
          price: e.target.price.value,
        },
      })
    );
  };

  useEffect(() => {
    if (id) {
      dispatch(getExtraService(id));
    } else {
      setExtraServiceForm({
        name: "",
        price: "",
      });
    }
  }, [id]);

  useEffect(() => {
    if (extraServiceState.singleExtraService) {
      setExtraServiceForm({
        name: extraServiceState.singleExtraService.name,
        price: extraServiceState.singleExtraService.price,
      });
      dispatch(resetState());
    }
  }, [extraServiceState.singleExtraService]);

  useEffect(() => {
    if (
      extraServiceState.addedExtraService ||
      extraServiceState.updatedExtraService
    ) {
      dispatch(resetState());
      navigate("/admin/manage-extra-services");
    }
  }, [
    extraServiceState.addedExtraService,
    extraServiceState.updatedExtraService,
  ]);
  return (
    <div>
      <form
        className="p-2"
        onSubmit={(e) => (id ? handleUpdate(e) : handleAdd(e))}
      >
        <h2 className="my-3 text-center">
          {id ? "Edit" : "Add"} Extra Service
        </h2>
        <div className="form-group">
          <label htmlFor="name">Service Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Enter service name"
            onChange={handleChange}
            value={extraServiceForm.name}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            placeholder="Enter price"
            onChange={handleChange}
            value={extraServiceForm.price}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-3"
          disabled={extraServiceState.isLoading}
        >
          {extraServiceState.isLoading ? "Loading..." : id ? "Save" : "Add"}
        </button>
      </form>
    </div>
  );
}
