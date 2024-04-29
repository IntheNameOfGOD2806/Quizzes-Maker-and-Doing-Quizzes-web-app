import { useState } from "react";
import { ModalFooter } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { userLoginSucces } from "../../redux/action/authAction";
import { updateProfile } from "../../services/apiservice";

import { useDispatch } from "react-redux";
const ViewProfile = (props) => {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.user.account);
  console.log(account);
  const [imagePreview, setImagePreview] = useState("");
  const [username, setUsername] = useState(account.username);
  const [image, setImage] = useState(account.image);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
    });

  const handleOnChangeImage = (e) => {
    if (e.target && e.target.files[0] && e.target.files) {
      const file = e.target.files[0];
      setImagePreview(URL.createObjectURL(file));
      setImage(file);
    } else {
      setImagePreview(null);
    }
  };
  const handleUpdateProfile = async () => {
    let data = await updateProfile(username, image);
    if (data && data.EC === 0) {
      toast.success(data.EM, {
        position: toast.POSITION.TOP_LEFT,
        className: "foo-bar",
        autoClose: 2000,
        draggable: true,
        theme: "dark",
      });
      // when input tag has file to upload
      typeof image !== "string" &&
        dispatch(
          userLoginSucces({
            DT: {
              ...account,
              username: username,
              image: await toBase64(image),
            },
          })
        );
        typeof image === "string" &&
        dispatch(
          userLoginSucces({
            DT: {
              ...account,
              username: username,
              image: image,
            },
          })
        )
      // console.log({...account,username:username,image:imagePreview});
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM, {
        position: toast.POSITION.TOP_LEFT,
        className: "foo-bar",
        autoClose: 2000,
        draggable: true,
        theme: "dark",
      });
    }
  };
  return (
    <>
      <div className="container d-flex gap-1">
        <Form.Group className="mb-3 col-4">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3 col-4">
          <Form.Label>Email:</Form.Label>
          <Form.Control placeholder={account.email} disabled />
        </Form.Group>
        <Form.Group className="mb-3 col-4">
          <Form.Label>Role:</Form.Label>
          <Form.Select disabled>
            <option>{account.role}</option>
          </Form.Select>
        </Form.Group>
      </div>
      <div className="image-upload col-3">
        <Form.Group
          style={{ marginLeft: "10px" }}
          controlId="formFile"
          className="mb-3"
        >
          <Form.Label>Change Avatar:</Form.Label>
          <Form.Control type="file" onChange={(e) => handleOnChangeImage(e)} />
        </Form.Group>
      </div>
      <div style={{ textAlign: "center" }} className="image-view">
        {!account?.image && <span>No Image</span>}
        {!imagePreview && account?.image && (
          <img
            style={{ maxHeight: "300px", maxWidth: "100%" }}
            src={`data:image/jpeg;base64,${account?.image}`}
            alt="profile"
          />
        )}
        {imagePreview && (
          <img
            style={{ maxHeight: "300px", maxWidth: "100%" }}
            src={imagePreview}
            alt="profile"
          />
        )}
      </div>
      <ModalFooter>
        <button onClick={handleUpdateProfile} className="btn btn-warning">
          Update
        </button>
      </ModalFooter>
    </>
  );
};

export default ViewProfile;
