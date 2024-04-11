"use client"


import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/_firebaseConfig/firebaseConfig';
import RightPane from './RightPane';

function formatDate(input) {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function PostPage({ params }) {
  const postId = params.post_id;
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollection = await getDocs(collection(db, 'posts'));
        const postsData = postsCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPosts(postsData);

        // Filter the post by postId
        const selectedPost = postsData.find((p) => p.id === postId);
        setPost(selectedPost);

        if (!selectedPost) {
          console.error('Post not found');
          // Redirect to a 404 page or handle accordingly
        }

        // Fetch comments for the selected post
        const commentsCollection = await getDocs(collection(db, 'posts', postId, 'comments'));
        const commentsData = commentsCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [postId]);

  const handlePostComment = async () => {
    if (newComment.trim() === '') {
      return;
    }

    try {
      // Reference to the 'comments' subcollection within the parent post document
      const commentsRef = collection(db, 'posts', postId, 'comments');

      // Use addDoc to add a document to the 'comments' subcollection
      await addDoc(commentsRef, {
        comment: newComment,
        timestamp: serverTimestamp(),
      });

      // Fetch updated comment data after adding the new comment
      const updatedCommentsCollection = await getDocs(commentsRef);
      const updatedCommentsData = updatedCommentsCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setComments(updatedCommentsData);

      // Reset the comment input after successfully adding a comment
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div>
      {post ? (
        <div className="flex">
        <div className="ml-16 w-[600px]">
          <h1 className="text-3xl font-bold my-4 pt-3">{post.title}</h1>
          <p className="text-sm text-muted-foreground">
            Created by {post.creator} at {formatDate(post.timestamp.toDate())}
          </p>
          {post.description && (
            <p className="mt-4">{post.description}</p>
          )}

          {/* Display comments */}
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Comments</h2>
            <div className="mt-4">
            <textarea
              rows="2"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-2 border border-gray-300 text-slate-100 bg-black rounded-xl mb-2"
            />
            <button
              onClick={handlePostComment}
              className=" mb-4 bg-primary text-primary-foreground hover:bg-primary/90 inline-flex rounded-xl items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 px-4 py-2"
            >
              Post Comment
            </button>
          </div>
            {comments.map((comment) => (
              <div key={comment.id} className="mb-2">
                <p>{comment.comment}</p>
                <p className="text-sm text-muted-foreground">
                  Commented at {formatDate(comment.timestamp.toDate())}
                </p>
              </div>
            ))}
          </div>

          </div>

          <RightPane context={post.description} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PostPage;
