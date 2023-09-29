import { useState, useEffect } from "react";
import React from "react";
import AddPost from "./components/addPost";
import Post from "./components/post";


function App() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("https://cataas.com/api/cats?limit=10&skip=0");
    const data = await response.json();
    
    const updatedPosts = data.map((post, index) => ({
      ...post,
      url: `https://cataas.com/cat?type=sq&${index + 1}`,
    }));
    setPosts(updatedPosts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const addPost = async (title, body) => {
    const response = await fetch(
      "https://cataas.com/api/cats?limit=10&skip=0",
      {
        method: "POST",
        body: JSON.stringify({
        title: title,
        body: body,
        userId: Math.random().toString(36).slice(2),
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const data = await response.json();
    setPosts((prevPosts) => [data, ...prevPosts]);
  };

  const deletePost = async (_id) => {
    const response = await fetch(
      `https://cataas.com/api/cats/${_id}`,
      {
        method: "DELETE",
      }
    );
    if (response.status === 200) {
      setPosts((prevPosts) => {
        return prevPosts.filter((post) => post.id !== _id);
      });
    }
  };

const updatePost = (newData, index) => {
  
  const updatedPosts = [...posts];
  updatedPosts[index] = { 
    ...updatedPosts[index], 
    ...newData };
  setPosts(updatedPosts);
};


  return (
    <main>
      <h1>Cats API</h1>
      <AddPost addPost={addPost} />
      <section className="posts-container">
        <h2>Posts</h2>
        {posts.map((post, index) => (
          <Post
            key={index}
            id={post._id}
            images={post.url}
            tags={post.tags}
            owner={post.owner}
            deletePost={deletePost}
            updatePost={(newData) => updatePost(newData, index)}
          />
        ))}
      </section>
    </main>
  );
}


export default App;