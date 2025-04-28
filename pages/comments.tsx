import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './contexts/AuthContext';

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  deletedAt: string | null;
  userId: number;
  children?: Comment[];
}

const CommentsPage = () => {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/comments');
      setComments(response.data);
    } catch (error) {
      setError('Failed to load comments');
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await axios.post('/api/comments', {
        content: newComment,
        parentId: replyTo
      });
      
      if (replyTo) {
        setComments(prev =>
          prev.map(comment =>
            comment.id === replyTo
              ? { ...comment, children: [...(comment.children || []), response.data] }
              : comment
          )
        );
      } else {
        setComments(prev => [...prev, response.data]);
      }
      
      setNewComment('');
      setReplyTo(null);
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  const handleEdit = async (id: number) => {
    if (!editContent.trim()) return;

    try {
      await axios.patch(`/api/comments/${id}`, { content: editContent });
      setComments(prev =>
        prev.map(comment =>
          comment.id === id ? { ...comment, content: editContent } : comment
        )
      );
      setEditingId(null);
      setEditContent('');
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/comments/${id}`);
      setComments(prev =>
        prev.map(comment =>
          comment.id === id ? { ...comment, deletedAt: new Date().toISOString() } : comment
        )
      );
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleRestore = async (id: number) => {
    try {
      await axios.post(`/api/comments/${id}/restore`);
      setComments(prev =>
        prev.map(comment =>
          comment.id === id ? { ...comment, deletedAt: null } : comment
        )
      );
    } catch (error) {
      console.error('Error restoring comment:', error);
    }
  };

  const canModifyComment = (comment: Comment) => {
    return user?.id === comment.userId;
  };

  const renderComment = (comment: Comment) => (
    <div key={comment.id} className={`border p-4 mb-4 rounded-lg ${comment.deletedAt ? 'bg-gray-100' : 'bg-white'}`}>
      {editingId === comment.id ? (
        <div className="space-y-2">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full p-2 border rounded"
            rows={3}
          />
          <div className="flex space-x-2">
            <button
              onClick={() => handleEdit(comment.id)}
              className="btn btn-primary"
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditingId(null);
                setEditContent('');
              }}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="mb-2">{comment.content}</p>
          <div className="flex space-x-2 text-sm">
            <button
              onClick={() => {
                setReplyTo(comment.id);
                setNewComment('');
              }}
              className="text-blue-500 hover:text-blue-700"
            >
              Reply
            </button>
            {canModifyComment(comment) && !comment.deletedAt && (
              <>
                <button
                  onClick={() => {
                    setEditingId(comment.id);
                    setEditContent(comment.content);
                  }}
                  className="text-green-500 hover:text-green-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </>
            )}
            {canModifyComment(comment) && comment.deletedAt && (
              <button
                onClick={() => handleRestore(comment.id)}
                className="text-blue-500 hover:text-blue-700"
              >
                Restore
              </button>
            )}
          </div>
        </>
      )}
      {comment.children && comment.children.length > 0 && (
        <div className="ml-8 mt-4 border-l-2 border-gray-200 pl-4">
          {comment.children.map(renderComment)}
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Comments</h1>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="space-y-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={replyTo ? "Write a reply..." : "Write a comment..."}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
          />
          <div className="flex space-x-2">
            <button type="submit" className="btn btn-primary">
              {replyTo ? 'Reply' : 'Comment'}
            </button>
            {replyTo && (
              <button
                type="button"
                onClick={() => {
                  setReplyTo(null);
                  setNewComment('');
                }}
                className="btn btn-secondary"
              >
                Cancel Reply
              </button>
            )}
          </div>
        </div>
      </form>

      <div className="space-y-4">
        {comments.map(renderComment)}
      </div>
    </div>
  );
};

export default CommentsPage;