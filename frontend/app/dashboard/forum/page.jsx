"use client"

import React, { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '@/_firebaseConfig/firebaseConfig';
import Link from 'next/link'; // Import Link from 'next/link' if not already imported
import { Separator } from '@/components/ui/separator';


function formatDate(input) {
    const date = new Date(input)
    return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    })
}
function Page() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Fetch data from Firestore when the component mounts
        const fetchPosts = async () => {
            try {
                const postsCollection = await getDocs(collection(db, 'posts'));
                const postsData = postsCollection.docs.map((doc) => doc.data());
                setPosts(postsData);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, [db]); // Include db in the dependency array to re-run the effect when it changes

    return (
        <div>
            <h1 className='pt-10 text-center text-3xl mb-4'>List of Posts</h1>
            <div className="flex flex-col container">
                <Separator className='mt-10' />
                {posts.length ? (
                    <div className="pt-4 gap-10 sm:grid-cols-2">
                        {posts.map((post) => (
                            <>
                            <article key={post.id} className="group relative flex flex-col space-y-2">
                                <h2 className="text-2xl font-bold ">{post.title}</h2>
                                {post.description && (
                                    <p className="text-muted-foreground ">{post.description}</p>
                                )}
                                {post.timestamp && (
                                    <p className="text-sm text-muted-foreground">
                                      Created by {post.creator} at {post.timestamp.toDate().toLocaleString()}
                                    </p>
                                )}
                                {/* {
                                    post.creator && (
                                        <p className="text-sm text-muted-foreground"></p>
                                    )
                                } */}
                                <Link href={`/dashboard/forum/${post.id}`} passHref>
                                    <div className="absolute inset-0">
                                        <span className="sr-only">View Article</span>
                                    </div>
                                </Link>
                            </article>
                            <Separator className='my-4'/>
                            </>
                        ))}
                    </div>
                ) : (
                    <p>No posts available</p>
                )}
            </div>
        </div>
    );
}

export default Page;
