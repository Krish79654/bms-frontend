import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import {
  addMenu,
  getMenuById,
  getMenus,
  resetState,
  updateMenu,
} from "../../features/menu/menu.slice";

export default function AddMenuItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuState = useSelector((state) => state.menu);
  const [menuForm, setMenuForm] = useState({
    name: "",
    price: "",
  });
  const editorRef = useRef(null);
  const [editorLoaded, setEditorLoaded] = useState(false);

  const handleChange = (e) => {
    setMenuForm({ ...menuForm, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();

    dispatch(
      addMenu({
        name: e.target.name.value,
        description: editorRef.current.getContent(),
        price: e.target.price.value,
      })
    );
  };
  const handleUpdate = (e) => {
    e.preventDefault();

    dispatch(
      updateMenu({
        id,
        menu: {
          name: e.target.name.value,
          description: editorRef.current.getContent(),
          price: e.target.price.value,
        },
      })
    );
  };

  useEffect(() => {
    if (id) {
      dispatch(getMenuById(id));
    } else {
      setMenuForm({
        name: "",
        price: "",
      });
      editorRef.current?.setContent("");
    }
  }, [id]);

  useEffect(() => {
    if (menuState.singleMenu && editorLoaded) {
      setMenuForm({
        name: menuState.singleMenu.name,
        price: menuState.singleMenu.price,
      });
      editorRef.current.setContent(menuState.singleMenu.description);
      dispatch(resetState());
    }
  }, [menuState.singleMenu, editorLoaded]);

  useEffect(() => {
    if (menuState.addedMenu || menuState.updatedMenu) {
      dispatch(resetState());
      navigate("/admin/manage-menus");
    }
  }, [menuState.addedMenu, menuState.updatedMenu]);

  return (
    <div>
      {!editorLoaded && <div className="text-center my-3">Loading...</div>}
      <form
        className={`col-md-6 m-auto ${editorLoaded ? "visible" : "invisible"}`}
        onSubmit={(e) => (id ? handleUpdate(e) : handleAdd(e))}
      >
        <h2 className="my-3 text-center">{id ? "Edit" : "Add"} Menu</h2>
        <div className="form-group">
          <label htmlFor="name">Menu Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter menu name"
            name="name"
            onChange={handleChange}
            value={menuForm.name}
            required
          />
        </div>
        <div className="mb-2">
          <label className="mb-2" htmlFor="description">
            Description:
          </label>
          <Editor
            id="description"
            onInit={(evt, editor) => {
              editorRef.current = editor;
              setEditorLoaded(true);
            }}
            apiKey="i00wqysp0svpffsrargf0aehrdz47p46iuartcdbukucyl34"
            init={{
              branding: false,
              menubar: false,
              plugins: "wordcount lists",
              toolbar:
                "undo redo | blocks fontsize | bold italic underline strikethrough | align lineheight | numlist bullist indent outdent | removeformat",
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            placeholder="Enter price"
            name="price"
            onChange={handleChange}
            value={menuForm.price}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-3"
          disabled={menuState.isLoading}
        >
          {menuState.isLoading ? "Loading..." : id ? "Save" : "Add"}
        </button>
      </form>
    </div>
  );
}
