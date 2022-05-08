import React, { useEffect, useState } from 'react';

import clientService from '../../../services/clientService';

export const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await clientService.getBlogs(1);
    };
    fetchBlogs();
  }, []);
  return <div>Blogs</div>;
};
