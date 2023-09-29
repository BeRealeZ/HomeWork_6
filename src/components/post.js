import React, { useState } from "react";

export default function Post(props) {
  const [editedOwner, setEditedOwner] = useState(props.owner);
  const [editedTags, setEditedTags] = useState(
    Array.isArray(props.tags) ? props.tags.join(" ") : props.tags
  );
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    props.updatePost({ owner: editedOwner, tags: editedTags });
    setIsEditing(false);
  };

  return (
    <div className="post-card">
      <img className="post-image" src={props.images} alt="Cat" />
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedOwner}
            onChange={(e) => setEditedOwner(e.target.value)}
          />
          <input
            type="text"
            value={editedTags}
            onChange={(e) => setEditedTags(e.target.value)}
          />
          <button className="btn-save" onClick={handleSaveClick}>
            Save
          </button>
        </div>
      ) : (
        <div>
          <h3>{editedOwner}</h3>
          <p>{editedTags}</p>
          <button className="btn-edit" onClick={handleEditClick}>
            Edit
          </button>
          <button
            className="btn-delete"
            onClick={() => props.deletePost(props.id)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
