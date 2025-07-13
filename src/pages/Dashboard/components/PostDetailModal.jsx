function PostDetailModal({ post}) {
  if (!post) return null;

  return (
    <div className="p-4 sm:p-6">
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
      )}
      <h2 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 mb-4">
        {post.title}
      </h2>
      <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 whitespace-pre-wrap">
        <p>Deskripsi: {post.description}</p>
      </div>
    </div>
  );
}

export default PostDetailModal;
