import React from 'react';
import {
  MessageSquare,
  Building,
  Mail,
  ArrowRight,
  Calendar,
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { useApiData } from '../../context/useApiData';

interface PostDetailsModalProps {
  postId: number | null;
  onClose: () => void;
}

export const PostDetailsModal: React.FC<PostDetailsModalProps> = ({ postId, onClose }) => {
  const {
    getPostById,
    getUserById,
    getCommentsForPost,
    viewUserDetails,
    filterCommentsByPost,
  } = useApiData();

  if (!postId) return null;

  const post = getPostById(postId);
  if (!post) return null;

  const author = getUserById(post.userId);
  const comments = getCommentsForPost(post.id);

  return (
    <Modal
      isOpen={Boolean(postId)}
      onClose={onClose}
      title="Article & Discussion Details"
      subtitle={`Post #${post.id} • Assigned to User #${post.userId}`}
      maxWidth="3xl"
    >
      <div className="space-y-6">
        {/* Post Title & Meta Header */}
        <div className="space-y-3 pb-5 border-b border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="indigo" size="sm">
              Publication #{post.id}
            </Badge>
            <Badge variant="purple" size="sm">
              <MessageSquare className="w-3 h-3" />
              {comments.length} Comments
            </Badge>
            <span className="text-slate-500 text-xs flex items-center gap-1 font-mono">
              <Calendar className="w-3 h-3" />
              API Feed
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white capitalize leading-tight">
            {post.title}
          </h2>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-200 text-sm leading-relaxed whitespace-pre-line font-sans">
            {post.body}
          </div>
        </div>

        {/* Author Matching Card */}
        <div>
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
            Matched Author Information
          </h4>
          {author ? (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-base shadow">
                  {author.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">{author.name}</h4>
                  <p className="text-xs text-indigo-400 font-mono">@{author.username}</p>
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 mt-1">
                    <span className="flex items-center gap-1">
                      <Building className="w-3 h-3" />
                      {author.company.name}
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {author.email}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onClose();
                  viewUserDetails(author.id);
                }}
                className="shrink-0 text-xs border-indigo-500/30 text-indigo-300 hover:text-white"
              >
                View Author Profile &rarr;
              </Button>
            </div>
          ) : (
            <div className="p-3 bg-slate-850 rounded-lg text-xs text-slate-400">
              Author ID: {post.userId} (User record not loaded)
            </div>
          )}
        </div>

        {/* Matched Comments Section */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              Reader Comments ({comments.length})
            </h4>
            {comments.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onClose();
                  filterCommentsByPost(post.id);
                }}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                className="text-xs text-slate-400 hover:text-indigo-400"
              >
                Filter Comments tab
              </Button>
            )}
          </div>

          {comments.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500 bg-slate-900/40 rounded-xl border border-slate-800">
              No comments attached to this post yet.
            </div>
          ) : (
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 transition-colors space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-[10px] font-bold">
                        {comment.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h5 className="text-xs font-semibold text-slate-200 capitalize">
                          {comment.name}
                        </h5>
                        <p className="text-[11px] text-slate-400 font-mono">
                          {comment.email}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">
                      #{comment.id}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed pl-8">
                    {comment.body}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
