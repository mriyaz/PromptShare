"use client"
import { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import Profile from '@components/Profile';

const UserProfile = ({params}) => {
  
    const [posts, setPosts] = useState([])
    const router = useRouter();
    const searchParams = useSearchParams();
    const userName = searchParams.get("name");

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${params?.id}/posts`);
            const data = await response.json();
            setPosts(data);
        }

        if (params?.id) fetchPosts();
    }, [params.id])

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)

    }
    const handleDelete = async (post) => {
        const hasConfirmed = confirm('Are you sure you want to delete?');
        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: 'DELETE'
                })

            } catch (error) {
                console.log(error)
            }
            const filteredPosts = posts.filter((p) => p._id !== post._id);
            setPosts(filteredPosts);
        }

    }
    return (
        <Profile
            name={userName}
            desc={`Welcome to ${userName}'s personalized profile page`}
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}
export default UserProfile
