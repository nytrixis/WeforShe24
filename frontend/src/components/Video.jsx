import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Video = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=latest fashion trends&type=video&key=AIzaSyA0l7fGrnao7lOUmj70tAvfbeM00XXJlgc`
        );
        setVideos(response.data.items);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <section className="max-padd-container bg-primary py-12">
      <h2 className="h2 text-center mb-8">Latest Fashion Trend Videos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video) => (
          <div key={video.id.videoId} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="p-4">
              <h3 className="medium-16 mb-2 line-clamp-2">{video.snippet.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-3">{video.snippet.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Video;
